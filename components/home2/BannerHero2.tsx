import Image from "next/image";
import { cn } from "@/lib/utils";
import { SLIDES_HERO } from "./slides-hero";

type Slide = (typeof SLIDES_HERO)[number];

/** Um banner do herói: imagem de computador e de telemóvel, com fade. */
export default function BannerHero2({ slide, ativo, primeiro }: { slide: Slide; ativo: boolean; primeiro: boolean }) {
  const classe = cn("object-cover transition-opacity duration-700", ativo ? "opacity-100" : "opacity-0");
  return (
    <div aria-hidden={!ativo}>
      <Image src={slide.desktop} alt={slide.alt} fill priority={primeiro} sizes="100vw" className={cn(classe, "hidden md:block")} />
      <Image src={slide.mobile} alt={slide.alt} fill priority={primeiro} sizes="100vw" className={cn(classe, "md:hidden")} />
    </div>
  );
}
