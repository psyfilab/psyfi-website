"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LAB_EMAIL, TALK_TO_LAB_URL } from "@/lib/config";

export function ContactWidget() {
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 500);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    async function copyEmail() {
        try {
            await navigator.clipboard.writeText(LAB_EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard blocked: ignore */
        }
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
                >
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                role="dialog"
                                aria-label="Talk to the lab"
                                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                                transition={{ duration: 0.2 }}
                                className="w-[min(300px,calc(100vw-2rem))] rounded-2xl border border-line bg-white p-5 shadow-[0_20px_50px_-12px_rgba(50,18,74,0.3)]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <p className="text-[15px] font-semibold text-ink">
                                        Talk to the lab
                                    </p>
                                    <button
                                        onClick={() => setOpen(false)}
                                        aria-label="Close"
                                        className="-mr-1 -mt-1 rounded-full p-1 text-faint transition hover:bg-tint hover:text-ink"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path
                                                d="M4 4l8 8M12 4l-8 8"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                                    Questions about a diagnostic? Send us a mail at{" "}
                                    <span className="font-medium text-ink">{LAB_EMAIL}</span>
                                </p>
                                <div className="mt-4 flex gap-2">
                                    <a
                                        href={TALK_TO_LAB_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 rounded-full bg-coral px-4 py-2.5 text-center text-[13.5px] font-semibold text-white transition hover:bg-coral-ink"
                                    >
                                        Send a mail
                                    </a>
                                    <button
                                        onClick={copyEmail}
                                        className="rounded-full border border-line px-4 py-2.5 text-[13.5px] font-medium text-ink transition hover:bg-tint"
                                    >
                                        {copied ? "Copied" : "Copy email"}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!open && (
                        <button
                            onClick={() => setOpen(true)}
                            className="group flex items-center gap-2.5 rounded-full bg-plum px-5 py-3 text-[14px] font-medium text-white shadow-[0_12px_30px_-8px_rgba(50,18,74,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-8px_rgba(50,18,74,0.6)]"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-75 motion-reduce:animate-none" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
                            </span>
                            Talk to the lab
                        </button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}