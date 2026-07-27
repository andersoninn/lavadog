"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const products = [
  { name: "Coleira para Cães", price: "R$ 90", rating: 4, image: "bg-primary-soft" },
  {
    name: "Acessórios para Gatos",
    price: "R$ 120",
    oldPrice: "R$ 150",
    rating: 4,
    sale: true,
    image: "bg-blue-soft",
  },
  { name: "Escova para Gatos", price: "R$ 60", rating: 5, image: "bg-muted" },
  { name: "Kit de Ossinhos", price: "R$ 90", rating: 5, image: "bg-primary-soft" },
  { name: "Brinquedo Mordedor", price: "R$ 45", rating: 4, image: "bg-blue-soft" },
  {
    name: "Arranhador para Gatos",
    price: "R$ 180",
    oldPrice: "R$ 220",
    rating: 5,
    sale: true,
    image: "bg-muted",
  },
  { name: "Cama Pet Confort", price: "R$ 150", rating: 4, image: "bg-primary-soft" },
  { name: "Ração Premium 10kg", price: "R$ 130", rating: 5, image: "bg-blue-soft" },
  { name: "Shampoo Neutro", price: "R$ 55", rating: 4, image: "bg-muted" },
  { name: "Comedouro Duplo", price: "R$ 70", rating: 3, image: "bg-primary-soft" },
  {
    name: "Guia Retrátil",
    price: "R$ 95",
    oldPrice: "R$ 115",
    rating: 4,
    sale: true,
    image: "bg-blue-soft",
  },
  { name: "Roupinha para Cães", price: "R$ 85", rating: 5, image: "bg-muted" },
];

const ITEMS_PER_PAGE = 4;
const PAGE_COUNT = Math.ceil(products.length / ITEMS_PER_PAGE);

export default function ProductsGrid() {
  const [page, setPage] = useState(0);

  const visibleProducts = products.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wide text-primary-hover uppercase">
            Chegou Agora: Novos Brinquedos
          </span>
          <h2 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
            Novidades Incríveis para Pets Felizes
          </h2>
        </div>
        <Button variant="outline" className="hidden shrink-0 sm:inline-flex">
          Ver Todos os Produtos
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {visibleProducts.map((product) => (
          <div key={product.name}>
            <div className={cn("relative h-44 rounded-lg ", product.image)}>
              {product.sale && (
                <span className="absolute top-2 left-2 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-bold text-background">
                  OFERTA
                </span>
              )}
            </div>
            <div className="mt-2 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "size-3",
                    i < product.rating ? "fill-primary text-primary" : "text-border",
                  )}
                />
              ))}
            </div>
            <p className="mt-1 text-sm font-semibold text-foreground">{product.name}</p>
            <p className="text-sm text-muted-foreground">
              {product.oldPrice && <span className="mr-1.5 line-through">{product.oldPrice}</span>}
              <span className={product.oldPrice ? "font-semibold text-foreground" : ""}>
                {product.price}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Página anterior"
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          className="flex size-8 items-center justify-center rounded-full border border-border text-foreground transition-colors disabled:opacity-30 enabled:hover:bg-muted"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: PAGE_COUNT }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Página ${i + 1}`}
              aria-current={page === i}
              onClick={() => setPage(i)}
              className={cn(
                "size-2 rounded-full transition-colors",
                page === i ? "bg-primary" : "bg-border",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Próxima página"
          disabled={page === PAGE_COUNT - 1}
          onClick={() => setPage((p) => Math.min(PAGE_COUNT - 1, p + 1))}
          className="flex size-8 items-center justify-center rounded-full border border-border text-foreground transition-colors disabled:opacity-30 enabled:hover:bg-muted"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
