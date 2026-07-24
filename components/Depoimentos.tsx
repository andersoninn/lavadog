import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

export default function Depoimentos() {
  return (
    <div className="flex h-full w-full items-center bg-background px-6 sm:px-12 lg:px-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="relative mx-auto flex size-64 items-center justify-center rounded-full bg-primary-soft">
          <Quote className="absolute -top-4 -left-4 size-10 text-primary" fill="currentColor" />
          <span className="text-sm font-medium text-muted-foreground">Foto do cliente</span>
        </div>

        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Depoimentos
          </span>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            &ldquo;Encontrei a LavaDog Store enquanto procurava um banho e tosa de confiança para
            o meu golden retriever. A equipe realmente entende do assunto e trata cada pet com
            muito carinho. Recomendo de olhos fechados.&rdquo;
          </p>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-muted" />
              <div>
                <p className="font-semibold text-foreground">Mariana Silva</p>
                <p className="text-xs font-medium uppercase text-muted-foreground">
                  Tutora de Cachorro
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Depoimento anterior"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Próximo depoimento"
                className="flex size-9 items-center justify-center rounded-full border border-border bg-foreground text-background transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
