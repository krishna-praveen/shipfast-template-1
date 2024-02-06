"use client";

import { Settings, Home, Users, BookText, Dumbbell, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from "react";

import { Icon } from '@/public/icon';

const MenuItem = ({ title, Icon, href, currentPath }: any) => (
  <Link href={href}>
    <li className={`tooltip tooltip-right flex cursor-pointer items-center justify-center rounded-md p-2 text-sm text-gray-300 hover:text-secondary-600 ${currentPath === href ? 'text-secondary-500' : ''} ${title === "Alunos" || title === "Configurações" ? "mt-9" : "mt-2"}`} data-tip={title}>
      <Icon />
    </li>
  </Link>
);

export const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleThemeChange = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const Menus = [
    { title: "Home", Icon: Home, href: "/home" },
    { title: "Alunos", Icon: Users, href: "/students" },
    { title: "Avaliações", Icon: BookText, href: "/assessments" },
    { title: "Treinos", Icon: Dumbbell, href: "/workouts" },
    { title: "Configurações", Icon: Settings, href: "/settings" },
  ];

  return (
    <div className="flex h-screen items-center justify-center"> {/* Alinhamento vertical ao centro */}
      <div className="flex h-auto flex-col justify-between rounded-r-xl bg-zinc-800 p-5 pt-8 duration-300"> {/* Altura específica e estilo de flexbox */}
        <div>
          <div className="flex items-center p-2">
            <Icon className="h-6 w-6 duration-500" />
          </div>
          <ul className="pt-6">
            {Menus.map((menu, index) => (
              <MenuItem key={index} {...menu} currentPath={currentPath} />
            ))}
          </ul>
        </div>
        <div className="tooltip tooltip-right flex cursor-pointer items-center justify-center rounded-md p-2 text-sm text-gray-300 hover:text-secondary-600" data-tip="Tema" onClick={handleThemeChange}>
          {theme === 'dark' ? <Sun /> : <Moon />}
        </div>
      </div>
    </div>
  );
}
