import { entrarAdmin } from "@/lib/admin";

export default function LoginAdmin({ erro }: { erro: boolean }) {
  return (
    <form action={entrarAdmin} className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-border bg-card p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Encomendas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Área reservada da LavaDog Store.</p>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
        Palavra-passe
        <input
          type="password"
          name="senha"
          required
          autoFocus
          className="rounded-lg border border-border bg-background px-3 py-2.5 text-base outline-none focus:border-foreground"
        />
      </label>
      {erro && <p className="text-sm text-red-600">Palavra-passe errada.</p>}
      <button type="submit" className="rounded-full bg-primary py-3 text-sm font-bold text-[#3A2C22] hover:bg-primary-hover">
        Entrar
      </button>
    </form>
  );
}
