"use client";

import { Settings, Home, Users, BookText, Dumbbell, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

import { Icon } from '@/public/icon';

const MenuItem = ({ title, Icon, href, currentPath }: any) => (
  <Link href={href} title={title} prefetch>
    <li className={`tooltip tooltip-right flex cursor-pointer items-center justify-center rounded-md p-2 text-sm text-gray-300 hover:text-secondary-600 ${currentPath === href ? 'text-secondary-500' : ''} ${title === "Alunos" || title === "Configurações" ? "mt-9" : "mt-2"}`} data-tip={title}>
      <Icon />
    </li>
  </Link>
);

export const Sidebar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const currentPath = usePathname();

  const handleThemeChange = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  const Menus = [
    { title: "Home", Icon: Home, href: "/home" },
    { title: "Alunos", Icon: Users, href: "/students" },
    { title: "Avaliações", Icon: BookText, href: "/assessments" },
    { title: "Treinos", Icon: Dumbbell, href: "/workouts" },
    { title: "Configurações", Icon: Settings, href: "/settings" },
  ];

  return (
    <aside className="absolute flex h-screen items-center justify-center "> {/* Alinhamento vertical ao centro */}
      <nav className="flex h-auto flex-col justify-between rounded-r-xl bg-zinc-800 p-5 pt-8 shadow-xl duration-300"> {/* Altura específica e estilo de flexbox */}
        <div>
          <div className="flex items-center p-2">
            <Icon className="size-6 duration-500" />
          </div>
          <ul className="pt-6">
            {Menus.map((menu, index) => (
              <MenuItem key={index} {...menu} currentPath={currentPath} />
            ))}
          </ul>
        </div>
        <div className="tooltip tooltip-right flex cursor-pointer items-center justify-center rounded-md p-2 text-sm text-gray-300 hover:text-secondary-600" data-tip="Tema" onClick={handleThemeChange} suppressHydrationWarning>
          {resolvedTheme === 'dark' || resolvedTheme === undefined ? <Sun /> : <Moon />}
        </div>
      </nav>
    </aside>
  );
}
