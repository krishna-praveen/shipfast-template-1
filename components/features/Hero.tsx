"use client"

import { useEffect, useState } from "react";

import { HeroLogo } from "@/public/HeroLogo";

import { Button } from "../ui/Button";

export const Hero = () => {
  const [heroHeight, setHeroHeight] = useState('auto');

  useEffect(() => {
    const updateHeight = () => {
      const headerHeight = document.querySelector('header')?.clientHeight || 0;
      setHeroHeight(`calc(100vh - ${headerHeight}px)`);
    };

    window.addEventListener('resize', updateHeight);
    updateHeight();

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <section
      className="flex flex-col items-center justify-center p-4 md:p-8 lg:py-20"
      style={{ height: heroHeight }}
    >
      <div className="flex flex-col items-center space-y-12 md:space-y-24">
        <HeroLogo className="h-[95px] w-[461px] sm:h-[62px] sm:w-[300px] md:h-[83px] md:w-[400px] lg:h-[95px] lg:w-[461px]" />

        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
            Gerencie. Organize. Potencialize.
          </h1>
          <div className="text-sm font-semibold md:text-base lg:text-lg">
            A solução definitiva para gerenciar treinos e avaliações de seus alunos com facilidade.
          </div>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <small className="text-xs font-medium leading-none md:text-sm">
            Explore sem pagar nada por 7 dias!
          </small>
          <Button className="w-full bg-primary-600 text-sm hover:bg-primary-700 md:text-base">
            Começar Gratuitamente
          </Button>
        </div>
      </div>
    </section>
  );
};
