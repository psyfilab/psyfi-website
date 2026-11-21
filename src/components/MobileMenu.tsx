"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CloseIcon, MenuIcon } from "./Icons";

type MobileMenuProps = { links: { label: string; href: string }[] };

/** Hamburger menu, shown below the md breakpoint only. */
export function MobileMenu({ links }: MobileMenuProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <div className="md:hidden">
            <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className="flex size-[37px] items-center justify-center rounded-lg border border-line text-nav transition hover:border-plum active:scale-95"
            >
                {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.nav
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-x-0 top-full border-b border-line bg-white px-6 pb-4 pt-2 shadow-[0_20px_40px_-20px_rgba(26,11,42,0.25)]"
                    >
                        <ul>
                            {links.map(({ label, href }, i) => (
                                <motion.li
                                    key={label}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.04 * i + 0.05, duration: 0.25 }}
                                    className="border-b border-line last:border-0"
                                >
                                    <a
                                        href={href}
                                        onClick={() => setOpen(false)}
                                        className="block py-3.5 text-[17px] font-medium text-nav"
                                    >
                                        {label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </div>
    );
}