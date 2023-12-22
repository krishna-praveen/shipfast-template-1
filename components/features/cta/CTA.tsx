import Image from "next/image";
import Link from "next/link";

export const CTA = () => {
  return (
    <section className="hero relative min-h-screen overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Background"
        className="w-full object-cover"
        fill
      />
      <div className="hero-overlay relative bg-neutral bg-opacity-70"></div>
      <div className="hero-content relative p-8 text-center text-neutral-content">
        <div className="flex max-w-xl flex-col items-center p-8 md:p-0">
          <h2 className="mb-8 text-3xl font-bold tracking-tight md:mb-12 md:text-5xl">
            Leve seus treinamentos ao próximo nível com Pump
          </h2>
          <p className="mb-12 text-lg opacity-80 md:mb-16">
            Diga adeus às planilhas obsoletas e abrace um sistema integrado para avaliação e treinamento
          </p>
          <Link href="/#pricing" className="btn btn-primary btn-wide">Comece agora com Pump</Link>
        </div>
      </div>
    </section>
  );
};
