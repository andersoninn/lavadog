import "server-only";

/**
 * Avaliações do perfil da LavaDog no Google (Google Business), pela API
 * Places (New). A API devolve a nota média, o total e até 5 avaliações.
 *
 * Variáveis:
 *   GOOGLE_PLACES_API_KEY – chave da Google Cloud com a "Places API (New)"
 *   GOOGLE_PLACE_ID       – o id do perfil da loja no Google (ChIJ…)
 *
 * O resultado fica em cache 24 h (~30 pedidos por mês), dentro da quota
 * gratuita da Google. Sem as variáveis, a secção de depoimentos não aparece.
 */

export type AvaliacaoGoogle = {
  nome: string;
  foto: string | null;
  texto: string;
  estrelas: number;
  quando: string;
};

export type AvaliacoesGoogle = {
  nota: number;
  total: number;
  urlPerfil: string | null;
  avaliacoes: AvaliacaoGoogle[];
};

type RespostaPlaces = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    text?: { text?: string };
    originalText?: { text?: string };
    relativePublishTimeDescription?: string;
    authorAttribution?: { displayName?: string; photoUri?: string };
  }[];
};

export async function getAvaliacoesGoogle(): Promise<AvaliacoesGoogle | null> {
  const chave = process.env.GOOGLE_PLACES_API_KEY;
  const lugar = process.env.GOOGLE_PLACE_ID;
  if (!chave || !lugar) return null;

  try {
    const resposta = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(lugar)}?languageCode=pt-PT`,
      {
        headers: {
          "X-Goog-Api-Key": chave,
          "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
        },
        next: { revalidate: 60 * 60 * 24 },
      },
    );
    if (!resposta.ok) {
      console.error("Google Places: erro", resposta.status, await resposta.text());
      return null;
    }
    const dados = (await resposta.json()) as RespostaPlaces;

    const avaliacoes = (dados.reviews ?? [])
      .map((r) => ({
        nome: r.authorAttribution?.displayName ?? "Cliente Google",
        foto: r.authorAttribution?.photoUri ?? null,
        texto: (r.originalText?.text ?? r.text?.text ?? "").trim(),
        estrelas: r.rating ?? 5,
        quando: r.relativePublishTimeDescription ?? "",
      }))
      .filter((r) => r.texto.length > 0);

    if (!dados.rating || avaliacoes.length === 0) return null;
    return {
      nota: dados.rating,
      total: dados.userRatingCount ?? avaliacoes.length,
      urlPerfil: dados.googleMapsUri ?? null,
      avaliacoes,
    };
  } catch (error) {
    console.error("Google Places: falha ao ler avaliações", error);
    return null;
  }
}
