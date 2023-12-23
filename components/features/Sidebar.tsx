"use client";

import {
  Settings,
  Zap,
  Home,
  Users,
  BookText,
  Dumbbell,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const Menus = [
    { title: "Home", icon: Home, href: "/home" },
    { title: "Alunos", icon: Users, href: "/students", gap: true },
    { title: "Avaliações", icon: BookText, href: "/assessments" },
    { title: "Treinos", icon: Dumbbell, href: "/workouts" },
    { title: "Configurações", icon: Settings, href: "/settings", gap: true },
  ];

  return (
    <div className="flex bg-base-300">
      <div className={`bg-dark-purple relative h-screen w-20 p-5 pt-8 duration-300`}>
        <div className="flex items-center p-2">
          <Zap className="h-6 w-6 duration-500" />
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
    </div>
  );
}
