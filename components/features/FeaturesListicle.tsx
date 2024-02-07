"use client";

import { BookText, Dumbbell, Users } from "lucide-react";
import type { JSX } from "react";
import { useState, useEffect, useRef } from "react";

// List of features to display:
// - name: name of the feature
// - description: description of the feature (can be any JSX)
// - svg: icon of the feature
const features: {
  name: string;
  description: JSX.Element;
  svg: JSX.Element;
}[] = [
    {
      name: "Alunos",
      description: (
        <>
          <ul className="space-y-1">
            {[
              "Cadastre seus alunos na nossa base",
              "Tenha as informações de cada um em um só lugar",
              "Tenha o controle de quem você está treinando",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="inline size-[18px] shrink-0 opacity-80"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>

                {item}
              </li>
            ))}
            <li className="flex items-center gap-3 font-medium text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="inline size-[18px] shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              Organize melhor
            </li>
          </ul>
        </>
      ),
      svg: (
        <Users />
      ),
    },
    {
      name: "Avaliações",
      description: (
        <>
          <ul className="space-y-2">
            {[
              "Registre as avaliações dos seus alunos",
              "Acompanhe o progresso de cada avaliação",
              "Tenha um histórico de todas as avaliações feitas em um só lugar",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="inline size-[18px] shrink-0 opacity-80"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>

                {item}
              </li>
            ))}
            <li className="flex items-center gap-3 font-medium text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="inline size-[18px] shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              Decisões mais rápidas
            </li>
          </ul>
        </>
      ),
      svg: (
        <BookText />
      ),
    },
    {
      name: "Treinos",
      description: (
        <>
          <ul className="space-y-2">
            {[
              "Crie treinos personalizados para cada aluno",
              "Acompanhe o progresso de cada treino",
              "Tenha uma base de mais 1.000 exercícios para montar seus treinos",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="inline size-[18px] shrink-0 opacity-80"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>

                {item}
              </li>
            ))}
            <li className="flex items-center gap-3 font-medium text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="inline size-[18px] shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              Mais de 1.000 exercícios
            </li>
          </ul>
        </>
      ),
      svg: (
        <Dumbbell />
      ),
    },
  ];

// A list of features with a listicle style.
// - Click on a feature to display its description.
// - Good to use when multiples features are available.
// - Autoscroll the list of features (optional).
export const FeaturesListicle = () => {
  const featuresEndRef = useRef<null>(null);
  const [featureSelected, setFeatureSelected] = useState<string>(
    features[0].name
  );
  const [hasClicked, setHasClicked] = useState<boolean>(false);

  // (Optional) Autoscroll the list of features so user know it's interactive.
  // Stop scrolling when user scroll after the featuresEndRef element (end of section)
  // emove useEffect is not needed.
  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasClicked) {
        const index = features.findIndex(
          (feature) => feature.name === featureSelected
        );
        const nextIndex = (index + 1) % features.length;
        setFeatureSelected(features[nextIndex].name);
      }
    }, 5000);

    try {
      // stop the interval when the user scroll after the featuresRef element
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            console.log("STOP AUTO CHANGE");
            clearInterval(interval);
          }
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.5,
        }
      );
      if (featuresEndRef.current) {
        observer.observe(featuresEndRef.current);
      }
    } catch (e) {
      console.error(e);
    }

    return () => clearInterval(interval);
  }, [featureSelected, hasClicked]);

  return (
    <section className="flex min-h-screen flex-col py-24" id="features">
      <div className="mx-auto max-w-3xl">
        <div className="bg-base-100 max-w-3xl max-md:px-8">
          <h2 className="mb-8 text-5xl font-extrabold tracking-tight">
            Temos tudo que você precisa em um <span className="text-secondary-600">único lugar</span>
          </h2>

          <div className="mb-8 leading-relaxed tracking-tight text-neutral-300 lg:text-lg">
            Registre seus alunos, avalie-os e crie treinos personalizados. Tudo em um único lugar.
            Use seu tempo para criar treinos, não para gerenciar planilhas.
            Pump é a solução para você que
            quer focar no que realmente importa.
          </div>
        </div>
      </div>

      <div>
        <div className="mx-auto mb-8 grid max-w-3xl grid-cols-4 justify-start gap-4 max-md:px-8 md:flex md:gap-12">
          {features.map((feature) => (
            <span
              key={feature.name}
              onClick={() => {
                if (!hasClicked) setHasClicked(true);
                setFeatureSelected(feature.name);
              }}
              className={`group flex cursor-pointer select-none flex-col items-center justify-center gap-3 p-2 duration-200`}
            >
              <span
                className={`duration-100 ${featureSelected === feature.name
                  ? "text-secondary-500"
                  : "group-hover:text-base-content/50 text-white"
                  }`}
              >
                {feature.svg}
              </span>
              <span
                className={`text-sm font-semibold ${featureSelected === feature.name
                  ? "text-secondary-500"
                  : "text-neutral-300"
                  }`}
              >
                {feature.name}
              </span>
            </span>
          ))}
        </div>
        <div className="bg-zinc-800">
          <div className="mx-auto flex max-w-3xl flex-col justify-center gap-12 md:flex-row md:items-center md:justify-start">
            <div
              className="text-base-content/80 animate-opacity max-w-xl space-y-4 p-12 leading-relaxed md:px-0"
              key={featureSelected}
            >
              <h3 className="text-base-content text-lg font-semibold">
                {features.find((f) => f.name === featureSelected)["name"]}
              </h3>

              {features.find((f) => f.name === featureSelected)["description"]}
            </div>
          </div>
        </div>
      </div>
      {/* Just used to know it's the end of the autoscroll feature (optional, see useEffect) */}
      <p className="opacity-0" ref={featuresEndRef}></p>
    </section>
  );
};
