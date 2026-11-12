import { cn } from "@/lib/utils";

/** Contorno ondulado (12 "pétalas"), igual ao selo do banner da loja. */
const CONTORNO = (() => {
  const p: string[] = [];
  for (let i = 0; i <= 96; i++) {
    const a = (i / 96) * Math.PI * 2;
    const r = 46 + 4 * Math.cos(a * 12);
    p.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${p.join("L")}Z`;
})();

/** Selo redondo ondulado com texto (ex.: "Premium", "Só online"). */
export default function Selo({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("absolute -top-3 -left-3 z-10 flex size-24 items-center justify-center sm:size-28", className)}>
      <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 size-full fill-current drop-shadow-sm">
        <path d={CONTORNO} />
      </svg>
      <span className="relative px-3 text-center text-sm leading-tight font-bold sm:text-base">{children}</span>
    </span>
  );
}
