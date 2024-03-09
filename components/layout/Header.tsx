"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { JSX } from "react";
import { useState, useEffect } from "react";

import { Icon } from "@/public/icon";

import config from "@/config";

import { Button } from "../ui/Button";
import { ButtonSignIn } from "../ui/buttons";

const links: {
  href: string;
  label: string;
}[] = [
    {
      href: "/#pricing",
      label: "Preço",
    },
    {
      href: "/#faq",
      label: "FAQ",
    },
  ];

const cta: JSX.Element = <ButtonSignIn extraStyle="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary-600 hover:bg-primary-700 text-primary-foreground shadow h-9 px-4 py-2" />;

export const Header = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  return (
    <header className="bg-base-200">
      <nav
        className="container mx-auto flex items-center justify-between px-8 py-10"
        aria-label="Global"
      >
        {/* Your logo/name on large screens */}
        <div className="flex lg:flex-1">
          <Link
            className="flex shrink-0 items-center gap-2 "
            href="/"
            title={`${config.appName} hompage`}
          >
            <Icon width={25} height={49} />
          </Link>
        </div>
        {/* Burger button to open menu on mobile */}
        <div className="flex lg:hidden">
          <Button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="text-base-content size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Button>
        </div>

        {/* Your links on large screens */}
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-12">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="link link-hover hover:text-primary-400"
              title={link.label}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA on large screens */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {cta}
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`z-50 relative ${isOpen ? "" : "hidden"}`}>
        <div className={`bg-base-200 sm:ring-neutral/10 z-10 fixed inset-y-0 right-0 w-full origin-right overflow-y-auto px-8 py-4 transition duration-300 ease-in-out sm:max-w-sm sm:ring-1`}>
          {/* Your logo/name on small screens */}
          <div className="flex items-center justify-between">
            <Link
              className="flex shrink-0 items-center gap-2 "
              title={`${config.appName} hompage`}
              href="/"
            >
              <Image
                src='/images/logo/icon.png'
                alt={`${config.appName} logo`}
                className="w-8"
                priority={true}
                width={32}
                height={32}
              />
              {/* <LogoIcon /> */}
              <span className="text-lg font-extrabold">{config.appName}</span>
            </Link>
            <Button
              type="button"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>

          {/* Your links on small screens */}
          <div className="mt-6 flow-root">
            <div className="py-4">
              <div className="flex flex-col items-start gap-y-4">
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className="link-hover link"
                    title={link.label}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="divider"></div>
            {/* Your CTA on small screens */}
            <div className="flex flex-col">{cta}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
