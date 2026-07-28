import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function StoreHeader() {
  return (
    <div className="pt-28 pb-8 sm:pt-32 lg:pt-36">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-foreground">Store</span>
      </nav>

      <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Store</h1>
      <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
        Encontre os melhores produtos para o seu pet.
      </p>
    </div>
  );
}
