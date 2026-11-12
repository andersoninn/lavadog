import { formatPrice } from "@/lib/store-data";

type Props = { preco: number; precoAntigo?: number; porKg?: number | null };

/** Selo de desconto + preço antigo riscado, preço atual e preço por quilo. */
export default function PrecoProduto({ preco, precoAntigo, porKg }: Props) {
  const temDesconto = Boolean(precoAntigo && precoAntigo > preco);
  const percentagem = temDesconto ? Math.round((1 - preco / (precoAntigo as number)) * 100) : 0;

  return (
    <div>
      {temDesconto && (
        <p className="flex items-center gap-2.5">
          <span className="rounded-full bg-primary px-2.5 py-0.5 text-sm font-bold text-foreground">-{percentagem}%</span>
          <span className="text-muted-foreground line-through">{formatPrice(precoAntigo as number)}</span>
        </p>
      )}
      <p className="mt-1 text-4xl font-extrabold text-foreground">{formatPrice(preco)}</p>
      {porKg && <p className="mt-0.5 text-sm text-muted-foreground">{formatPrice(porKg)} / kg</p>}
    </div>
  );
}
