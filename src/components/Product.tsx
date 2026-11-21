"use client";

import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { ActivityIcon, NotesIcon, NudgeIcon, ChartIcon, TargetIcon } from "./Icons";

const ease = [0.22, 1, 0.36, 1] as const;

type Sector = "Fintech" | "Healthtech";

const SECTORS: Record<
  Sector,
  { tag: string; metrics: { label: string; value: string }[] }
> = {
  Fintech: {
    tag: "Lending · Investing",
    metrics: [
      { label: "Adoption likelihood", value: "81%" },
      { label: "KYC drop-off", value: "63%" },
      { label: "Engagement (EIS)", value: "73" },
    ],
  },
  Healthtech: {
    tag: "Telemedicine · Adherence",
    metrics: [
      { label: "Adherence index", value: "68%" },
      { label: "30-day churn", value: "45%" },
      { label: "Trust signal", value: "B+" },
    ],
  },
};

const SIDEBAR: { label: string; icon: ReactNode }[] = [
  { label: "Signals", icon: <ActivityIcon className="size-[18px]" /> },
  { label: "Cohorts", icon: <NotesIcon className="size-[18px]" /> },
  { label: "Profiles", icon: <TargetIcon className="size-[18px]" /> },
  { label: "Nudges", icon: <NudgeIcon className="size-[18px]" /> },
  { label: "Reports", icon: <ChartIcon className="size-[18px]" /> },
];

// 0 = lightest … 3 = strongest
const HEAT = [
  { row: "Scarcity", cells: [2, 3, 1, 3, 0] },
  { row: "Social proof", cells: [3, 3, 2, 1, 2] },
  { row: "Defaults", cells: [1, 2, 3, 3, 1] },
  { row: "Framing", cells: [0, 1, 2, 3, 3] },
];
const HEAT_COLOR = ["#fbe3de", "#f8cdc5", "#f29a8b", "#ee7867"];

export function Product() {
  const [sector, setSector] = useState<Sector>("Fintech");
  const data = SECTORS[sector];

  return (
    <section id="product" className="bg-warm py-16 md:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal y={16}>
              <Eyebrow>PsyFi OS</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-[580px] text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.07] tracking-[-0.025em] text-ink [font-family:var(--font-heading)]">
                One view: scores, profiles, nudge-sensitivity.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-[600px] text-[18px] leading-[1.7] text-muted">
                The Behavioural Intelligence Dashboard — engagement scores, behavioural user
                profiles, adoption-likelihood, sector-fit, and nudge-sensitivity heatmaps.
              </p>
            </Reveal>
          </div>

          {/* Sector toggle */}
          <Reveal delay={0.2}>
            <div
              id="markets"
              role="tablist"
              aria-label="Sector"
              className="flex scroll-mt-24 self-start rounded-xl bg-[#efebf4] p-1 md:self-auto"
            >
              {(Object.keys(SECTORS) as Sector[]).map((name) => {
                const active = name === sector;
                return (
                  <button
                    key={name}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSector(name)}
                    className={`relative rounded-lg px-[18px] py-2 text-[15px] transition-colors ${active ? "font-semibold text-plum" : "font-medium text-muted hover:text-plum"
                      }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="sector-pill"
                        className="absolute inset-0 rounded-lg bg-white shadow-[0_1px_3px_rgba(50,18,74,0.12)]"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{name}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Dashboard window */}
        <div className="mt-14">
          <Reveal y={36} scale={0.98}>
            <div className="rounded-[28px] border border-line bg-[#f1eef6] px-2.5 pb-2.5">
              <div className="flex h-[45px] items-center gap-2 px-2.5">
                <span className="size-[11px] rounded-full bg-[#d3cedb]" />
                <span className="size-[11px] rounded-full bg-[#d3cedb]" />
                <span className="size-[11px] rounded-full bg-[#d3cedb]" />
              </div>

              <div className="flex min-h-[354px] overflow-hidden rounded-[22px] border border-line bg-white">
                {/* Sidebar */}
                <aside className="hidden w-[188px] shrink-0 bg-deep px-[17px] pt-5 md:block">
                  <Logo className="h-[22px] w-auto" onDark />
                  <ul className="mt-7 flex flex-col gap-[7px]">
                    {SIDEBAR.map(({ label, icon }, i) => (
                      <motion.li
                        key={label}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease, delay: 0.35 + i * 0.07 }}
                        className={`flex h-9 items-center gap-3 rounded-[10px] px-3 text-[15px] transition-colors ${i === 0
                          ? "bg-[#2c1840] text-white"
                          : "text-white/90 hover:bg-[#241231]"
                          }`}
                      >
                        {icon}
                        {label}
                      </motion.li>
                    ))}
                  </ul>
                </aside>

                {/* Panel */}
                <div className="min-w-0 flex-1 p-6 pt-[29px] md:px-[25px]">
                  <motion.div
                    key={data.tag}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <Eyebrow>{data.tag}</Eyebrow>
                  </motion.div>

                  <div className="mt-4 grid gap-[15px] sm:grid-cols-3">
                    {data.metrics.map(({ label, value }, i) => (
                      <motion.div
                        key={`${sector}-${label}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease, delay: i * 0.07 }}
                        className="min-h-[94px] rounded-[14px] border border-line p-4"
                      >
                        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
                          {label}
                        </p>
                        <p
                          className={`mt-1.5 text-[34px] font-bold leading-none tracking-[-0.02em] [font-family:var(--font-heading)] ${i === 0 ? "text-coral" : "text-ink"
                            }`}
                        >
                          {value}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
                    Nudge-sensitivity heatmap
                  </p>
                  <ul className="mt-3 flex flex-col gap-[5px]">
                    {HEAT.map(({ row, cells }, ri) => (
                      <li key={row} className="flex items-center">
                        <span className="w-[92px] text-[12.5px] text-[#4a3f5c]">{row}</span>
                        <span className="flex gap-1">
                          {cells.map((level, ci) => (
                            <motion.span
                              key={ci}
                              initial={{ opacity: 0, scale: 0.4 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, ease, delay: 0.6 + ri * 0.08 + ci * 0.05 }}
                              className="h-[14px] w-7 rounded-[4px]"
                              style={{ background: HEAT_COLOR[level] }}
                            />
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}