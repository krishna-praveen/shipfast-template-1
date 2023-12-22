"use client";

import Link from 'next/link';
import { useState } from "react";
import {
  Settings,
  Zap,
  Home,
  Users,
  BookText,
  Dumbbell,
} from 'lucide-react';

export const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Home", icon: Home, href: "/home" },
    { title: "Alunos", icon: Users, href: "/students", gap: true },
    { title: "Avaliações", icon: BookText, href: "/assessments" },
    { title: "Treinos", icon: Dumbbell, href: "/workouts" },
    { title: "Configurações", icon: Settings, href: "/settings", gap: true },
  ];

  return (
    <div className="flex bg-base-300">
      <div className={`${open ? "w-72" : "w-20"} bg-dark-purple relative h-screen p-5 pt-8 duration-300`}>
        {/* <ChevronLeftCircle width={48} height={48} className={`absolute cursor-pointer -right-3 top-9 w-7 rounded-full hover:text-indigo-600 ${open && "text-indigo-600"} ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} /> */}

        <div className="flex items-center p-2">
          <Zap className="h-6 w-6 cursor-pointer duration-500" onClick={() => setOpen(!open)} />
          <h1 className={`ml-4 text-xl font-medium text-white duration-200 ${!open && "hidden"}`}>
            Pump
          </h1>
        </div>

        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link href={Menu.href} key={index}>
              <li className={`flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-gray-300 hover:bg-indigo-600 ${Menu.gap ? "mt-9" : "mt-2"}`}>
                <Menu.icon />
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
