import type { Variants } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

// Parent: staggers its children, starting after `delay` seconds
export const group = (delay: number): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: 0.16 } },
});

// Child: fade + rise + unblur (top → bottom)
export const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

// Nav child: fade + slide + unblur (left → right)
export const navItem: Variants = {
  hidden: { opacity: 0, x: -24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

