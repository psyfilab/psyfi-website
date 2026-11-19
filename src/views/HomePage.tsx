"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ease, group, item } from "@/lib/motion";

const NAV_LINKS = [
  { label: "TEAM", href: "#team" },
  { label: "PRODUCT", href: "#product" },
  { label: "CONTACT", href: "#contact" },
];

/* Canvas: 2-col grid (content | nav) below lg, fixed 100x73 unit stage (--u) on lg+ */
function Stage({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh w-full overflow-hidden bg-plum lg:flex lg:justify-center">
      <div
        className="
          relative grid h-dvh w-full grid-cols-[minmax(0,1fr)_auto] content-start
          gap-x-4 px-[14.5%] pb-10 pt-[20vw]
          lg:block lg:min-h-0 lg:p-0
          lg:[--u:min(1vw,1.37dvh)]
          lg:h-[calc(var(--u)*73)] lg:w-[calc(var(--u)*100)]
        "
      >
        {children}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Stage>
      {/* ---------- Nav ---------- */}
      <motion.nav
        variants={group(2.9)}
        initial="hidden"
        animate="show"
        className="
          font-body col-start-2 row-start-1 mt-[5vw] flex flex-col items-start
          gap-[2.8vw] self-start
          text-[length:clamp(0.8rem,4.2vw,1.4rem)] font-light tracking-normal
          lg:absolute lg:right-[calc(var(--u)*3.2)] lg:top-[calc(var(--u)*4.8)]
          lg:mt-0 lg:flex-col lg:items-start lg:justify-start
          lg:gap-[calc(var(--u)*1.45)] lg:p-0 lg:tracking-normal
          lg:text-[length:calc(var(--u)*1.75)]
        "
      >
        {NAV_LINKS.map(({ label, href }) => (
          <motion.a
            key={label}
            href={href}
            variants={item}
            className="
              relative border-b border-coral pb-[1vw] leading-none text-coral
              [-webkit-text-stroke:0_currentColor]
              transition-[color,translate,-webkit-text-stroke-width] duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              hover:translate-x-[0.3em]
              hover:text-[color-mix(in_srgb,var(--color-coral),black_22%)]
              hover:[-webkit-text-stroke-width:0.09em]
              after:absolute after:-bottom-px after:left-0 after:h-[2px] after:w-full
              after:origin-left after:scale-x-0 after:bg-white
              after:transition-transform after:duration-500
              after:ease-[cubic-bezier(0.22,1,0.36,1)]
              hover:after:scale-x-100
              lg:pb-[calc(var(--u)*0.45)]
            "
          >
            {label}
          </motion.a>
        ))}
      </motion.nav>

      {/* ---------- Headline ---------- */}
      <motion.div
        variants={group(1.5)}
        initial="hidden"
        animate="show"
        className="
          font-headline col-start-1 row-start-1 font-bold leading-[1.45]
          text-[length:clamp(1rem,4.6vw,2rem)]
          lg:absolute lg:left-[calc(var(--u)*2.65)] lg:top-[calc(var(--u)*4.6)] lg:mt-0
          lg:text-[length:calc(var(--u)*2.2)] lg:leading-[calc(var(--u)*3.15)]
        "
      >
        <motion.p variants={item}>Users dropping off?</motion.p>
        <motion.p variants={item}>Conversions flat?</motion.p>
        <motion.p variants={item}>Trust low, but no idea why?</motion.p>
      </motion.div>

      {/* ---------- Tagline ---------- */}
      <motion.div
        variants={group(2.3)}
        initial="hidden"
        animate="show"
        className="
          font-body col-start-1 row-start-2 mt-[7vw] font-light leading-[1.45]
          text-[length:clamp(1rem,4.8vw,2.2rem)]
          lg:absolute lg:left-[calc(var(--u)*2.65)] lg:top-[calc(var(--u)*17.6)] lg:mt-0
          lg:text-[length:calc(var(--u)*2.3)] lg:leading-[calc(var(--u)*3.15)]
        "
      >
        <motion.p variants={item}>You’re not missing data.</motion.p>
        <motion.p variants={item}>
          You’re missing <span className="text-coral">behavioural insight</span>.
        </motion.p>
      </motion.div>

      {/* ---------- Logo ---------- */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src="/psyfi-logo.svg"
        alt="Psyfi"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease, delay: 0.2 }}
        draggable={false}
        className="
          col-span-2 row-start-3 -ml-[3%] mt-[8vw] w-[97%] select-none
          lg:absolute lg:left-[calc(var(--u)*5.4)] lg:top-[calc(var(--u)*30.7)]
          lg:m-0 lg:w-[calc(var(--u)*56.7)] lg:max-w-none lg:self-auto lg:p-0
        "
      />
    </Stage>
  );
}