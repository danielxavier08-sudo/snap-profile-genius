import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import { Cabecalho } from "@/components/Cabecalho";
import { useSessao } from "@/hooks/useSessao";
import {
  camposBasicos,
  camposComFaixa,
  camposExtras,
  perfilVazio,
  recomendar,
  type Perfil,
} from "@/lib/bioimpedancia";
import { lerRelatorio, obterPerfil, salvarMedicao } from "@/lib/medicoes.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Recomendador Herbamed — suplementos pela bioimpedância e idade" },
      {
        name: "description",
        content:
          "Envie a foto do relatório de bioimpedância e receba até 6 sugestões priorizadas de suplementos, ajustadas também pela sua faixa de idade.",
      },
      { property: "og:title", content: "Recomendador Herbamed" },
      {
        property: "og:description",
        content:
          "Sugestões de suplementos a partir da bioimpedância e da idade, com perfil salvo para acompanhar semana a semana.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { usuario } = useSessao();
  const [perfil, setPerfil] = useState<Perfil>(perfilVazio);
  const [previa, setPrevia] = useState<string | null>(null);
  const [lendo, setLendo] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [mostrar, setMostrar] = useState(false);
  const [statusSalvar, setStatusSalvar] = useState<"idle" | "salvando" | "ok" | "erro">("idle");
  const inputFoto = useRef<HTMLInputElement>(null);
  const ancora = useRef<HTMLDivElement>(null);

  const ler = useServerFn(lerRelatorio);
  const carregarPerfil = useServerFn(obterPerfil);
  const salvar = useServerFn(salvarMedicao);

  useEffect(() => {
    if (!usuario) return;
    let ativo = true;
    carregarPerfil()
      .then((p) => {
        if (!ativo || !p) return;
        setPerfil((atual) => ({
          ...atual,
          idade: atual.idade ?? p.idade ?? null,
          altura: atual.altura ?? p.altura ?? null,
          sexo: p.sexo === "masculino" ? "masculino" : atual.sexo,
        }));
      })
      .catch(() => undefined);
    return () => {
      ativo = false;
    };
  }, [usuario, carregarPerfil]);

  const atualizar = (campo: keyof Perfil, valor: string) => {
    setPerfil((atual) => ({
      ...atual,
      [campo]: valor.trim() === "" ? null : Number(valor.replace(",", ".")),
    }));
  };

  const preenchidos = useMemo(
    () =>
      Object.entries(perfil).filter(
        ([chave, valor]) => chave !== "sexo" && valor !== null && !Number.isNaN(valor),
      ).length,
    [perfil],
  );

  const resultado = useMemo(() => (mostrar ? recomendar(perfil) : null), [mostrar, perfil]);

  const enviarFoto = async (arquivo: File) => {
    setLendo(true);
    setErro(null);
    setMostrar(false);
    try {
      const buffer = await arquivo.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binario = "";
      for (let i = 0; i < bytes.length; i += 32768) {
        binario += String.fromCharCode(...bytes.subarray(i, i + 32768));
      }
      const mime = ["image/jpeg", "image/png", "image/webp"].includes(arquivo.type)
        ? arquivo.type
        : "image/jpeg";
      const lidos = await ler({ data: { imagemBase64: btoa(binario), mimeType: mime } });
      setPerfil((atual) => {
        const proximo = { ...atual };
        for (const [chave, valor] of Object.entries(lidos)) {
          if (valor !== null && valor !== undefined) {
            (proximo as Record<string, unknown>)[chave] = valor;
          }
        }
        return proximo;
      });
    } catch {
      setErro(
        "Não consegui ler o relatório nesta foto. Tente uma imagem mais nítida ou preencha os campos manualmente.",
      );
    } finally {
      setLendo(false);
    }
  };

  const salvarNoHistorico = async () => {
    if (!resultado) return;
    setStatusSalvar("salvando");
    try {
      await salvar({
        data: {
          dados: perfil,
          recomendacoes: resultado.recomendacoes.map((r) => ({
            nome: r.nome,
            categoria: r.categoria,
            prioridade: r.prioridade,
            motivo: r.motivo,
          })),
        },
      });
      setStatusSalvar("ok");
    } catch {
      setStatusSalvar("erro");
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Cabecalho direita={`${preenchidos} campos`} />

      <main className="mx-auto max-w-[430px] px-4 pb-16">
        <section className="animate-rise pb-5 pt-7">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            (a) Entrada de dados
          </div>
          <h1 className="text-balance font-display text-[46px] leading-[0.92] tracking-tight">
            Leitura da
            <br />
            bioimpedância
          </h1>
          <p className="mt-3 max-w-[34ch] text-pretty text-[13px] leading-relaxed text-muted-foreground">
            Envie a foto do relatório e confira os valores abaixo. Geramos até 6 sugestões priorizadas,
            considerando também a sua faixa de idade.
          </p>
        </section>

        <section className="mb-8">
          <button
            type="button"
            onClick={() => inputFoto.current?.click()}
            className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-primary/40 bg-surface/60 p-4 text-left"
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-primary/10 font-display text-lg text-primary">
              {previa ? (
                <img src={previa} alt="Relatório enviado" className="h-full w-full object-cover" />
              ) : (
                "↑"
              )}
            </div>
            <div className="min-w-0">
              <div className="text-[14px] font-semibold">
                {lendo ? "Lendo o relatório…" : previa ? "Foto do relatório enviada" : "Enviar foto do relatório"}
              </div>
              <div className="text-[12px] text-muted-foreground">
                {lendo ? "extraindo os valores para os campos abaixo" : "os valores são lidos e preenchidos automaticamente"}
              </div>
            </div>
            <div className="ml-auto shrink-0 font-mono text-[10px] text-muted-foreground">JPG/PNG</div>
          </button>
          <input
            ref={inputFoto}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const arquivo = e.target.files?.[0];
              if (arquivo) {
                setPrevia(URL.createObjectURL(arquivo));
                void enviarFoto(arquivo);
              }
            }}
          />
          {erro ? <p className="mt-2 text-[12px] text-danger">{erro}</p> : null}

          <div className="mt-6">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Preenchimento manual
            </div>
            <div className="grid grid-cols-2 gap-3">
              {camposBasicos.map((campo) => (
                <label key={campo.key} className="block">
                  <span className="mb-1.5 block text-[11px] font-medium">{campo.label}</span>
                  <input
                    inputMode="decimal"
                    className="field"
                    value={perfil[campo.key] ?? ""}
                    onChange={(e) => atualizar(campo.key, e.target.value)}
                  />
                </label>
              ))}
              <label className="col-span-2 block">
                <span className="mb-1.5 block text-[11px] font-medium">Sexo</span>
                <select
                  className="field"
                  value={perfil.sexo}
                  onChange={(e) =>
                    setPerfil((atual) => ({
                      ...atual,
                      sexo: e.target.value === "masculino" ? "masculino" : "feminino",
                    }))
                  }
                >
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                </select>
              </label>
            </div>

            <div className="mt-5 space-y-3">
              {camposComFaixa.map((campo) => (
                <div key={campo.key} className="rounded-2xl border border-border bg-surface p-3">
                  <div className="mb-2 text-[11px] font-medium">{campo.label}</div>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      inputMode="decimal"
                      placeholder="valor"
                      className="field"
                      value={perfil[campo.key] ?? ""}
                      onChange={(e) => atualizar(campo.key, e.target.value)}
                    />
                    <input
                      inputMode="decimal"
                      placeholder="mín."
                      className="field"
                      value={perfil[campo.min] ?? ""}
                      onChange={(e) => atualizar(campo.min, e.target.value)}
                    />
                    <input
                      inputMode="decimal"
                      placeholder="máx."
                      className="field"
                      value={perfil[campo.max] ?? ""}
                      onChange={(e) => atualizar(campo.max, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {camposExtras.map((campo) => (
                <label key={campo.key} className="block">
                  <span className="mb-1.5 block text-[11px] font-medium">{campo.label}</span>
                  <input
                    inputMode="decimal"
                    className="field"
                    value={perfil[campo.key] ?? ""}
                    onChange={(e) => atualizar(campo.key, e.target.value)}
                  />
                </label>
              ))}
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={() => {
            setMostrar(true);
            setStatusSalvar("idle");
            setTimeout(() => ancora.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
          }}
          className="h-14 w-full rounded-2xl bg-accent font-display text-lg tracking-wide text-accent-foreground transition-transform active:translate-y-0.5"
        >
          Gerar recomendações
        </button>
        <div ref={ancora} className="scroll-mt-28" />

        {resultado ? (
          <section className="animate-rise mt-9">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  (b) Resultados
                </div>
                <h2 className="mt-1 font-display text-[30px] leading-none tracking-tight">
                  {resultado.bloqueadoMenorIdade
                    ? "Sem sugestões"
                    : `${resultado.recomendacoes.length} priorizadas`}
                </h2>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">
                {resultado.faixaIdade ?? "por prioridade"}
              </span>
            </div>

            {resultado.bloqueadoMenorIdade ? (
              <div className="animate-risefade rounded-2xl bg-danger p-4 text-danger-foreground">
                <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-danger-foreground" />
                  Menor de 18 anos
                </div>
                <p className="text-[13px] leading-snug">
                  Não geramos sugestões de suplementação para menores de 18 anos. Procure um pediatra ou
                  nutricionista.
                </p>
              </div>
            ) : null}

            {resultado.alerta ? (
              <div className="animate-risefade mb-3 rounded-2xl bg-danger p-4 text-danger-foreground">
                <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-danger-foreground" />
                  Alerta de alto risco
                </div>
                <p className="text-[13px] leading-snug">{resultado.alerta}</p>
              </div>
            ) : null}

            <div className="space-y-3">
              {resultado.recomendacoes.map((rec, indice) => (
                <div
                  key={rec.nome}
                  className="animate-risefade rounded-2xl border border-border bg-surface p-4"
                  style={{ animationDelay: `${0.06 * indice}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-base ${
                        rec.prioridade === 1
                          ? "bg-accent text-accent-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {indice + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary">
                          {rec.categoria}
                        </span>
                        <span
                          className={`ml-auto shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] ${
                            rec.prioridade === 1 ? "text-accent" : "text-muted-foreground"
                          }`}
                        >
                          {rec.prioridade === 1 ? "Prioridade alta" : rec.prioridade === 2 ? "Média" : "Manutenção"}
                        </span>
                      </div>
                      <div className="mt-1 text-[15px] font-semibold">{rec.nome}</div>
                      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                        {rec.origem === "idade" ? "Sugerido pela idade" : "Sugerido pela bioimpedância"}
                      </div>
                      <p className="mt-1 text-[12px] leading-snug text-muted-foreground">
                        Pode ser interessante considerar — {rec.motivo}.
                      </p>
                      <div className="mt-2.5 rounded-xl border border-primary/10 bg-primary/5 p-2.5">
                        <div className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-primary">
                          Benefícios para o cliente
                        </div>
                        <ul className="space-y-1">
                          {rec.beneficios.map((b) => (
                            <li key={b} className="flex gap-1.5 text-[11.5px] leading-snug text-foreground/80">
                              <span className="shrink-0 text-accent">•</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!resultado.bloqueadoMenorIdade ? (
              <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  (c) Acompanhamento
                </div>
                {usuario ? (
                  <>
                    <p className="mt-2 text-[13px] leading-snug text-muted-foreground">
                      Salve esta medição para comparar com as próximas e repetir toda semana ou todo mês.
                    </p>
                    <button
                      type="button"
                      onClick={salvarNoHistorico}
                      disabled={statusSalvar === "salvando"}
                      className="mt-3 h-12 w-full rounded-xl bg-primary font-display text-base tracking-wide text-primary-foreground disabled:opacity-60"
                    >
                      {statusSalvar === "salvando"
                        ? "Salvando…"
                        : statusSalvar === "ok"
                          ? "Medição salva ✓"
                          : "Salvar no meu histórico"}
                    </button>
                    {statusSalvar === "ok" ? (
                      <Link
                        to="/historico"
                        className="mt-3 block text-center font-mono text-[10px] uppercase tracking-[0.16em] text-primary"
                      >
                        Ver histórico
                      </Link>
                    ) : null}
                    {statusSalvar === "erro" ? (
                      <p className="mt-2 text-[12px] text-danger">
                        Não conseguimos salvar agora. Tente novamente em instantes.
                      </p>
                    ) : null}
                  </>
                ) : (
                  <>
                    <p className="mt-2 text-[13px] leading-snug text-muted-foreground">
                      Crie sua conta para guardar o perfil e o histórico das medições — assim a próxima
                      bioimpedância já vem comparada com esta.
                    </p>
                    <Link
                      to="/auth"
                      className="mt-3 grid h-12 w-full place-items-center rounded-xl bg-primary font-display text-base tracking-wide text-primary-foreground"
                    >
                      Criar conta / entrar
                    </Link>
                  </>
                )}
              </div>
            ) : null}
          </section>
        ) : null}

        <div className="mt-8 border-t border-border pt-4 font-mono text-[10px] leading-relaxed text-muted-foreground">
          p.01 — HERBAMED · Esta sugestão é baseada em dados de bioimpedância e na idade, e não substitui
          avaliação de nutricionista ou médico.
        </div>
      </main>
    </div>
  );
}
