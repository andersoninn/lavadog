import { formatPrice } from "@/lib/store-data";

/** Selo de desconto + preço antigo riscado + preço atual em destaque. */
export default function PrecoProduto({ preco, precoAntigo }: { preco: number; precoAntigo?: number }) {
  const temDesconto = Boolean(precoAntigo && precoAntigo > preco);
  const percentagem = temDesconto ? Math.round((1 - preco / (precoAntigo as number)) * 100) : 0;

  return (
    <div>
      {temDesconto && (
        <p className="flex items-center gap-3">
          <span className="rounded-full bg-primary px-3 py-1 text-sm font-bold text-foreground">-{percentagem}%</span>
          <span className="text-lg text-muted-foreground line-through">{formatPrice(precoAntigo as number)}</span>
        </p>
      )}
      <p className="mt-2 text-4xl font-extrabold text-foreground sm:text-5xl">{formatPrice(preco)}</p>
    </div>
  );
}
