import { Mail, MapPin, Phone } from "lucide-react";
import { WHATSAPP_HREF } from "@/lib/constants";
import { EMPRESA } from "@/lib/empresa";

/** Morada, telefone e email (última coluna do rodapé). */
export default function ContactoRodape() {
  return (
    <div className="col-span-2 lg:col-span-1">
      <p className="text-lg font-bold">Contacto</p>
      <ul className="mt-4 space-y-3.5 text-sm text-background/75">
        <li className="flex gap-3">
          <MapPin className="size-5 shrink-0" /> Rua 16 de Maio 41, Santiago e
          Bougado, 4785-607 Trofa
        </li>
        <li>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 hover:text-background"
          >
            <Phone className="size-5 shrink-0" /> {EMPRESA.telefone}
          </a>
        </li>
        <li>
          <a
            href={`mailto:${EMPRESA.email}`}
            className="flex gap-3 break-all hover:text-background"
          >
            <Mail className="size-5 shrink-0" /> {EMPRESA.email}
          </a>
        </li>
      </ul>
    </div>
  );
}
