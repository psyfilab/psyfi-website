"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, type Variants } from "motion/react";
import { Stage } from "@/lib/Stage";
import { useSheetArrival } from "@/lib/SheetStack";
import { ease } from "@/lib/motion";

const STATEMENT_LINES = [
    "MOST",
    "'PRODUCT",
    "ANALYTICS'",
    "TELL YOU",
    "WHAT USERS",
    "ARE DOING.",
    "WE TELL YOU",
];
const ANSWER = "WHY.";
const SUPPORT_LINES = ["INSTEAD OF JUST", "TRACKING CLICKS, WE", "DECODE DECISIONS."];

// Scroll-progress triggers (0 = sheet below the fold, 1 = fully covering)
const SHOW_AT = 0.575;
const RESET_BELOW = 0.3;

// Parent: staggers the lines. Resetting is instant (duration 0 on `hidden`).
const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const rise: Variants = {
    hidden: { y: "105%", transition: { duration: 0 } },
    show: { y: "0%", transition: { duration: 0.9, ease } },
};

// "WHY." lands last, a beat after the rest
const riseLast: Variants = {
    hidden: { y: "105%", transition: { duration: 0 } },
    show: { y: "0%", transition: { duration: 1, ease, delay: 0.25 } },
};

export default function StatementPage() {
    const arrival = useSheetArrival();
    const [shown, setShown] = useState(false);

    // Hysteresis: starts at ~57% risen, resets below 30%, so it replays each time
    useMotionValueEvent(arrival, "change", (v) => {
        if (v >= SHOW_AT) setShown(true);
        else if (v < RESET_BELOW) setShown(false);
    });

    return (
        <Stage className="flex flex-col gap-10 px-6 pb-12 pt-16 sm:px-10">
            {/* ---------- Left: animated statement ---------- */}
            <motion.h2
                variants={list}
                initial="hidden"
                animate={shown ? "show" : "hidden"}
                className="
          font-display font-extrabold uppercase whitespace-nowrap tracking-[-0.01em]
          text-coral-soft text-[length:clamp(2.5rem,14vw,7rem)] leading-[0.98]
          lg:absolute lg:left-[calc(var(--u)*2.5)] lg:top-[calc(var(--u)*5.9)]
          lg:text-[length:calc(var(--u)*8.2)] lg:leading-[calc(var(--u)*8)]
        "
            >
                {STATEMENT_LINES.map((line) => (
                    <span key={line} className="block overflow-hidden">
                        <motion.span variants={rise} className="block">
                            {line}
                        </motion.span>
                    </span>
                ))}
                <span className="block overflow-hidden text-white">
                    <motion.span variants={riseLast} className="block">
                        {ANSWER}
                    </motion.span>
                </span>
            </motion.h2>

            {/* ---------- Right: static text ---------- */}
            <p
                className="
          font-display font-extrabold uppercase whitespace-nowrap tracking-[-0.01em]
          text-white text-[length:clamp(1.25rem,7vw,2.75rem)] leading-[1.05]
          lg:absolute lg:left-[calc(var(--u)*62)] lg:top-[calc(var(--u)*4)]
          lg:text-[length:calc(var(--u)*4.2)] lg:leading-[calc(var(--u)*4)]
        "
            >
                {SUPPORT_LINES.map((line) => (
                    <span key={line} className="block">
                        {line}
                    </span>
                ))}
            </p>
        </Stage>
    );
}