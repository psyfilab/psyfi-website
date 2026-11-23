import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Method } from "@/components/Method";
import { Product } from "@/components/Product";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { DiagnosticProvider } from "@/components/DiagnosticModal";
import { TeamProvider } from "@/components/TeamSheet";
import { MotionRoot } from "@/components/MotionRoot";

export default function Page() {
  return (
    <MotionRoot>
      <DiagnosticProvider>
        <TeamProvider>
          <Header />
          <main>
            <Hero />
            <Stats />
            <Method />
            <Product />
            <CallToAction />
          </main>
          <Footer />
        </TeamProvider>
      </DiagnosticProvider>
    </MotionRoot>
  );
}