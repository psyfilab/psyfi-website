import type { ReactNode } from "react";

/** The pill above the hero heading: a live pulsing dot and a soft shimmer across the text. */
export function HeroBadge({ children }: { children: ReactNode }) {
    return (
        <p className="inline-flex items-center gap-2.5 rounded-full border border-[#f6cfc7] bg-[#fff4f1] py-1.5 pl-3 pr-4 font-mono text-[12px] font-bold uppercase tracking-[0.1em] shadow-[0_6px_20px_-12px_rgba(238,120,103,0.6)]">
            <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-coral opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-coral" />
            </span>
            <span className="shimmer-text">{children}</span>
        </p>
    );
}