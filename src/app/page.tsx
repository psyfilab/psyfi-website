import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Method } from "@/components/Method";
import { Product } from "@/components/Product";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { DiagnosticProvider } from "@/components/DiagnosticModal";
import { MotionRoot } from "@/components/MotionRoot";
import { ContactWidget } from "@/components/ContactWidget";


export default function Page() {
  return (
    <MotionRoot>
      <DiagnosticProvider>
        <Header />
        <main>
          <Hero />
          <Stats />
          <Method />
          <Product />
          <CallToAction />
        </main>
        <Footer />
        <ContactWidget />
      </DiagnosticProvider>
    </MotionRoot>
  );
}