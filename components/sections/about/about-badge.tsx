import { PawPrint } from "lucide-react";

export function AboutBadge() {
  return (
    <div className="absolute -bottom-5 -left-4 flex w-36 items-center gap-2 rounded-2xl border border-border bg-card p-3 text-left shadow-lg sm:-left-6 sm:w-40">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-hover">
        <PawPrint className="size-4" />
      </span>
      <p className="text-xs font-semibold leading-snug text-foreground">
        Seu pet em boas mãos, sempre!
      </p>
    </div>
  );
}
