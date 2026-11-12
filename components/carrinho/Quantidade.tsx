import { Minus, Plus } from "lucide-react";

type Props = {
  valor: number;
  desativado?: boolean;
  onMudar: (novo: number) => void;
};

/** − 1 + */
export default function Quantidade({ valor, desativado, onMudar }: Props) {
  const botao =
    "flex size-10 items-center justify-center hover:text-primary-hover disabled:opacity-40";
  return (
    <div className="flex h-10 items-center rounded-md border border-border bg-card">
      <button
        type="button"
        disabled={desativado}
        onClick={() => onMudar(valor - 1)}
        aria-label="Diminuir quantidade"
        className={botao}
      >
        <Minus className="size-4" />
      </button>
      <span className="w-6 text-center font-semibold">{valor}</span>
      <button
        type="button"
        disabled={desativado}
        onClick={() => onMudar(valor + 1)}
        aria-label="Aumentar quantidade"
        className={botao}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
