import Image from "next/image";

const CTA = () => {
  return (
    <section className="relative hero overflow-hidden min-h-screen">
      <Image
        src="https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Background"
        className="object-cover w-full"
        fill
      />
      <div className="relative hero-overlay bg-neutral bg-opacity-70"></div>
      <div className="relative hero-content text-center text-neutral-content p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 md:mb-12">
            Leve seus treinamentos ao próximo nível com Pump
          </h2>
          <p className="text-lg opacity-80 mb-12 md:mb-16">
            Diga adeus às planilhas obsoletas e abrace um sistema integrado para avaliação e treinamento
          </p>
          {process.env.NODE_ENV === "production" ? null : (
            <button className="btn btn-primary btn-wide">Comece agora com Pump</button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
