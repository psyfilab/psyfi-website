import { Container } from "./Container";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { TALK_TO_LAB_URL } from "@/lib/config";

export function CallToAction() {
  return (
    <section id="contact" className="bg-white py-16 md:py-24">
      <Container>
        <Reveal y={32} scale={0.97}>
          <div className="relative overflow-hidden rounded-[34px] bg-plum px-6 py-12 text-center sm:py-[75px]">
            {/* warm glow, top right */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 38% 60% at 86% 16%, rgba(180,74,104,0.42), transparent 72%)",
              }}
            />

            <div className="relative">
              <h2 className="mx-auto max-w-[580px] text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em] text-white [font-family:var(--font-heading)]">
                From user drop-offs to measurable behaviour change.
              </h2>
              <p className="mx-auto mt-6 max-w-[480px] text-[19px] leading-[1.6] text-[#d8cde6]">
                In 90-day sprints. Rule-breaking minds, evidence-led solutions.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3.5 sm:flex-row [&>*]:w-full sm:[&>*]:w-auto">
                <Button opensDiagnostic variant="primary" arrow>
                  Book a diagnostic
                </Button>
                <Button href={TALK_TO_LAB_URL} newTab variant="white">
                  Talk to the lab
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}