"use client";

import {
    Children,
    createContext,
    useContext,
    useRef,
    type ReactNode,
} from "react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
    motionValue,
    type MotionValue,
} from "motion/react";

const RADIUS = 32;
const SHADOW_ON = "0px -24px 60px rgba(0,0,0,0.35)";
const SHADOW_OFF = "0px -24px 60px rgba(0,0,0,0)";

/** 0 -> 1 while this sheet slides up over the previous one (always 1 for the first sheet). */
const ArrivalContext = createContext<MotionValue<number>>(motionValue(1));
export const useSheetArrival = () => useContext(ArrivalContext);

type SheetProps = {
    index: number;
    count: number;
    progress: MotionValue<number>;
    reduce: boolean;
    children: ReactNode;
};

function Sheet({ index, count, progress, reduce, children }: SheetProps) {
    const last = index === count - 1;
    const seg = 1 / Math.max(count - 1, 1);

    // Arrival: progress goes (index-1)*seg -> index*seg. First sheet is always "arrived".
    const arrival = useTransform(
        progress,
        index === 0 ? [0, 1] : [(index - 1) * seg, index * seg],
        index === 0 ? [1, 1] : [0, 1],
    );
    // Covered: progress goes index*seg -> (index+1)*seg. Last sheet is never covered.
    const covered = useTransform(
        progress,
        last ? [0, 1] : [index * seg, (index + 1) * seg],
        last ? [0, 0] : [0, 1],
    );

    const scale = useTransform(covered, [0, 1], [1, reduce ? 1 : 0.94]);
    const y = useTransform(covered, [0, 1], ["0dvh", reduce ? "0dvh" : "-4dvh"]);
    const filter = useTransform(covered, [0, 1], [
        "brightness(1)",
        `brightness(${reduce ? 1 : 0.55})`,
    ]);
    const radius = useTransform([arrival, covered], ([a, c]: number[]) =>
        reduce ? 0 : Math.max(RADIUS * (1 - a), RADIUS * c),
    );
    const boxShadow = useTransform(arrival, [0, 0.06, 0.9, 1], [SHADOW_OFF, SHADOW_ON, SHADOW_ON, SHADOW_OFF]);

    return (
        <ArrivalContext.Provider value={arrival}>
            <motion.section
                className={`${last ? "relative" : "sticky top-0"} h-dvh w-full overflow-hidden bg-plum`}
                style={{
                    zIndex: index + 1,
                    scale,
                    y,
                    filter,
                    borderRadius: radius,
                    boxShadow: index === 0 ? "none" : boxShadow,
                    transformOrigin: "top center",
                    willChange: "transform",
                }}
            >
                {children}
            </motion.section>
        </ArrivalContext.Provider>
    );
}

/** Stacked full-screen sheets: each later child slides up over the previous one. */
export function SheetStack({ children }: { children: ReactNode }) {
    const sheets = Children.toArray(children);
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion() ?? false;
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    return (
        <div ref={ref} className="relative w-full" style={{ height: `${sheets.length * 100}dvh` }}>
            {sheets.map((child, i) => (
                <Sheet
                    key={i}
                    index={i}
                    count={sheets.length}
                    progress={scrollYProgress}
                    reduce={reduce}
                >
                    {child}
                </Sheet>
            ))}
        </div>
    );
}