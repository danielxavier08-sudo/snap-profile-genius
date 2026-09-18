import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { camposNumericos, perfilVazio, type Perfil } from "@/lib/bioimpedancia";

type LeituraInput = { imagemBase64: string; mimeType: string };

const CAMPOS = camposNumericos.join(", ");

export const lerRelatorio = createServerFn({ method: "POST" })
  .inputValidator((data: LeituraInput) => {
    if (!data?.imagemBase64) throw new Error("imagem obrigatória");
    return data;
  })
  .handler(async ({ data }): Promise<Partial<Record<keyof Perfil, number | null>>> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI indisponível");

    const resposta = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.8-flash",
        messages: [
          {
            role: "system",
            content:
              "Você lê relatórios de bioimpedância (InBody, Omron e similares) e extrai os valores numéricos. " +
              "Responda SOMENTE com um objeto JSON válido, sem texto extra e sem markdown. " +
              `Chaves permitidas: ${CAMPOS}. ` +
              "Use ponto como separador decimal. Campos terminados em Min/Max são os limites da faixa normal impressa ao lado do valor. " +
              "Use null para o que não aparecer no relatório.",
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Extraia os valores deste relatório de bioimpedância." },
              {
                type: "image_url",
                image_url: { url: `data:${data.mimeType};base64,${data.imagemBase64}` },
              },
            ],
          },
        ],
      }),
    });

    if (!resposta.ok) {
      console.error("AI gateway error", resposta.status, await resposta.text());
      throw new Error("Não foi possível ler o relatório");
    }

    const json = (await resposta.json()) as { choices?: { message?: { content?: string } }[] };
    const texto = json.choices?.[0]?.message?.content ?? "";
    const bruto = texto.slice(texto.indexOf("{"), texto.lastIndexOf("}") + 1);
    let extraido: Record<string, unknown>;
    try {
      extraido = JSON.parse(bruto) as Record<string, unknown>;
    } catch {
      throw new Error("Resposta da leitura inválida");
    }

    const saida: Partial<Record<keyof Perfil, number | null>> = {};
    for (const campo of camposNumericos) {
      const valor = extraido[campo as string];
      const numero = typeof valor === "string" ? Number(valor.replace(",", ".")) : valor;
      if (typeof numero === "number" && Number.isFinite(numero)) {
        saida[campo] = numero;
      }
    }
    return saida;
  });

export type PerfilSalvo = {
  nome: string | null;
  idade: number | null;
  sexo: string;
  altura: number | null;
  cadencia: string;
};

export const obterPerfil = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("perfis")
      .select("nome, idade, sexo, altura, cadencia")
      .eq("id", context.userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (data ?? null) as PerfilSalvo | null;
  });

export const salvarPerfil = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: Partial<PerfilSalvo>) => data)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("perfis").upsert({
      id: context.userId,
      nome: data.nome ?? null,
      idade: data.idade ?? null,
      sexo: data.sexo ?? "feminino",
      altura: data.altura ?? null,
      cadencia: data.cadencia ?? "mensal",
      updated_at: new Date().toISOString(),
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export type MedicaoSalva = {
  id: string;
  medido_em: string;
  dados: Perfil;
  recomendacoes: { nome: string; categoria: string; prioridade: number; motivo: string }[];
  observacoes: string | null;
};

export const listarMedicoes = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("medicoes")
      .select("id, medido_em, dados, recomendacoes, observacoes")
      .eq("user_id", context.userId)
      .order("medido_em", { ascending: false })
      .limit(60);
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as MedicaoSalva[];
  });

export const salvarMedicao = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      dados: Perfil;
      recomendacoes: { nome: string; categoria: string; prioridade: number; motivo: string }[];
      observacoes?: string | null;
    }) => {
      if (!data?.dados) throw new Error("dados obrigatórios");
      return data;
    },
  )
  .handler(async ({ data, context }) => {
    const dados: Perfil = { ...perfilVazio, ...data.dados };
    const { error } = await context.supabase.from("medicoes").insert({
      user_id: context.userId,
      dados: JSON.parse(JSON.stringify(dados)),
      recomendacoes: JSON.parse(JSON.stringify(data.recomendacoes)),
      observacoes: data.observacoes ?? null,
    });
    if (error) throw new Error(error.message);

    await context.supabase.from("perfis").upsert({
      id: context.userId,
      idade: dados.idade,
      sexo: dados.sexo,
      altura: dados.altura,
      updated_at: new Date().toISOString(),
    });

    return { ok: true };
  });

export const excluirMedicao = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("medicoes")
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
