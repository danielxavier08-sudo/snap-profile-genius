import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import { Camera, CheckCircle2, ChevronRight, ClipboardPenLine, UserRound } from "lucide-react";
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
      { title: "Recomendador Sempre Bem — bioimpedância e idade" },
      {
        name: "description",
        content:
          "Envie a foto do relatório de bioimpedância e receba até 6 sugestões priorizadas de suplementos, ajustadas também pela sua faixa de idade.",
      },
      { property: "og:title", content: "Recomendador Sempre Bem" },
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

      <main className="mx-auto max-w-[720px] bg-surface px-4 pb-20 sm:my-6 sm:rounded-xl sm:border sm:border-border sm:px-8 sm:shadow-sm">
        <section className="animate-rise border-b border-border pb-6 pt-7">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">1</span>
            Identificação e medição
          </div>
          <h1 className="text-balance font-display text-[32px] leading-tight text-primary sm:text-[38px]">
            Nova recomendação
          </h1>
          <p className="mt-3 max-w-[58ch] text-pretty text-[14px] leading-relaxed text-muted-foreground">
            Registre os dados do cliente ou envie o relatório para preencher a ficha automaticamente.
          </p>
          <div className="mt-5 flex items-center gap-3 rounded-lg border border-border bg-secondary p-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><UserRound size={19} aria-hidden="true" /></div>
            <div className="min-w-0"><p className="text-sm font-semibold text-primary">{usuario ? "Perfil conectado" : "Atendimento sem perfil"}</p><p className="text-xs text-muted-foreground">{usuario ? "Dados básicos serão reaproveitados nas próximas medições" : "Entre para salvar o cliente e acompanhar as medições"}</p></div>
            {preenchidos > 0 ? <CheckCircle2 className="ml-auto shrink-0 text-primary" size={19} aria-label={`${preenchidos} campos preenchidos`} /> : null}
          </div>
        </section>

        <section className="mb-8 pt-6">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">2</span>
            Entrada de dados
          </div>
          <button
            type="button"
            onClick={() => inputFoto.current?.click()}
            className="group flex w-full items-center gap-3 rounded-xl border-2 border-dashed border-primary/30 bg-secondary/70 p-4 text-left transition-colors hover:border-primary hover:bg-secondary"
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-surface text-primary shadow-sm">
              {previa ? (
                <img src={previa} alt="Relatório enviado" className="h-full w-full object-cover" />
              ) : (
                <Camera size={22} aria-hidden="true" />
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
            <ChevronRight className="ml-auto shrink-0 text-primary" size={20} aria-hidden="true" />
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
            <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold text-primary">
              <ClipboardPenLine size={17} aria-hidden="true" /> Preenchimento manual
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
                <div key={campo.key} className="rounded-xl border border-border bg-secondary/35 p-3">
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
          className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-[16px] font-bold text-primary-foreground shadow-md transition-colors hover:bg-accent active:translate-y-0.5"
        >
          Gerar recomendações <ChevronRight size={20} aria-hidden="true" />
        </button>
        <div ref={ancora} className="scroll-mt-28" />

        {resultado ? (
          <section className="animate-rise mt-9">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                   Etapa 3 · Resultados
                </div>
                 <h2 className="mt-1 font-display text-[28px] leading-tight text-primary">
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

            {resultado.leituras.length ? (
              <div className="animate-risefade mb-5 rounded-2xl border border-border bg-surface p-4">
                <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                  O que a sua medição mostra
                </div>
                <div className="space-y-2.5">
                  {resultado.leituras.map((l) => (
                    <div key={l.rotulo} className="flex gap-2.5">
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                          l.situacao === "normal"
                            ? "bg-primary"
                            : l.situacao === "atencao"
                              ? "bg-danger"
                              : "bg-accent"
                        }`}
                      />
                      <div className="min-w-0">
                        <div className="text-[12.5px] font-semibold">
                          {l.rotulo}
                          <span className="ml-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                            {l.situacao === "normal"
                              ? "normal"
                              : l.situacao === "abaixo"
                                ? "abaixo do ideal"
                                : l.situacao === "acima"
                                  ? "acima do ideal"
                                  : "atenção"}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">{l.texto}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="space-y-3">
              {resultado.recomendacoes.map((rec, indice) => (
                <div
                  key={rec.nome}
                   className="animate-risefade rounded-xl border border-border bg-surface p-4 shadow-sm"
                  style={{ animationDelay: `${0.06 * indice}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-base ${
                        rec.prioridade === 1
                           ? "bg-primary text-primary-foreground"
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
                      <div className="mt-1 text-[15px] font-semibold leading-tight">{rec.nome}</div>
                      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                        {rec.origem === "idade" ? "Sugerido pela sua idade" : "Sugerido pela bioimpedância"}
                      </div>

                      <div className="mt-2.5 rounded-xl border border-accent/20 bg-accent/5 p-2.5">
                        <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
                          Por que para você
                        </div>
                        <p className="text-[12px] font-medium leading-snug">{rec.motivo}</p>
                        <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">{rec.detalhe}</p>
                      </div>

                      <div className="mt-2.5">
                        <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                          Como age no corpo
                        </div>
                        <p className="text-[12px] leading-relaxed text-muted-foreground">{rec.comoAge}</p>
                      </div>

                      <div className="mt-2.5 rounded-xl border border-primary/10 bg-primary/5 p-2.5">
                        <div className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-primary">
                          O que você ganha
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

                      <div className="mt-2.5 grid gap-2">
                        <div>
                          <div className="mb-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                            Resultado esperado
                          </div>
                          <p className="text-[12px] leading-snug text-muted-foreground">{rec.resultadoEsperado}</p>
                        </div>
                        <div>
                          <div className="mb-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                            Como tomar
                          </div>
                          <p className="text-[12px] leading-snug text-muted-foreground">{rec.comoUsar}</p>
                        </div>
                      </div>

                      {rec.alternativas.length ? (
                        <div className="mt-2.5 border-t border-border pt-2.5">
                          <div className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-primary">
                            Outras opções para o mesmo objetivo
                          </div>
                          <div className="space-y-1.5">
                            {rec.alternativas.map((alternativa) => (
                              <div key={alternativa.nome} className="rounded-lg bg-primary/5 px-2.5 py-2">
                                <div className="text-[11.5px] font-semibold">{alternativa.nome}</div>
                                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                                  {alternativa.quandoEscolher}
                                </p>
                              </div>
                            ))}
                          </div>
                          <p className="mt-1.5 text-[10.5px] leading-snug text-muted-foreground">
                            São opções, não itens para usar juntos. Confira o rótulo e escolha apenas uma.
                          </p>
                        </div>
                      ) : null}

                      <div className="mt-2.5 rounded-xl border border-danger/25 bg-danger/5 p-2.5">
                        <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.14em] text-danger">
                          Atenção antes de usar
                        </div>
                        <p className="text-[11.5px] leading-snug text-foreground/80">{rec.cuidados}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>


            {!resultado.bloqueadoMenorIdade ? (
              <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                  Etapa 4 · Acompanhamento
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

        <div className="mt-8 border-t border-border pt-4 text-[10px] leading-relaxed text-muted-foreground">
          FARMÁCIA SEMPRE BEM · Esta sugestão é baseada em dados de bioimpedância e na idade, e não substitui
          avaliação de nutricionista ou médico.
        </div>
      </main>
    </div>
  );
}
