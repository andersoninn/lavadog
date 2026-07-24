import { Star } from "lucide-react";
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
];

export default function ProductsGrid() {
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
        {products.map((product) => (
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
    </div>
  );
}
