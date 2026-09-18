import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Cabecalho } from "@/components/Cabecalho";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — Recomendador Herbamed" },
      {
        name: "description",
        content:
          "Crie sua conta para salvar o perfil e acompanhar suas medições de bioimpedância semana a semana.",
      },
      { property: "og:title", content: "Entrar — Recomendador Herbamed" },
      {
        property: "og:description",
        content: "Salve seu perfil e acompanhe a evolução das suas medições de bioimpedância.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [modo, setModo] = useState<"entrar" | "criar">("entrar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setAviso(null);
    setEnviando(true);
    try {
      if (modo === "criar") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: senha,
          options: { emailRedirectTo: window.location.origin, data: { nome } },
        });
        if (error) throw error;
        if (!data.session) {
          setAviso("Conta criada. Confirme o e-mail que enviamos para começar a salvar suas medições.");
          return;
        }
        navigate({ to: "/historico" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        if (error) throw error;
        navigate({ to: "/historico" });
      }
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Não foi possível continuar.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Cabecalho />
      <main className="mx-auto max-w-[430px] px-4 pb-16">
        <section className="animate-rise pb-5 pt-7">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            Acompanhamento
          </div>
          <h1 className="text-balance font-display text-[42px] leading-[0.92] tracking-tight">
            {modo === "entrar" ? "Entrar na conta" : "Criar conta"}
          </h1>
          <p className="mt-3 max-w-[34ch] text-pretty text-[13px] leading-relaxed text-muted-foreground">
            Seu perfil fica salvo e cada nova bioimpedância entra no histórico — ideal para repetir toda
            semana ou todo mês.
          </p>
        </section>

        <form onSubmit={enviar} className="space-y-3">
          {modo === "criar" ? (
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-medium">Nome</span>
              <input className="field" value={nome} onChange={(e) => setNome(e.target.value)} />
            </label>
          ) : null}
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-medium">E-mail</span>
            <input
              type="email"
              required
              autoComplete="email"
              className="field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-medium">Senha</span>
            <input
              type="password"
              required
              minLength={6}
              autoComplete={modo === "criar" ? "new-password" : "current-password"}
              className="field"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>

          {erro ? (
            <p className="rounded-xl bg-danger p-3 text-[12px] text-danger-foreground">{erro}</p>
          ) : null}
          {aviso ? (
            <p className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-[12px] text-primary">
              {aviso}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={enviando}
            className="h-14 w-full rounded-2xl bg-accent font-display text-lg tracking-wide text-accent-foreground transition-transform active:translate-y-0.5 disabled:opacity-60"
          >
            {enviando ? "Aguarde…" : modo === "entrar" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setModo(modo === "entrar" ? "criar" : "entrar");
            setErro(null);
            setAviso(null);
          }}
          className="mt-4 w-full font-mono text-[10px] uppercase tracking-[0.16em] text-primary"
        >
          {modo === "entrar" ? "Ainda não tenho conta" : "Já tenho conta"}
        </button>

        <Link
          to="/"
          className="mt-8 block text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
        >
          Voltar ao recomendador
        </Link>
      </main>
    </div>
  );
}
