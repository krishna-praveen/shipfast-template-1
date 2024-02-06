import { Redo } from "lucide-react";

const Step = ({ emoji, text }: { emoji: string; text: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 md:w-48">
      <span className="text-4xl">{emoji}</span>
      <h3 className="text-center font-bold">{text}</h3>
    </div>
  );
};

// Problem Agitation: A crucial, yet overlooked, component for a landing page that sells.
// It goes under your Hero section, and above your Features section.
// Your Hero section makes a promise to the customer: "Our product will help you achieve XYZ".
// Your Problem section explains what happens to the customer if its problem isn't solved.
// The copy should NEVER mention your product. Instead, it should dig the emotional outcome of not fixing a problem.
export const Problem = () => {
  return (
    <section className="bg-neutral text-neutral-content flex min-h-screen flex-col justify-center">
      <div className="px-4 py-16 text-center sm:px-8 md:mx-auto md:max-w-7xl md:py-32">
        <div className="space-y-6 md:space-y-8">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Personal Trainers enfrentam um<br />
            emaranhado de <span className="text-secondary-600">desafios diários</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed opacity-90">
            Da gestão de múltiplos alunos à manutenção de registros detalhados de treino e progresso, o dia a dia pode rapidamente se tornar opressor.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 md:mt-16 md:flex-nowrap">
          <Step emoji="💻" text="Dispersão de dados entre PDFs, Word e Excel" />
          <Redo className="hidden w-12 md:block" />

          <Step emoji="🔄" text="Perda de tempo com processos manuais" />
          <Redo className="hidden w-12 md:block md:-rotate-180 md:-scale-x-100" />

          <Step emoji="😩" text="Dificuldade em monitorar o progresso do aluno" />
          <Redo className="hidden w-12 md:block" />

          <Step emoji="📉" text="Clientes insatisfeitos com a falta de personalização" />
        </div>
      </div>
    </section>
  );
};
