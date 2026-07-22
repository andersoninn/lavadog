import { Heart } from "lucide-react";

export function HeroFloatingCard() {
  return (
    <div className="absolute -bottom-6 -right-4 flex w-44 flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center shadow-lg sm:-right-8 sm:w-48">
      <span className="flex size-9 items-center justify-center rounded-full bg-blue-soft text-blue-strong">
        <Heart className="size-4.5 fill-current" />
      </span>
      <p className="text-sm leading-snug text-foreground/80">
        Feito com <span className="font-semibold text-primary-hover">muito amor</span>{" "}
        para quem você mais ama
      </p>
    </div>
  );
}
