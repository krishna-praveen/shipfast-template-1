import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-16 bg-base-100 p-8 lg:flex-row lg:gap-20 lg:py-20">
      <div className="flex flex-col items-center justify-center gap-10 text-center lg:items-start lg:gap-14 lg:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight md:-mb-4 lg:text-6xl">
          A revolução no gerenciamento de treino personalizado
        </h1>
        <p className="text-lg leading-relaxed opacity-80">
          Maximize o potencial dos seus alunos com ferramentas inteligentes de planejamento e acompanhamento
        </p>

        <Link href={`/#pricing`} className="btn btn-primary btn-wide">
          Planos Disponíveis
        </Link>
      </div>
      <div className="lg:w-full">
        <Image
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Product Demo"
          className="w-full"
          priority={true}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};
