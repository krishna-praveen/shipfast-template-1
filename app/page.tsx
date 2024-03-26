import { CTA } from "@/components/features/cta/CTA";
import { Demonstration } from "@/components/features/Demonstration";
import { FAQ } from "@/components/features/faq/FAQ";
import { FeaturesListicle } from "@/components/features/FeaturesListicle";
import { Hero } from "@/components/features/Hero";
import { Pricing } from "@/components/features/pricing/Pricing";
import { Problem } from "@/components/features/Problem";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <FeaturesListicle />
        <Pricing />
        <Demonstration />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}