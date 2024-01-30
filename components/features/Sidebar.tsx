"use client";

import {
  Settings,
  Home,
  Users,
  BookText,
  Dumbbell,
  Moon,
  Sun
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from "react";

import { Icon } from '@/public/icon';

export const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const Menus = [
    { title: "Home", icon: Home, href: "/home" },
    { title: "Alunos", icon: Users, href: "/students", gap: true },
    { title: "Avaliações", icon: BookText, href: "/assessments" },
    { title: "Treinos", icon: Dumbbell, href: "/workouts" },
    { title: "Configurações", icon: Settings, href: "/settings", gap: true },
  ];

  return (
    <div className="bg-base-300 flex">
      <div className={`bg-dark-purple flex h-screen w-20 flex-col justify-between p-5 pt-8 duration-300`}>
        <div>
          <div className="flex items-center p-2">
            <Icon className="h-6 w-6 duration-500" />
          </div>

          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <Link href={Menu.href} key={index}>
                <li className={`tooltip tooltip-right flex cursor-pointer items-center justify-center rounded-md p-2 text-sm text-gray-300 hover:bg-indigo-600 ${currentPath === Menu.href ? 'bg-indigo-600 text-white' : ''} ${Menu.gap ? "mt-9" : "mt-2"}`} data-tip={Menu.title}>
                  <Menu.icon />
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="tooltip tooltip-right flex cursor-pointer items-center justify-center rounded-md p-2 text-sm text-gray-300 hover:bg-indigo-600" data-tip="Tema" onClick={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun /> : <Moon />}
        </div>
      </div>
    </div>
  );
}
