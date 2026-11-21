"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type FormEvent,
    type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { CONTACT_EMAIL, FORMSPREE_ENDPOINT } from "@/lib/config";
import { Eyebrow } from "./Eyebrow";
import { ArrowRightIcon, CheckIcon, CloseIcon } from "./Icons";

/* ------------------------------------------------------------------ */
/* Context: any button can call useDiagnostic().open()                 */
/* ------------------------------------------------------------------ */

const DiagnosticContext = createContext<{ open: () => void }>({ open: () => { } });
export const useDiagnostic = () => useContext(DiagnosticContext);

export function DiagnosticProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const opener = useRef<HTMLElement | null>(null);

    const open = useCallback(() => {
        opener.current = document.activeElement as HTMLElement | null;
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        opener.current?.focus?.(); // give focus back to the button that opened it
    }, []);

    const value = useMemo(() => ({ open }), [open]);

    return (
        <DiagnosticContext.Provider value={value}>
            {children}
            <AnimatePresence>{isOpen && <Modal onClose={close} />}</AnimatePresence>
        </DiagnosticContext.Provider>
    );
}

/* ------------------------------------------------------------------ */
/* The dialog                                                          */
/* ------------------------------------------------------------------ */

type Status = "idle" | "sending" | "success" | "error";

const input =
    "h-[46px] w-full rounded-xl border-2 border-[#d9d5e0] bg-white px-[15px] text-[16px] text-ink outline-none transition placeholder:text-[#7a7388] focus:border-plum";

function Modal({ onClose }: { onClose: () => void }) {
    const [status, setStatus] = useState<Status>("idle");

    // Esc closes, page behind doesn't scroll
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = previous;
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        // Hidden field only bots fill in: pretend it worked, send nothing
        if (data.get("_gotcha")) {
            setStatus("success");
            return;
        }

        setStatus("sending");
        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" },
            });
            setStatus(res.ok ? "success" : "error");
        } catch {
            setStatus("error");
        }
    }

    const done = status === "success";

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            {/* backdrop (click to close) */}
            <button
                type="button"
                aria-label="Close"
                tabIndex={-1}
                onClick={onClose}
                className="absolute inset-0 cursor-default bg-ink/45 backdrop-blur-[6px]"
            />

            <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="diagnostic-title"
                className="relative my-auto w-full max-w-[460px] rounded-[28px] bg-white p-7 shadow-[0_30px_80px_-20px_rgba(26,11,42,0.5)]"
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close dialog"
                    className="absolute right-7 top-7 flex size-[34px] items-center justify-center rounded-lg bg-[#f2f0f6] text-muted transition hover:bg-[#e8e4ef] hover:text-ink"
                >
                    <CloseIcon className="size-[18px]" />
                </button>

                {done ? (
                    <div className="flex flex-col items-center px-2 pb-1 pt-6 text-center">
                        <div className="flex size-14 items-center justify-center rounded-full bg-[#e4f1e8] text-[#3f8f5f]">
                            <CheckIcon className="size-7" />
                        </div>
                        <h2
                            id="diagnostic-title"
                            className="mt-5 text-[26px] font-bold leading-tight tracking-[-0.02em] text-ink [font-family:var(--font-heading)]"
                        >
                            Signal received.
                        </h2>
                        <p className="mt-2 max-w-[380px] text-[16px] leading-[1.6] text-muted">
                            We&apos;ll be in touch within two working days to scope your sprint.
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-6 h-[44px] rounded-[10px] border-2 border-[#ddd6e7] px-6 text-[15px] font-semibold text-plum transition hover:border-plum"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="pr-12">
                            <Eyebrow>90-day sprint</Eyebrow>
                        </div>
                        <h2
                            id="diagnostic-title"
                            className="mt-4 pr-2 text-[24px] font-bold leading-tight tracking-[-0.02em] text-ink [font-family:var(--font-heading)]"
                        >
                            Book a behavioural diagnostic
                        </h2>
                        <p className="mt-3 text-[16px] leading-[1.6] text-muted">
                            Tell us where users hesitate. We&apos;ll decode the friction and design the nudges.
                        </p>

                        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
                            <input type="hidden" name="_subject" value="New diagnostic request — PsyFi website" />
                            {/* honeypot: hidden from people, bots fill it in */}
                            <input
                                type="text"
                                name="_gotcha"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                className="hidden"
                            />

                            <input
                                className={input}
                                type="email"
                                name="email"
                                placeholder="Work email"
                                autoComplete="email"
                                required
                                autoFocus
                            />
                            <input
                                className={input}
                                type="text"
                                name="company"
                                placeholder="Company"
                                autoComplete="organization"
                                required
                            />
                            <input
                                className={input}
                                type="text"
                                name="message"
                                placeholder="Where do users drop off?"
                            />

                            {status === "error" && (
                                <p role="alert" className="text-[14px] text-[#c0392b]">
                                    Couldn&apos;t send that. Please try again or email {CONTACT_EMAIL}.
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="mt-3 inline-flex h-[46px] items-center gap-2.5 self-start rounded-[10px] bg-coral px-6 text-[16px] font-semibold text-plum shadow-[0_10px_30px_-8px_rgba(238,120,103,0.55)] transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
                            >
                                {status === "sending" ? "Sending…" : "Request diagnostic"}
                                {status !== "sending" && <ArrowRightIcon className="size-[18px]" />}
                            </button>
                        </form>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
}