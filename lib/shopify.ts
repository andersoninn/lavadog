const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
const apiVersion = "2025-01";

type ShopifyFetchArgs = {
  query: string;
  variables?: Record<string, unknown>;
  revalidate?: number;
};

type ShopifyGraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function shopifyFetch<T>({
  query,
  variables,
  revalidate = 60,
}: ShopifyFetchArgs): Promise<T> {
  if (!domain || !token) {
    throw new Error(
      "Storefront API não configurada: defina SHOPIFY_STORE_DOMAIN e SHOPIFY_STOREFRONT_PRIVATE_TOKEN em .env.local",
    );
  }

  const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  const json = (await res.json()) as ShopifyGraphQLResponse<T>;

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }

  if (!json.data) {
    throw new Error("Storefront API retornou uma resposta vazia.");
  }

  return json.data;
}

// ---------------------------------------------------------------------------
// Coleções (categorias)
// ---------------------------------------------------------------------------

const COLLECTIONS_QUERY = /* GraphQL */ `
  query Collections {
    collections(first: 20) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

export type ShopifyCollection = {
  id: string;
  title: string;
  handle: string;
};

export async function getCollections(): Promise<ShopifyCollection[]> {
  const data = await shopifyFetch<{
    collections: { edges: { node: ShopifyCollection }[] };
  }>({ query: COLLECTIONS_QUERY });

  return data.collections.edges.map((edge) => edge.node);
}

// ---------------------------------------------------------------------------
// Produtos por coleção
// ---------------------------------------------------------------------------

const PRODUCTS_BY_COLLECTION_QUERY = /* GraphQL */ `
  query ProductsByCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            vendor
            tags
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  vendor: string;
  tags: string[];
  availableForSale: boolean;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  compareAtPriceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  featuredImage: { url: string; altText: string | null } | null;
};

// ---------------------------------------------------------------------------
// Catálogo completo (usado pela página /store)
// ---------------------------------------------------------------------------

const ALL_PRODUCTS_QUERY = /* GraphQL */ `
  query AllProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      edges {
        node {
          id
          title
          handle
          vendor
          tags
          availableForSale
          createdAt
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
            }
          }
          featuredImage {
            url
            altText
          }
          collections(first: 10) {
            edges {
              node {
                title
                handle
              }
            }
          }
          options {
            name
            values
          }
          variants(first: 25) {
            edges {
              node {
                id
                title
                availableForSale
                selectedOptions {
                  name
                  value
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type ShopifyStoreProduct = {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  tags: string[];
  availableForSale: boolean;
  createdAt: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  compareAtPriceRange: { minVariantPrice: { amount: string | null } };
  featuredImage: { url: string; altText: string | null } | null;
  collections: { edges: { node: { title: string; handle: string } }[] };
  options: { name: string; values: string[] }[];
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        selectedOptions: { name: string; value: string }[];
        price: { amount: string; currencyCode: string };
      };
    }[];
  };
};

export async function getStoreProducts(first = 100): Promise<ShopifyStoreProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyStoreProduct }[] };
  }>({ query: ALL_PRODUCTS_QUERY, variables: { first } });

  return data.products.edges.map((edge) => edge.node);
}

// ---------------------------------------------------------------------------
// Carrinho (Cart API) — usado pela página /carrinho e pelo checkout
// ---------------------------------------------------------------------------

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
                handle
                featuredImage {
                  url
                  altText
                }
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        cost: { totalAmount: { amount: string; currencyCode: string } };
        merchandise: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          product: {
            title: string;
            handle: string;
            featuredImage: { url: string; altText: string | null } | null;
          };
        };
      };
    }[];
  };
};

const CART_CREATE_MUTATION = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...CartFragment
      }
      userErrors {
        message
      }
    }
  }
`;

const CART_LINES_ADD_MUTATION = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        message
      }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        message
      }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFragment
      }
      userErrors {
        message
      }
    }
  }
`;

const CART_QUERY = /* GraphQL */ `
  ${CART_FRAGMENT}
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
`;

type CartMutationResponse = {
  cart: ShopifyCart | null;
  userErrors: { message: string }[];
};

function assertNoUserErrors(userErrors: { message: string }[]) {
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((e) => e.message).join(", "));
  }
}

export async function cartCreate(
  lines: { merchandiseId: string; quantity: number }[] = [],
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: CartMutationResponse }>({
    query: CART_CREATE_MUTATION,
    variables: { lines },
    revalidate: 0,
  });
  assertNoUserErrors(data.cartCreate.userErrors);
  if (!data.cartCreate.cart) throw new Error("Não foi possível criar o carrinho.");
  return data.cartCreate.cart;
}

export async function cartLinesAdd(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: CartMutationResponse }>({
    query: CART_LINES_ADD_MUTATION,
    variables: { cartId, lines },
    revalidate: 0,
  });
  assertNoUserErrors(data.cartLinesAdd.userErrors);
  if (!data.cartLinesAdd.cart) throw new Error("Não foi possível adicionar ao carrinho.");
  return data.cartLinesAdd.cart;
}

export async function cartLinesUpdate(
  cartId: string,
  lines: { id: string; quantity: number }[],
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: CartMutationResponse }>({
    query: CART_LINES_UPDATE_MUTATION,
    variables: { cartId, lines },
    revalidate: 0,
  });
  assertNoUserErrors(data.cartLinesUpdate.userErrors);
  if (!data.cartLinesUpdate.cart) throw new Error("Não foi possível atualizar o carrinho.");
  return data.cartLinesUpdate.cart;
}

export async function cartLinesRemove(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: CartMutationResponse }>({
    query: CART_LINES_REMOVE_MUTATION,
    variables: { cartId, lineIds },
    revalidate: 0,
  });
  assertNoUserErrors(data.cartLinesRemove.userErrors);
  if (!data.cartLinesRemove.cart) throw new Error("Não foi possível remover o item do carrinho.");
  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: CART_QUERY,
    variables: { cartId },
    revalidate: 0,
  });
  return data.cart;
}

export async function getProductsByCollection(
  handle: string,
  first = 50,
): Promise<{ collectionTitle: string; products: ShopifyProduct[] } | null> {
  const data = await shopifyFetch<{
    collection: {
      id: string;
      title: string;
      products: { edges: { node: ShopifyProduct }[] };
    } | null;
  }>({ query: PRODUCTS_BY_COLLECTION_QUERY, variables: { handle, first } });

  if (!data.collection) return null;

  return {
    collectionTitle: data.collection.title,
    products: data.collection.products.edges.map((edge) => edge.node),
  };
}
