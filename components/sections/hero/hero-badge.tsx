import { Heart } from "lucide-react";

export function HeroBadge() {
  return (
    <div className="flex w-[7.5rem] flex-col items-center rounded-[1.15rem] border border-white/80 bg-card px-3 pb-4 pt-8 text-center shadow-[0_18px_40px_rgba(82,61,34,0.18)] sm:w-[8.5rem] md:w-[8.5rem] md:rounded-[1.35rem] md:px-4 md:pb-5 md:pt-9 lg:w-36">
      <span className="absolute -top-6 flex size-12 items-center justify-center rounded-full border border-primary-soft bg-card text-primary shadow-[0_10px_28px_rgba(82,61,34,0.14)] md:-top-7 md:size-14">
        <Heart className="size-6 md:size-7" strokeWidth={2.25} aria-hidden="true" />
      </span>

      <p className="font-display text-[0.72rem] font-semibold leading-[1.45] text-muted-foreground sm:text-[0.8rem]">
        Feito com
        <span className="block text-[0.8rem] font-extrabold text-primary sm:text-[0.88rem]">
          muito amor
        </span>
        <span className="block">para quem voc&ecirc;</span>
        <span className="block">mais ama</span>
      </p>
    </div>
  );
}
