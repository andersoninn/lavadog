"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageIcon, Trash2 } from "lucide-react";
import Quantidade from "@/components/carrinho/Quantidade";
import {
  removeCartLine,
  updateCartLine,
  type CartLine,
} from "@/lib/cart-actions";
import { formatPrice } from "@/lib/store-data";

type Props = { line: CartLine; href: string | null; marca: string | null };

/** Uma linha do carrinho: foto, marca, nome, opção, preço, quantidade e total. */
export default function LinhaCarrinho({ line, href, marca }: Props) {
  const [aMudar, start] = useTransition();
  const mudar = (q: number) => start(() => updateCartLine(line.id, q));
  const ligacao = (filho: React.ReactNode, className?: string) =>
    href ? (
      <Link href={href} className={className}>
        {filho}
      </Link>
    ) : (
      <span className={className}>{filho}</span>
    );

  return (
    <li
      className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 py-5 transition-opacity sm:grid-cols-[88px_minmax(0,1fr)_auto_96px] sm:items-center"
      style={{ opacity: aMudar ? 0.5 : 1 }}
    >
      {ligacao(
        line.image ? (
          <Image
            src={line.image.url}
            alt={line.image.altText ?? line.title}
            fill
            sizes="88px"
            className="object-cover"
          />
        ) : (
          <ImageIcon className="size-6 text-muted-foreground" />
        ),
        "relative flex size-[88px] items-center justify-center overflow-hidden rounded-md border border-border bg-primary-soft/60",
      )}

      <div className="min-w-0">
        {marca && <p className="text-xs font-bold text-blue-strong">{marca}</p>}
        {ligacao(
          line.title,
          "line-clamp-2 font-semibold text-foreground hover:underline",
        )}
        {line.variantTitle && (
          <span className="mt-1.5 inline-block rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-foreground">
            {line.variantTitle}
          </span>
        )}
        <p className="mt-1 text-sm text-muted-foreground">
          {formatPrice(line.unitPrice)} / un.
        </p>
      </div>

      <div className="col-start-2 flex items-center gap-3 sm:col-start-auto">
        <Quantidade valor={line.quantity} desativado={aMudar} onMudar={mudar} />
        <button
          type="button"
          disabled={aMudar}
          onClick={() => start(() => removeCartLine(line.id))}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-600 disabled:opacity-40"
        >
          <Trash2 className="size-4" />{" "}
          <span className="sm:sr-only">Remover</span>
        </button>
      </div>

      <p className="col-start-2 text-lg font-bold text-foreground sm:col-start-auto sm:text-right">
        {formatPrice(line.total)}
      </p>
    </li>
  );
}
