"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
    children: ReactNode;
    /** Seconds to wait before starting (use it to stagger neighbours) */
    delay?: number;
    /** How far it rises from, in px */
    y?: number;
    /** Also un-blur while fading in */
    blur?: boolean;
    /** Start slightly smaller, e.g. 0.97 */
    scale?: number;
    className?: string;
};

/** Fades + rises into place the first time it scrolls into view. */
export function Reveal({ children, delay = 0, y = 24, blur = false, scale, className }: RevealProps) {
    return (
        <motion.div
            className={className}
            initial={{
                opacity: 0,
                y,
                ...(blur ? { filter: "blur(6px)" } : {}),
                ...(scale ? { scale } : {}),
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                ...(blur ? { filter: "blur(0px)" } : {}),
                ...(scale ? { scale: 1 } : {}),
            }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.8, ease, delay }}
        >
            {children}
        </motion.div>
    );
}