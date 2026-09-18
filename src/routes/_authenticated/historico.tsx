import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Cabecalho } from "@/components/Cabecalho";
import { faixaDeIdade } from "@/lib/bioimpedancia";
import {
  excluirMedicao,
  listarMedicoes,
  obterPerfil,
  salvarPerfil,
  type MedicaoSalva,
} from "@/lib/medicoes.functions";

export const Route = createFileRoute("/_authenticated/historico")({
  head: () => ({
    meta: [
      { title: "Meu histórico — Recomendador Sempre Bem" },
      {
        name: "description",
        content:
          "Perfil salvo, cadência de medição e comparação entre as suas bioimpedâncias ao longo do tempo.",
      },
      { property: "og:title", content: "Meu histórico — Recomendador Sempre Bem" },
      {
        property: "og:description",
        content: "Acompanhe a evolução das suas medições de bioimpedância semana a semana ou mês a mês.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Historico,
});

const metricas: { key: string; label: string; unidade: string; melhor: "maior" | "menor" }[] = [
  { key: "peso", label: "Peso", unidade: "kg", melhor: "menor" },
  { key: "imc", label: "IMC", unidade: "", melhor: "menor" },
  { key: "gorduraPerc", label: "Gordura (%)", unidade: "%", melhor: "menor" },
  { key: "musculo", label: "Massa muscular", unidade: "kg", melhor: "maior" },
  { key: "visceral", label: "Gordura visceral", unidade: "", melhor: "menor" },
  { key: "agua", label: "Água corporal", unidade: "kg", melhor: "maior" },
];

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Historico() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const carregarMedicoes = useServerFn(listarMedicoes);
  const carregarPerfil = useServerFn(obterPerfil);
  const gravarPerfil = useServerFn(salvarPerfil);
  const apagar = useServerFn(excluirMedicao);

  const medicoes = useQuery({ queryKey: ["medicoes"], queryFn: () => carregarMedicoes() });
  const perfil = useQuery({ queryKey: ["perfil"], queryFn: () => carregarPerfil() });

  const [nome, setNome] = useState("");
  const [cadencia, setCadencia] = useState("mensal");
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    if (perfil.data) {
      setNome(perfil.data.nome ?? "");
      setCadencia(perfil.data.cadencia ?? "mensal");
    }
  }, [perfil.data]);

  const lista: MedicaoSalva[] = medicoes.data ?? [];
  const ultima = lista[0];
  const anterior = lista[1];

  const proxima = (() => {
    if (!ultima) return null;
    const dias = cadencia === "semanal" ? 7 : cadencia === "quinzenal" ? 15 : 30;
    const data = new Date(ultima.medido_em);
    data.setDate(data.getDate() + dias);
    const faltam = Math.ceil((data.getTime() - Date.now()) / 86400000);
    return { data, faltam };
  })();

  const sair = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const gravar = async () => {
    await gravarPerfil({
      data: {
        nome,
        cadencia,
        idade: perfil.data?.idade ?? null,
        sexo: perfil.data?.sexo ?? "feminino",
        altura: perfil.data?.altura ?? null,
      },
    });
    setSalvo(true);
    void perfil.refetch();
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Cabecalho direita={`${lista.length} medições`} />

      <main className="mx-auto max-w-[720px] bg-surface px-4 pb-16 sm:my-6 sm:rounded-xl sm:border sm:border-border sm:px-8 sm:shadow-sm">
        <section className="animate-rise pb-5 pt-7">
          <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
            Perfil do cliente
          </div>
          <h1 className="text-balance font-display text-[34px] leading-tight text-primary">
            Histórico de
            <br />
            medições
          </h1>
          <p className="mt-3 max-w-[34ch] text-pretty text-[13px] leading-relaxed text-muted-foreground">
            Seu perfil fica salvo e já vem preenchido na próxima leitura.
            {perfil.data?.idade
              ? ` Faixa atual: ${faixaDeIdade(perfil.data.idade) ?? "—"}.`
              : ""}
          </p>
        </section>

        <section className="rounded-xl border border-border bg-secondary/35 p-4">
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-medium">Nome</span>
            <input
              className="field"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                setSalvo(false);
              }}
            />
          </label>
          <div className="mt-4">
            <span className="mb-2 block text-[11px] font-medium">Quero medir novamente</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { valor: "semanal", label: "Toda semana" },
                { valor: "quinzenal", label: "A cada 15 dias" },
                { valor: "mensal", label: "Todo mês" },
              ].map((opcao) => (
                <button
                  key={opcao.valor}
                  type="button"
                  onClick={() => {
                    setCadencia(opcao.valor);
                    setSalvo(false);
                  }}
                  className={`rounded-xl border px-2 py-2.5 text-[11px] leading-tight ${
                    cadencia === opcao.valor
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {opcao.label}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={gravar}
            className="mt-4 h-12 w-full rounded-xl bg-primary font-display text-base tracking-wide text-primary-foreground"
          >
            {salvo ? "Perfil salvo ✓" : "Salvar perfil"}
          </button>
          {proxima ? (
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Próxima medição sugerida: {formatarData(proxima.data.toISOString())}
              {proxima.faltam > 0 ? ` · em ${proxima.faltam} dia(s)` : " · já pode medir"}
            </p>
          ) : null}
        </section>

        {ultima && anterior ? (
          <section className="mt-8">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
              Comparação com a medição anterior
            </div>
            <div className="space-y-2">
              {metricas.map((m) => {
                const atual = (ultima.dados as unknown as Record<string, number | null>)[m.key];
                const antes = (anterior.dados as unknown as Record<string, number | null>)[m.key];
                if (atual === null || atual === undefined || antes === null || antes === undefined) {
                  return null;
                }
                const delta = Number((atual - antes).toFixed(1));
                const bom = m.melhor === "menor" ? delta < 0 : delta > 0;
                return (
                  <div
                    key={m.key}
                    className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5"
                  >
                    <span className="text-[12px] font-medium">{m.label}</span>
                    <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                      {antes} → {atual} {m.unidade}
                    </span>
                    <span
                      className={`shrink-0 font-mono text-[11px] ${
                        delta === 0 ? "text-muted-foreground" : bom ? "text-primary" : "text-accent"
                      }`}
                    >
                      {delta > 0 ? `+${delta}` : delta}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="mt-8">
          <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
            Medições salvas
          </div>

          {medicoes.isLoading ? (
            <p className="text-[13px] text-muted-foreground">Carregando…</p>
          ) : lista.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-5 text-center">
              <p className="text-[13px] text-muted-foreground">
                Você ainda não salvou medições. Faça uma leitura e toque em “Salvar no meu histórico”.
              </p>
              <Link
                to="/"
                className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-primary"
              >
                Nova medição
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {lista.map((medicao) => {
                const dados = medicao.dados as unknown as Record<string, number | null>;
                return (
                  <div key={medicao.id} className="rounded-2xl border border-border bg-surface p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[18px] tracking-tight">
                        {formatarData(medicao.medido_em)}
                      </span>
                      <button
                        type="button"
                        onClick={async () => {
                          await apagar({ data: { id: medicao.id } });
                          void medicoes.refetch();
                        }}
                        className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        Apagar
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-muted-foreground">
                      {metricas.map((m) =>
                        dados[m.key] === null || dados[m.key] === undefined ? null : (
                          <span key={m.key}>
                            {m.label}: {dados[m.key]}
                            {m.unidade}
                          </span>
                        ),
                      )}
                    </div>
                    {medicao.recomendacoes?.length ? (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {medicao.recomendacoes.map((r) => (
                          <span
                            key={r.nome}
                            className="rounded-lg border border-primary/15 bg-primary/5 px-2 py-1 text-[10.5px] text-primary"
                          >
                            {r.nome}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
          <Link to="/" className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
            Nova medição
          </Link>
          <button
            type="button"
            onClick={sair}
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
          >
            Sair da conta
          </button>
        </div>
      </main>
    </div>
  );
}
