import { Link } from "@tanstack/react-router";
import { useSessao } from "@/hooks/useSessao";

export function Cabecalho({ direita }: { direita?: string }) {
  const { usuario } = useSessao();

  return (
    <>
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[430px] items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary font-display text-sm leading-none text-primary-foreground">
              H
            </div>
            <div className="leading-tight">
              <div className="font-display text-[15px] tracking-wide">HERBAMED</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                Recomendador
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            {direita ? (
              <span className="font-mono text-[10px] text-muted-foreground">{direita}</span>
            ) : null}
            <Link
              to={usuario ? "/historico" : "/auth"}
              className="rounded-lg border border-border bg-surface px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary"
            >
              {usuario ? "Meu histórico" : "Entrar"}
            </Link>
          </div>
        </div>
      </div>
      <div className="sticky top-14 z-30 bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-[430px] items-start gap-2 px-4 py-2">
          <span className="mt-px shrink-0 font-mono text-[10px] uppercase tracking-[0.16em]">Aviso</span>
          <p className="text-[11px] leading-snug text-primary-foreground/90">
            Esta sugestão é baseada em dados de bioimpedância e na idade, e não substitui avaliação de
            nutricionista ou médico.
          </p>
        </div>
      </div>
    </>
  );
}
