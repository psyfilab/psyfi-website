"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** Counts every number in `value` up from 0 when it scrolls into view, e.g. "60–80". */
export function CountUp({ value }: { value: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
    const reduce = useReducedMotion();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!inView || reduce) return;
        const controls = animate(0, 1, {
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: setProgress,
        });
        return () => controls.stop();
    }, [inView, reduce]);

    // With "reduce motion" on, skip the count and show the final numbers
    const shown = reduce ? 1 : progress;

    return (
        <span ref={ref} className="tabular-nums">
            {value.split(/(\d+)/).map((part, i) =>
                /^\d+$/.test(part) ? <span key={i}>{Math.round(Number(part) * shown)}</span> : part,
            )}
        </span>
    );
}