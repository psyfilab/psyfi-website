import { Container } from "./Container";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

const STATS = [
  {
    value: "60–80",
    desc: "of users stall before completing KYC or first transaction",
    source: "BCG · Blume · AppsFlyer",
  },
  {
    value: "<20",
    desc: "90-day retention, even among high-intent users",
    source: "AppsFlyer 2023",
  },
  {
    value: "45",
    desc: "of healthtech users churn within 30 days",
    source: "Statista 2023",
  },
];

export function Stats() {
  return (
    <section id="evidence" className="bg-deep py-14 text-white md:py-[68px]">
      <Container className="grid gap-12 md:grid-cols-3 md:gap-10">
        {STATS.map(({ value, desc, source }, i) => (
          <Reveal key={source} delay={i * 0.12}>
            <p className="text-[3.5rem] font-bold leading-none tracking-[-0.03em] [font-family:var(--font-heading)]">
              <CountUp value={value} />
              <span className="text-coral">%</span>
            </p>
            <p className="mt-4 max-w-[260px] text-[16px] leading-[23px] text-white/85">{desc}</p>
            <p className="mt-2.5 font-mono text-[11px] tracking-[0.05em] text-[#7d5ea0]">
              {source}
            </p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}