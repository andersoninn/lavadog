import { entrarAdmin } from "@/lib/admin";

export default function LoginAdmin({ erro }: { erro: boolean }) {
  return (
    <form action={entrarAdmin} className="mx-auto mt-24 flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-card p-6">
      <h1 className="text-xl font-bold text-foreground">Encomendas · LavaDog</h1>
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
