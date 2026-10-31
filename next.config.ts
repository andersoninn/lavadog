import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Fotos dos produtos carregadas no painel do Stripe.
      {
        protocol: "https",
        hostname: "files.stripe.com",
      },
      // Fotos antigas, se algum produto importado do Shopify ainda as usar.
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
};

export default nextConfig;
