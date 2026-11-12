import { PawPrint } from "lucide-react";
import type { Promocao } from "@/lib/promocoes";

/** Contorno ondulado do selo (12 "pétalas"), calculado uma vez. */
const SELO = (() => {
  const pontos: string[] = [];
  for (let i = 0; i <= 96; i++) {
    const a = (i / 96) * Math.PI * 2;
    const r = 46 + 4 * Math.cos(a * 12);
    pontos.push(
      `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`,
    );
  }
  return `M${pontos.join("L")}Z`;
})();

function Raios({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M4 14 L8 16 M8 4 L10 10 M18 2 L15 9" />
    </svg>
  );
}

/** Banner da loja: "Cuidado que faz a diferença" + selo do cupão ativo do Stripe. */
export default function BannerLoja({
  promocao,
}: {
  promocao: Promocao | null;
}) {
  const valor = promocao?.desconto.replace(/\s*off$/i, "");

  return (
    <div className="relative flex min-h-36 items-center overflow-hidden rounded-xl border border-border bg-primary-soft px-5 py-4">
      {/* fundo: mancha clara, onda amarela e onda azul com patinha */}
      <div
        aria-hidden
        className="absolute -top-12 left-1/2 size-40 rounded-full bg-background/70"
      />
      <svg
        aria-hidden
        viewBox="0 0 300 60"
        preserveAspectRatio="none"
        className="absolute -bottom-1 left-0 h-8 w-1/3 text-primary"
      >
        <path
          d="M0 40 C 60 10, 110 10, 160 35 S 250 60, 300 45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 200 120"
        preserveAspectRatio="none"
        className="absolute right-0 bottom-0 h-16 w-36 text-blue"
      >
        <path
          d="M40 120 C 70 70, 120 90, 150 50 S 190 20, 200 15 L200 120 Z"
          fill="currentColor"
          opacity="0.8"
        />
      </svg>
      <PawPrint
        aria-hidden
        className="absolute right-3 bottom-2 size-5 fill-white text-white"
      />

      <div className="relative z-10 max-w-[62%]">
        <p className="flex items-center gap-2 text-lg font-extrabold whitespace-nowrap text-foreground sm:text-xl">
          <span className="relative">
            <PawPrint className="size-5 fill-foreground text-foreground" />
            <Raios className="absolute -top-3 -right-2.5 size-4 text-primary" />
          </span>
          Cuidado que
        </p>
        <p className="mt-1.5 inline-block rounded-full bg-primary px-3 py-0.5 text-lg font-extrabold whitespace-nowrap text-foreground sm:text-xl">
          faz a diferença
        </p>
        <p className="mt-2 text-xs text-foreground/75">
          Os melhores produtos para o seu pet, com preços especiais.
        </p>
      </div>

      {valor && (
        <div className="absolute top-1/2 right-4 z-10 size-24 -translate-y-1/2 sm:right-6 sm:size-28">
          <Raios className="absolute -top-2 -right-2 size-6 text-primary" />
          <svg
            viewBox="0 0 100 100"
            className="size-full drop-shadow-md"
            aria-hidden
          >
            <path
              d={SELO}
              fill="var(--primary)"
              stroke="white"
              strokeWidth="3"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
            <span className="text-sm font-extrabold text-foreground">
              Cupão
            </span>
            <span className="text-3xl font-black text-white [-webkit-text-stroke:1.2px_var(--foreground)] sm:text-[2rem]">
              {valor}
            </span>
            <span className="text-sm font-black text-foreground">OFF</span>
          </div>
        </div>
      )}
    </div>
  );
}
