import Image from "next/image";

const items = ["Ração", "Acessórios", "Bolsas de Viagem", "Brinquedos", "Higiene", "Camas"];
const track = [...items, ...items];

export default function StoreMarquee() {
  return (
    <div className="w-full overflow-hidden  py-4">
      <div className="flex w-max animate-[marquee_25s_linear_infinite] gap-10 hover:[animation-play-state:paused]">
        {track.map((label, index) => (
          <span
            key={`${label}-${index}`}
            className="flex items-center gap-2 text-[24px] font-bold whitespace-nowrap text-foreground sm:text-[27px] lg:text-[45px]"
          >
            <Image
              src="/images/marqueeFoots.png"
              alt=""
              width={70}
              height={70}
              className="size-9.25 lg:size-17.5"
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
