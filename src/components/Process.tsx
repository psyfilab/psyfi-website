"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const ease = [0.22, 1, 0.36, 1] as const;
const spin = { repeat: Infinity, ease: "linear" } as const;

/* ------------------------------------------------------------------ */
/*  Animated titles                                                    */
/* ------------------------------------------------------------------ */

const SCRAMBLE_CHARS = "#%&*+=01<>/\\";

/** "D3C0D3" scrambles and resolves into "DECODE" (on scroll-in, and again on hover). */
function DecodeTitle({ trigger }: { trigger: number }) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const [text, setText] = useState("D3C0D3");
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);
    const target = "DECODE";

    const run = useCallback(() => {
        if (timer.current) clearInterval(timer.current);
        let frame = 0;
        const total = 16;
        timer.current = setInterval(() => {
            frame += 1;
            const solved = Math.floor((frame / total) * target.length);
            setText(
                target
                    .split("")
                    .map((ch, i) =>
                        i < solved ? ch : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
                    )
                    .join(""),
            );
            if (frame >= total) {
                if (timer.current) clearInterval(timer.current);
                setText(target);
            }
        }, 55);
    }, []);

    useEffect(() => {
        if (reduce) return;
        if (inView) run();
    }, [inView, reduce, run]);

    useEffect(() => {
        if (reduce || trigger === 0) return;
        run();
    }, [trigger, reduce, run]);

    useEffect(
        () => () => {
            if (timer.current) clearInterval(timer.current);
        },
        [],
    );

    return (
        <span ref={ref} aria-label="Decode" className="inline-block">
            <span aria-hidden>{reduce ? target : text}</span>
        </span>
    );
}

/** Each letter of DESIGN fades to coral and back, one after another. */
function DesignTitle() {
    return (
        <span aria-label="Design">
            {"DESIGN".split("").map((ch, i) => (
                <span
                    key={i}
                    aria-hidden
                    className="wave-letter"
                    style={{ "--i": i } as CSSProperties}
                >
                    {ch}
                </span>
            ))}
        </span>
    );
}

function IterateTitle() {
    return <span className="shimmer-text italic">ITERATE</span>;
}

/* ------------------------------------------------------------------ */
/*  Moving shapes                                                      */
/* ------------------------------------------------------------------ */

/** Square: nested frames turning in opposite directions, a scanning line, an orbiting dot. */
function DecodeShape() {
    return (
        <div className="relative size-full">
            <motion.div
                className="absolute inset-[6%] rounded-[28px] border border-white/25"
                animate={{ rotate: 360 }}
                transition={{ ...spin, duration: 26 }}
            />
            <motion.div
                className="absolute inset-[18%] rounded-[24px] border border-coral/60"
                animate={{ rotate: -360 }}
                transition={{ ...spin, duration: 18 }}
            />
            <motion.div
                className="absolute inset-[33%] rounded-[20px] bg-gradient-to-br from-coral to-[#b8456a] shadow-[0_0_50px_-6px_rgba(238,120,103,0.75)]"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-[12%] overflow-hidden rounded-[22px]">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-white/15"
                    animate={{ y: ["-100%", "0%"] }}
                    transition={{ duration: 3.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                >
                    <span className="absolute inset-x-0 bottom-0 h-px bg-white shadow-[0_0_14px_2px_rgba(255,255,255,0.75)]" />
                </motion.div>
            </div>
            <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ ...spin, duration: 9 }}
            >
                <span className="absolute left-1/2 top-[1%] size-2.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_14px_3px_rgba(255,255,255,0.6)]" />
            </motion.div>
        </div>
    );
}

/** Circle: a body that morphs, ripples, and a small moon in orbit. */
function DesignShape() {
    return (
        <div className="relative size-full">
            {[0, 1].map((i) => (
                <motion.span
                    key={i}
                    className="absolute inset-[16%] rounded-full border border-white/30"
                    initial={{ scale: 1, opacity: 0.55 }}
                    animate={{ scale: [1, 1.5], opacity: [0.55, 0] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut", delay: i * 1.8 }}
                />
            ))}
            <motion.div
                className="absolute inset-[24%] bg-gradient-to-br from-white to-[#d6c2ec] shadow-[0_0_60px_-8px_rgba(255,255,255,0.5)]"
                animate={{
                    borderRadius: ["50%", "38% 62% 55% 45% / 52% 40% 60% 48%", "50%"],
                    rotate: 360,
                }}
                transition={{
                    borderRadius: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    rotate: { ...spin, duration: 18 },
                }}
            >
                <motion.span
                    className="absolute inset-[30%] rounded-full bg-gradient-to-br from-coral to-[#b8456a]"
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
            <motion.div
                className="absolute inset-[4%]"
                animate={{ rotate: -360 }}
                transition={{ ...spin, duration: 8 }}
            >
                <span className="absolute left-1/2 top-0 size-4 -translate-x-1/2 rounded-full bg-coral shadow-[0_0_16px_3px_rgba(238,120,103,0.7)]" />
            </motion.div>
        </div>
    );
}

const TRI = "50,12 90,81.3 10,81.3"; // equilateral, so every 120° turn looks like a fresh start

/** Triangle: clicks round in three steps while echoes drift outward, like successive iterations. */
function IterateShape() {
    return (
        <div className="relative size-full">
            {[0, 1, 2].map((i) => (
                <motion.svg
                    key={i}
                    viewBox="0 0 100 100"
                    className="absolute left-[10%] top-[10%] h-[80%] w-[80%] overflow-visible"
                    style={{ transformOrigin: "50% 58.2%" }}
                    initial={{ scale: 0.6, opacity: 0.5 }}
                    animate={{ scale: [0.6, 1.55], opacity: [0.5, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeOut", delay: i * 1.5 }}
                >
                    <polygon
                        points={TRI}
                        fill="none"
                        stroke="white"
                        strokeOpacity="0.55"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                    />
                </motion.svg>
            ))}
            <motion.svg
                viewBox="0 0 100 100"
                className="absolute left-[16%] top-[16%] h-[68%] w-[68%] drop-shadow-[0_0_28px_rgba(238,120,103,0.55)]"
                style={{ transformOrigin: "50% 58.2%" }}
                animate={{ rotate: [0, 120, 240, 360] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", times: [0, 1 / 3, 2 / 3, 1] }}
            >
                <defs>
                    <linearGradient id="process-tri" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#ee7867" />
                        <stop offset="1" stopColor="#b8456a" />
                    </linearGradient>
                </defs>
                <polygon
                    points={TRI}
                    fill="url(#process-tri)"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                    strokeLinejoin="round"
                />
            </motion.svg>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Cards                                                              */
/* ------------------------------------------------------------------ */

const hi = "font-semibold text-coral";

type Step = {
    n: string;
    title: (hoverTick: number) => ReactNode;
    shape: ReactNode;
    body: ReactNode;
    /** staircase offset on large screens */
    offset: string;
};

const STEPS: Step[] = [
    {
        n: "01",
        title: (tick) => <DecodeTitle trigger={tick} />,
        shape: <DecodeShape />,
        body: (
            <>
                Pinpoint what&apos;s driving drop-off, hesitation, or churn. We combine behavioural data
                with psychographic segmentation to{" "}
                <span className={hi}>reveal friction that&apos;s hurting CAC, retention, and conversion.</span>
            </>
        ),
        offset: "lg:mt-0",
    },
    {
        n: "02",
        title: () => <DesignTitle />,
        shape: <DesignShape />,
        body: (
            <>
                Turn insight into ROI. We craft product nudges, UX fixes, and messaging shifts that
                directly target bottlenecks.{" "}
                <span className={hi}>Reducing time-to-adoption and boosting LTV.</span>
            </>
        ),
        offset: "lg:mt-12",
    },
    {
        n: "03",
        title: () => <IterateTitle />,
        shape: <IterateShape />,
        body: (
            <>
                Test fast, learn faster. We run lean experiments to measure behavioural lift,{" "}
                <span className={hi}>optimize your funnel, and scale what works</span> before you burn
                through budget.
            </>
        ),
        offset: "lg:mt-24",
    },
];

function StepCard({ step, index }: { step: Step; index: number }) {
    const [hoverTick, setHoverTick] = useState(0);

    return (
        <motion.article
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: index * 0.12 }}
            onMouseEnter={() => setHoverTick((t) => t + 1)}
            className={`group relative flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-plum to-deep p-7 shadow-[0_30px_60px_-32px_rgba(26,10,37,0.8)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-coral/40 hover:shadow-[0_40px_70px_-30px_rgba(238,120,103,0.35)] md:p-8 ${step.offset}`}
        >
            {/* corner glow */}
            <span
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-coral/20 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            />

            <p className="relative font-mono text-[12px] font-bold tracking-[0.14em] text-white/50">
                STEP <span className="text-coral">{step.n}</span>
            </p>

            <h3 className="relative mt-4 text-[clamp(2.25rem,4vw,3.25rem)] font-bold uppercase leading-none tracking-[-0.02em] text-white [font-family:var(--font-heading)]">
                {step.title(hoverTick)}
            </h3>

            <div className="relative mx-auto my-8 aspect-square w-full max-w-[250px] md:my-10">
                {step.shape}
            </div>

            <p className="relative text-[16px] leading-[1.65] text-white/80">{step.body}</p>
        </motion.article>
    );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function Process() {
    return (
        <section id="process" aria-labelledby="process-heading" className="bg-white pb-24 pt-20 md:pt-28 lg:pb-40">
            <Container>
                <Reveal y={16}>
                    <Eyebrow>Our process</Eyebrow>
                </Reveal>
                <Reveal delay={0.08}>
                    <h2
                        id="process-heading"
                        className="mt-5 text-[clamp(1.75rem,6vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.025em] text-ink [font-family:var(--font-heading)] lg:text-[clamp(1.75rem,3vw,2.6rem)]"
                    >
                        <span className="block lg:whitespace-nowrap">
                            <span className="text-coral">Decode</span> what holds users back.
                        </span>
                        <span className="block lg:whitespace-nowrap">
                            <span className="text-coral">Design</span> what moves them forward.
                        </span>
                        <span className="block lg:whitespace-nowrap">
                            <span className="text-coral">Iterate</span> until engagement turns into lasting growth.
                        </span>
                    </h2>
                </Reveal>

                <div className="mx-auto mt-14 grid max-w-[560px] grid-cols-1 items-start gap-6 md:mt-20 lg:max-w-none lg:grid-cols-3">
                    {STEPS.map((step, i) => (
                        <StepCard key={step.n} step={step} index={i} />
                    ))}
                </div>
            </Container>
        </section>
    );
}