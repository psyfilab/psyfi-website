import type { ReactNode } from "react";
import { Container } from "./Container";
import { Eyebrow, Tag } from "./Eyebrow";
import { ChartIcon, NudgeIcon, SearchIcon } from "./Icons";
import { Reveal } from "./Reveal";

const STEPS: { tag: string; title: string; body: string; icon: ReactNode }[] = [
  {
    tag: "Decode",
    title: "Spot hidden friction",
    body: "Identify behavioural bottlenecks across your funnel using quantitative and qualitative signal — the moments of hesitation, doubt, and effort.",
    icon: <SearchIcon className="size-[22px]" />,
  },
  {
    tag: "Design",
    title: "Nudges that convert",
    body: "Co-develop tailored, behaviour-driven interventions that boost engagement, retention, and trust. Make users want to say yes.",
    icon: <NudgeIcon className="size-[22px]" />,
  },
  {
    tag: "Iterate",
    title: "Measure the shift",
    body: "Implement, track behavioural KPIs, and refine for measurable impact — from drop-off to behaviour change in 90-day sprints.",
    icon: <ChartIcon className="size-[22px]" />,
  },
];

export function Method() {
  return (
    <section id="method" className="bg-white py-16 md:py-24">
      <Container>
        <Reveal y={16}>
          <Eyebrow>Decode → Design → Iterate</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-[580px] text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.07] tracking-[-0.025em] text-ink [font-family:var(--font-heading)]">
            A behavioural layer that unlocks action, not just insight.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-5 max-w-[640px] text-[18px] leading-[1.7] text-muted">
            Dashboards tell you who is persuadable. PSYFI models why people act, how they feel, and
            when trust breaks — then designs for it.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-[21px] md:grid-cols-3">
          {STEPS.map(({ tag, title, body, icon }, i) => (
            <Reveal key={tag} delay={i * 0.12} className="h-full">
              <article className="group h-full rounded-[24px] border border-line bg-white p-8 transition duration-300 hover:-translate-y-1.5 hover:border-[#d9cfe6] hover:shadow-[0_22px_44px_-22px_rgba(50,18,74,0.3)]">
                <div className="flex size-12 items-center justify-center rounded-xl bg-tint text-plum transition duration-300 group-hover:scale-110 group-hover:bg-plum group-hover:text-white">
                  {icon}
                </div>
                <div className="mt-7">
                  <Tag>{tag}</Tag>
                </div>
                <h3 className="mt-2 text-[24px] font-semibold leading-tight tracking-[-0.01em] text-ink [font-family:var(--font-heading)]">
                  {title}
                </h3>
                <p className="mt-2.5 text-[16px] leading-6 text-muted">{body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}