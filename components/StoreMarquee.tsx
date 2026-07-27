import Marquee from "@/components/Marquee";

const items = ["Ração", "Acessórios", "Bolsas de Viagem", "Brinquedos", "Higiene", "Camas"];

export default function StoreMarquee() {
  return <Marquee items={items} />;
}
