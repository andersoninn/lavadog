import { HeartHandshake, PawPrint, ShieldCheck } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Qualidade Premium" },
  { icon: PawPrint, label: "Profissionais Especializados" },
  { icon: HeartHandshake, label: "Cuidado que faz a diferença" },
];

export function HeroTrustBadges() {
  return (
    <ul className="flex flex-nowrap items-start justify-center gap-x-6 gap-y-4 sm:justify-start sm:gap-x-8">
      {badges.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex flex-col items-center gap-2.5 text-center sm:flex-row sm:whitespace-nowrap sm:text-left"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#F2E2D2] text-blue-strong">
            <Icon className="size-8 text-blue" />
          </span>
          <span className="max-w-28 text-sm font-medium leading-tight text-foreground/80 lg:max-w-30 text-wrap">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}
