/**
 * Preço por quilo a partir do texto da opção ("15 kg", "2,5 kg", "500 g").
 * Devolve null quando a opção não é um peso.
 */
export function quilosDaOpcao(texto: string): number | null {
  const m = texto.trim().toLowerCase().match(/^(\d+(?:[.,]\d+)?)\s*(kg|g)$/);
  if (!m) return null;
  const n = Number.parseFloat(m[1].replace(",", "."));
  if (!n) return null;
  return m[2] === "kg" ? n : n / 1000;
}

export function precoPorKg(preco: number, opcoes: { value: string }[]): number | null {
  for (const o of opcoes) {
    const kg = quilosDaOpcao(o.value);
    if (kg) return preco / kg;
  }
  return null;
}

/** "https://youtu.be/ID" ou "…watch?v=ID" → id do vídeo. */
export function idYoutube(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}
