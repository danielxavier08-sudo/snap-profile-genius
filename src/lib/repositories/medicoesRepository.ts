import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { Perfil } from "@/lib/bioimpedancia";
import type { MedicaoSalva, PerfilSalvo } from "@/lib/medicoes.functions";

/**
 * Repository: concentra todo o acesso às tabelas `perfis` e `medicoes`.
 *
 * Antes deste padrão, cada server function em `medicoes.functions.ts` chamava
 * `context.supabase.from(...)` diretamente. Isso espalhava o conhecimento do
 * esquema do banco (nomes de tabela e de coluna) por vários arquivos: trocar
 * de banco, renomear uma coluna ou adicionar um cache exigiria caçar cada
 * chamada supabase espalhada pelo código.
 *
 * Com o Repository, só este arquivo conhece as tabelas `perfis` e `medicoes`.
 * As server functions (camada de Controller) passam a depender apenas desta
 * interface, não do Supabase.
 */
export class MedicoesRepository {
  constructor(private readonly supabase: SupabaseClient<Database>) {}

  async buscarPerfil(userId: string): Promise<PerfilSalvo | null> {
    const { data, error } = await this.supabase
      .from("perfis")
      .select("nome, idade, sexo, altura, cadencia")
      .eq("id", userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (data ?? null) as PerfilSalvo | null;
  }

  async salvarPerfil(userId: string, dados: Partial<PerfilSalvo>): Promise<void> {
    const { error } = await this.supabase.from("perfis").upsert({
      id: userId,
      nome: dados.nome ?? null,
      idade: dados.idade ?? null,
      sexo: dados.sexo ?? "feminino",
      altura: dados.altura ?? null,
      cadencia: dados.cadencia ?? "mensal",
      updated_at: new Date().toISOString(),
    });
    if (error) throw new Error(error.message);
  }

  async listarMedicoes(userId: string, limite = 60): Promise<MedicaoSalva[]> {
    const { data, error } = await this.supabase
      .from("medicoes")
      .select("id, medido_em, dados, recomendacoes, observacoes")
      .eq("user_id", userId)
      .order("medido_em", { ascending: false })
      .limit(limite);
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as MedicaoSalva[];
  }

  async inserirMedicao(
    userId: string,
    dados: Perfil,
    recomendacoes: MedicaoSalva["recomendacoes"],
    observacoes: string | null,
  ): Promise<void> {
    const { error } = await this.supabase.from("medicoes").insert({
      user_id: userId,
      dados: JSON.parse(JSON.stringify(dados)),
      recomendacoes: JSON.parse(JSON.stringify(recomendacoes)),
      observacoes: observacoes ?? null,
    });
    if (error) throw new Error(error.message);
  }

  async excluirMedicao(userId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from("medicoes")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);
    if (error) throw new Error(error.message);
  }
}
