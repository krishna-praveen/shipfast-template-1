import Image from "next/image";

import { ButtonCheckout } from "@/components/ui/buttons";

import config from "@/config";

export const CTA = () => {
  return (
    <section className="hero relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1693704459970-084ba5f916bf?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Background"
        className="w-full object-cover blur-sm"
        layout="fill"
      />
      <div className="hero-overlay bg-neutral absolute inset-0 bg-opacity-70"></div>
      <div className="hero-content text-neutral-content relative flex flex-col items-center justify-center p-8 text-center">
        <div className="flex max-w-xl flex-col items-center p-8 md:p-0">
          <h1 className="mb-8 text-4xl font-bold tracking-tight md:mb-12 md:text-6xl">
            Transforme sua Gestão Agora
          </h1>
          <p className="mb-12 text-xl opacity-90 md:mb-16">
            Supere as limitações das planilhas e avance para uma solução completa de avaliação e treinamento
          </p>

          {config.stripe.plans.map((plan) => (
            <ButtonCheckout key={plan.priceId} priceId={plan?.priceId} mode="subscription" />
          ))}
        </div>
      </div>
    </section>
  );
};
