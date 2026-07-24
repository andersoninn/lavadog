import { Heart } from "lucide-react";

export function AboutBadge() {
  return (
    <div className="absolute -bottom-7 left-2 flex w-[8.5rem] flex-col items-center rounded-[1.35rem] border border-white/80 bg-card px-4 pb-5 pt-9 text-center shadow-[0_18px_40px_rgba(82,61,34,0.18)] sm:-bottom-6 sm:left-0 sm:w-36">
      <span className="absolute -top-7 flex size-14 items-center justify-center rounded-full border border-primary-soft bg-card text-primary shadow-[0_10px_28px_rgba(82,61,34,0.14)]">
        <Heart className="size-7" strokeWidth={2.25} />
      </span>

      <p className="font-display text-[0.8rem] font-semibold leading-[1.45] text-muted-foreground">
        Seu pet em
        <span className="block ">boas mãos</span>
        <span className="block">sempre!</span>
      </p>
    </div>
  );
}
