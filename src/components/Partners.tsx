import { Container } from "./Container";
import { Reveal } from "./Reveal";

/** Files live in /public (names are case-sensitive on the live server). */
const BASE = "h-14 sm:h-[72px] md:h-24";

const PARTNERS = [
    { name: "Deepvue", src: "/deepvue.jpg", cls: BASE },
    // Kurate's file is a light logo made for dark backgrounds, so darken it on white
    { name: "Kurate", src: "/kurate.avif", cls: `${BASE} brightness-[0.28]` },
    // Adagio's file has a lot of empty space around the artwork, so it needs a taller box
    { name: "Adagio VR", src: "/adaigo.png", cls: "h-[88px] sm:h-[116px] md:h-40" },
];

/** How many times the three logos repeat inside one half of the loop. */
const REPEAT = 4;

function LogoSet({ hidden = false }: { hidden?: boolean }) {
    return (
        <ul
            aria-hidden={hidden || undefined}
            className={`flex shrink-0 items-center ${hidden ? "partners-dup" : ""}`}
        >
            {Array.from({ length: REPEAT }).flatMap((_, r) =>
                PARTNERS.map((p) => (
                    <li
                        key={`${r}-${p.name}`}
                        className={`shrink-0 px-10 md:px-16 ${r > 0 ? "partners-extra" : ""}`}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={p.src}
                            alt={hidden ? "" : p.name}
                            draggable={false}
                            className={`w-auto select-none mix-blend-multiply ${p.cls}`}
                        />
                    </li>
                )),
            )}
        </ul>
    );
}

export function Partners() {
    return (
        <section id="partners" aria-labelledby="partners-heading" className="overflow-hidden bg-white py-20 md:py-32">
            <Container>
                <Reveal y={24}>
                    <h2
                        id="partners-heading"
                        className="text-center text-[clamp(2.25rem,5.4vw,4.25rem)] font-bold leading-[1.07] tracking-[-0.025em] text-ink [font-family:var(--font-heading)]"
                    >
                        Trusted by Partners
                        <br />
                        <span className="text-coral">Around the World</span>
                    </h2>
                </Reveal>
            </Container>

            <Reveal delay={0.15} y={16}>
                <div
                    className="partners mt-14 flex justify-center overflow-hidden md:mt-20"
                    style={{
                        maskImage:
                            "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
                        WebkitMaskImage:
                            "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
                    }}
                >
                    <div className="partners-track flex w-max">
                        <LogoSet />
                        <LogoSet hidden />
                    </div>
                </div>
            </Reveal>
        </section>
    );
}