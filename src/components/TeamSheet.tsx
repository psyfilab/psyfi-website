"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { CloseIcon } from "./Icons";
import { ADVISORS, TEAM, type Person } from "@/lib/team";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- context: open the sheet from anywhere ---------- */

type TeamContextValue = { open: () => void; close: () => void; isOpen: boolean };
const TeamContext = createContext<TeamContextValue | null>(null);

export function useTeam() {
    const ctx = useContext(TeamContext);
    if (!ctx) throw new Error("useTeam must be used inside <TeamProvider>");
    return ctx;
}

/** Wrap the page once. Renders the sheet on top of everything when opened. */
export function TeamProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

    return (
        <TeamContext.Provider value={value}>
            {children}
            <AnimatePresence>{isOpen && <TeamSheet onClose={close} />}</AnimatePresence>
        </TeamContext.Provider>
    );
}

/** A plain-text button that opens the sheet (used in the footer). */
export function TeamLink({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    const { open } = useTeam();
    return (
        <button type="button" onClick={open} className={className}>
            {children}
        </button>
    );
}

/* ---------- the sheet ---------- */

function LinkedInGlyph({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
        </svg>
    );
}

function PersonCard({ person, delay }: { person: Person; delay: number }) {
    return (
        <motion.li
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay }}
        >
            <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${person.name} on LinkedIn`}
                className="group block rounded-[22px] outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-warm"
            >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] border border-line bg-tint shadow-[0_1px_2px_rgba(50,18,74,0.06)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_28px_50px_-26px_rgba(50,18,74,0.45)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={person.photo}
                        alt={person.name}
                        loading="lazy"
                        draggable={false}
                        className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-plum/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-white text-plum shadow-[0_6px_18px_-4px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:scale-110 group-hover:bg-coral group-hover:text-white">
                        <LinkedInGlyph className="size-[18px]" />
                    </span>
                </div>

                <h3 className="mt-5 flex items-start gap-1.5 text-[17px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink transition-colors duration-300 [font-family:var(--font-heading)] group-hover:text-coral-ink sm:text-[20px]">
                    <span>{person.name}</span>
                    <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden
                        className="mt-[3px] size-4 shrink-0 -translate-x-1 translate-y-1 text-coral opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                        <path
                            d="M4.5 11.5l7-7M5.5 4.5h6v6"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </h3>
                <p className="mt-1.5 text-[13.5px] font-medium leading-[1.4] text-plum sm:text-[14.5px]">
                    {person.role}
                </p>
                {person.details.length > 0 && (
                    <ul className="mt-2.5 space-y-0.5 text-[12.5px] leading-[1.5] text-muted sm:text-[13.5px]">
                        {person.details.map((line) => (
                            <li key={line}>{line}</li>
                        ))}
                    </ul>
                )}
            </a>
        </motion.li>
    );
}

function Group({
    id,
    title,
    people,
    baseDelay,
}: {
    id: string;
    title: string;
    people: Person[];
    baseDelay: number;
}) {
    return (
        <section aria-labelledby={id}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: baseDelay }}
                className="flex items-center gap-5"
            >
                <h2
                    id={id}
                    className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-none tracking-[-0.03em] text-ink [font-family:var(--font-heading)]"
                >
                    {title}
                </h2>
                <span aria-hidden className="h-px flex-1 bg-line" />
            </motion.div>

            <ul className="mt-9 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:mt-12 md:grid-cols-4">
                {people.map((p, i) => (
                    <PersonCard key={p.name} person={p} delay={baseDelay + 0.1 + i * 0.08} />
                ))}
            </ul>
        </section>
    );
}

function TeamSheet({ onClose }: { onClose: () => void }) {
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement | null;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus({ preventScroll: true });

        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKey);
            previouslyFocused?.focus?.({ preventScroll: true });
        };
    }, [onClose]);

    return (
        <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Advisors and team"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-warm text-ink"
        >
            {/* soft colour glows */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[720px]"
                style={{
                    background:
                        "radial-gradient(55% 55% at 90% 0%, rgba(238,120,103,0.10), transparent 70%), radial-gradient(50% 55% at 0% 10%, rgba(50,18,74,0.06), transparent 70%)",
                }}
            />

            {/* top bar */}
            <div className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur-md">
                <Container className="flex h-[72px] items-center justify-between">
                    <Logo className="h-7 w-auto" />
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        className="group flex items-center gap-2 rounded-full border border-line py-2 pl-4 pr-3 text-[14px] font-medium text-nav transition hover:border-plum hover:text-plum active:scale-95"
                    >
                        Close
                        <CloseIcon className="size-4 transition-transform duration-300 group-hover:rotate-90" />
                    </button>
                </Container>
            </div>

            <Container className="relative pb-24 pt-12 md:pt-20">
                <Group id="advisors-heading" title="Advisors" people={ADVISORS} baseDelay={0.45} />
                <div className="h-20 md:h-28" />
                <Group id="team-heading" title="Team" people={TEAM} baseDelay={0.75} />
            </Container>
        </motion.div>
    );
}