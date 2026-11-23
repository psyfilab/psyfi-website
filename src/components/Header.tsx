"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { MobileMenu } from "./MobileMenu";
import { useTeam } from "./TeamSheet";

const NAV = [
  { label: "Method", href: "#method" },
  { label: "Product", href: "#product" },
  { label: "Markets", href: "#markets" },
  { label: "Evidence", href: "#evidence" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const team = useTeam();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-[0_10px_30px_-20px_rgba(26,11,42,0.35)]" : ""
        }`}
    >
      <Container className="grid h-[72px] grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
        <a href="#top" aria-label="PsyFi home" className="justify-self-start">
          <Logo className="h-7 w-auto" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="group relative py-1 text-[15px] font-medium text-nav transition-colors hover:text-plum"
            >
              {label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-coral transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
          <button
            type="button"
            onClick={team.open}
            className="group relative py-1 text-[15px] font-medium text-nav transition-colors hover:text-plum"
          >
            Team
            <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-coral transition-transform duration-300 group-hover:scale-x-100" />
          </button>
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <Button opensDiagnostic variant="dark">
            Book a diagnostic
          </Button>
          <MobileMenu links={NAV} />
        </div>
      </Container>
    </header>
  );
}