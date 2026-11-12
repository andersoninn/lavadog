import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";
import { INSTAGRAM_HREF } from "@/lib/constants";
import { EMPRESA } from "@/lib/empresa";

const social =
  "flex size-10 items-center justify-center rounded-full border border-background/30 text-background/80 transition-colors hover:border-background hover:text-background";

/** Logótipo, nome, frase e redes sociais (1.ª coluna do rodapé). */
export default function MarcaRodape() {
  return (
    <div className="col-span-2 lg:col-span-1 lg:border-r lg:border-background/15 lg:pr-8">
      <Image
        src="/images/logo.png"
        alt="LavaDog"
        width={180}
        height={56}
        className="h-12 w-auto"
      />
      <p className="mt-4 text-2xl font-bold">{EMPRESA.nomeComercial}</p>
      <p className="mt-2 max-w-xs text-sm text-background/75">
        Mais que um pet shop, um lugar de amor e cuidado.
      </p>
      <div className="mt-5 flex gap-3">
        <a
          href={INSTAGRAM_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={social}
        >
          <Instagram className="size-5" />
        </a>
        <a
          href="https://www.facebook.com/lavadogtere"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className={social}
        >
          <Facebook className="size-5" />
        </a>
      </div>
    </div>
  );
}
