import { Link } from "@tanstack/react-router";
import { useSessao } from "@/hooks/useSessao";
import { History, LogIn } from "lucide-react";
import logoAsset from "@/assets/farmacia-sempre-bem.jpg.asset.json";

export function Cabecalho({ direita }: { direita?: string }) {
  const { usuario } = useSessao();

  return (
    <>
      <div className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-sm">
        <div className="mx-auto flex h-20 max-w-[720px] items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Início — Farmácia Sempre Bem">
            <img src={logoAsset.url} alt="Farmácia Sempre Bem" className="h-14 w-[150px] object-contain object-left" />
            <div className="hidden border-l border-primary-foreground/25 pl-3 leading-tight sm:block">
              <div className="font-display text-sm">Recomendador</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-primary-foreground/70">Bioimpedância</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            {direita ? (
              <span className="hidden text-[11px] text-primary-foreground/70 sm:inline">{direita}</span>
            ) : null}
            <Link
              to={usuario ? "/historico" : "/auth"}
              className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 px-3 py-2 text-[11px] font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              {usuario ? <History aria-hidden="true" /> : <LogIn aria-hidden="true" />}
              {usuario ? "Histórico" : "Entrar"}
            </Link>
          </div>
        </div>
      </div>
      <div className="border-b border-border bg-secondary">
        <div className="mx-auto flex max-w-[720px] items-start gap-2.5 px-4 py-2.5 sm:px-6">
          <span className="mt-px shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">Orientação</span>
          <p className="text-[11px] leading-snug text-secondary-foreground/80">
            Esta sugestão é baseada em dados de bioimpedância e na idade, e não substitui avaliação de
            nutricionista ou médico.
          </p>
        </div>
      </div>
    </>
  );
}
