import { Container } from "./Container";
import { HeroBadge } from "./HeroBadge"; import { Button } from "./Button";
import { Reveal } from "./Reveal";

/** Decorative radar: rings and a crosshair, with dots that slowly orbit. */
function Radar() {
  return (
    <svg
      viewBox="-202 -202 404 404"
      aria-hidden="true"
      className="pointer-events-none absolute right-[-172px] top-[120px] hidden size-[404px] overflow-visible min-[1400px]:block"
      fill="none"
    >
      {/* crosshair */}
      <path d="M0 -202V202" stroke="#ece6f4" strokeWidth="1.5" />
      <path d="M-202 0H900" stroke="#ece6f4" strokeWidth="1.5" />
      {/* rings */}
      <circle r="169" stroke="#e0d7ee" strokeWidth="1.5" />
      <circle r="117" stroke="#e0d7ee" strokeWidth="1.5" />
      <circle r="65" stroke="#b79ad3" strokeWidth="1.5" />

      {/* coral dot (orbits, with a pulse) */}
      <g className="orbit-a">
        <circle cx="69" cy="-71" r="30" stroke="#f7c9c1" strokeWidth="1.5" />
        <circle className="pulse-ring" cx="69" cy="-71" r="14" fill="#ee7867" />
        <circle cx="69" cy="-71" r="14" fill="#ee7867" />
      </g>

      {/* small purple dots (orbit the other way) */}
      <g className="orbit-b">
        <circle cx="-34" cy="-96" r="4" fill="#c9b5de" />
        <circle cx="-59" cy="52" r="7" fill="#a47bc9" />
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pb-16 pt-14 sm:pb-20 sm:pt-[96px]">
      <Container className="relative">
        <Radar />

        <Reveal y={16}>
          <HeroBadge>Behavioural intelligence layer</HeroBadge>
        </Reveal>

        <Reveal delay={0.1} y={28} blur>
          <h1 className="mt-7 max-w-[680px] text-[clamp(2.5rem,6.2vw,4.5rem)] font-bold leading-[1.07] tracking-[-0.025em] text-ink [font-family:var(--font-heading)]">
            Acquisition opens the door. <span className="text-coral">Behaviour</span> moves them
            through it.
          </h1>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-8 max-w-[565px] text-[20px] leading-[1.6] text-muted">
            PSYFI converts user behaviour into standardized decision signals — so your fintech or
            healthtech can price risk, predict adherence, and improve acquisition quality with
            confidence.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-col gap-3.5 sm:mt-12 sm:flex-row [&>*]:w-full sm:[&>*]:w-auto">
            <Button opensDiagnostic variant="primary" arrow>
              Book a diagnostic
            </Button>
            <Button href="#method" variant="outline">
              See the method
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}