import type { ReactNode } from "react";

const base = "font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-coral-ink";

/** Small mono label with a coral dot, used above every heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className={`flex items-center gap-[9px] ${base}`}>
      <span className="size-2 shrink-0 rounded-full bg-coral" />
      {children}
    </p>
  );
}

/** Same label without the dot (card tags). */
export function Tag({ children }: { children: ReactNode }) {
  return <p className={base}>{children}</p>;
}
