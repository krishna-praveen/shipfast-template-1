import { CTA } from "@/components/features/cta/CTA";
import { FAQ } from "@/components/features/faq/FAQ";
import { Hero } from "@/components/features/Hero";
import { Pricing } from "@/components/features/pricing/Pricing";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}