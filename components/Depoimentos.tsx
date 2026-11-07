import { Star } from "lucide-react";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import type { AvaliacoesGoogle } from "@/lib/google-avaliacoes";

// Quem não tem foto no Google fica com as iniciais.
const avatar = (nome: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=fdf3e2&color=6D4B31&size=256&bold=true`;

/** Avaliações reais do perfil da LavaDog no Google. */
export default function Depoimentos({ dados }: { dados: AvaliacoesGoogle }) {
  const depoimentos = dados.avaliacoes.map((a) => ({
    quote: a.texto,
    name: a.nome,
    designation: `${"★".repeat(Math.round(a.estrelas))}${a.quando ? ` · ${a.quando}` : ""}`,
    src: a.foto ?? avatar(a.nome),
  }));

  return (
    <div className="flex w-full flex-col items-center gap-6 bg-background px-6 py-4 sm:px-12 lg:px-20">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-primary">
          Depoimentos
        </span>
        <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
          O Que Nossos Clientes Dizem
        </h2>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          <Star className="size-4 fill-primary text-primary" />
          <span className="font-semibold text-foreground">{dados.nota.toLocaleString("pt-PT")}</span>
          <span>· {dados.total} avaliações no Google</span>
          {dados.urlPerfil && (
            <a
              href={dados.urlPerfil}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-semibold text-blue-strong underline underline-offset-2"
            >
              Ver todas
            </a>
          )}
        </p>
      </div>

      <CircularTestimonials
        testimonials={depoimentos}
        autoplay
        autoplayInterval={3000}
        colors={{
          name: "#221b14",
          designation: "#6D4B31",
          testimony: "#4b5563",
          arrowBackground: "#f5bf5f",
          arrowForeground: "#221b14",
          arrowHoverBackground: "#d5a652",
        }}
        fontSizes={{
          name: "1.375rem",
          designation: "0.9rem",
          quote: "1.05rem",
        }}
      />
    </div>
  );
}
