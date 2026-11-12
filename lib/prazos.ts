import { PRAZOS_ENTREGA } from "@/lib/empresa";

export type Zona = keyof typeof PRAZOS_ENTREGA;

/** Código postal português (4785-607 ou 4785) → zona de entrega. */
export function zonaDoCodigoPostal(cp: string): Zona | null {
  const m = cp.trim().match(/^(\d{4})(?:-?\d{3})?$/);
  if (!m) return null;
  const n = Number(m[1]);
  if (n >= 9000 && n <= 9499) return "Madeira";
  if (n >= 9500 && n <= 9999) return "Açores";
  return n >= 1000 ? "Continente" : null;
}

function somarDiasUteis(inicio: Date, dias: number): Date {
  const d = new Date(inicio);
  let faltam = dias;
  while (faltam > 0) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) faltam--;
  }
  return d;
}

const formatar = (d: Date) =>
  d.toLocaleDateString("pt-PT", { weekday: "long", day: "2-digit", month: "2-digit" }).replace("-feira", "");

/** "terça, 17/11 e quinta, 19/11" */
export function janelaDeEntrega(zona: Zona, hoje = new Date()): string {
  const { min, max } = PRAZOS_ENTREGA[zona];
  return `${formatar(somarDiasUteis(hoje, min))} e ${formatar(somarDiasUteis(hoje, max))}`;
}
