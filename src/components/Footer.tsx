import { Container } from "./Container";
import { Logo } from "./Logo";
import { TeamLink } from "./TeamSheet";

const COLUMNS = [
  {
    title: "Product",
    links: ["PsyFi OS", "Engagement Intelligence", "Pattern Library", "Data Graph"],
  },
  { title: "Markets", links: ["Fintech & BFSI", "Healthtech", "India landscape"] },
  { title: "Lab", links: ["Method", "Evidence", "Team", "Contact"] },
];

const LINK_TARGETS: Record<string, string> = {
  Method: "#method",
  Evidence: "#evidence",
  Contact: "#contact",
  "PsyFi OS": "#product",
  Fintech: "#markets",
  Healthtech: "#markets",
};

export function Footer() {
  return (
    <footer className="border-t border-line bg-white pt-12 md:pt-16">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div>
            <Logo className="h-[30px] w-auto" />
            <p className="mt-4 max-w-[260px] text-[16px] leading-6 text-muted">
              A behavioural intelligence lab. We measure, model, and move human behaviour with
              precision.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-10">
            {COLUMNS.map(({ title, links }) => (
              <nav key={title} aria-label={title}>
                <p className="font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-faint">
                  {title}
                </p>
                <ul className="mt-[22px] flex flex-col gap-[7px]">
                  {links.map((label) => (
                    <li key={label}>
                      {label === "Team" ? (
                        <TeamLink className="text-left text-[16px] leading-6 text-[#3a2a4d] transition-colors hover:text-coral-ink">
                          {label}
                        </TeamLink>
                      ) : (
                        <a
                          href={LINK_TARGETS[label] ?? "#top"}
                          className="text-[16px] leading-6 text-[#3a2a4d] transition-colors hover:text-coral-ink"
                        >
                          {label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 pb-10 text-[15px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 PsyFi Lab · psyfilab.com</p>
          <a href="mailto:shreya@psyfilab.com" className="font-mono text-faint hover:text-coral-ink">
            shreya@psyfilab.com
          </a>
        </div>
      </Container>
    </footer>
  );
}