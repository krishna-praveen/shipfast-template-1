import Image from "next/image";
import Link from "next/link";

import config from "@/config";

// Add the Footer to the bottom of your landing page and more.
// The support link is connected to the config.js file. If there's no config.resend.supportEmail, the link won't be displayed.

export const Footer = () => {
  return (
    <footer className="border-t bg-zinc-800">
      <div className="mx-auto max-w-7xl px-8 py-24">
        <div className=" flex flex-col flex-wrap md:flex-row md:flex-nowrap lg:items-start">
          <div className="mx-auto w-64 shrink-0 text-center md:mx-0 md:text-left">
            <Link
              href="/#"
              aria-current="page"
              className="flex items-center justify-center gap-2 md:justify-start"
            >
              <Image
                src='/images/logo/icon.png'
                alt={`${config.appName} logo`}
                priority={true}
                className="size-6"
                width={24}
                height={24}
              />
              <strong className="text-base font-extrabold tracking-tight md:text-lg">
                {config.appName}
              </strong>
            </Link>

            <p className="text-base-content/80 mt-3 text-sm">
              {config.appDescription}
            </p>
            <p className="text-base-content/60 mt-3 text-sm">
              Copyright © {new Date().getFullYear()} - Todos os direitos reservados
            </p>
          </div>
          <div className="-mb-10 mt-10 flex grow flex-wrap justify-center text-center md:mt-0">
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="footer-title text-base-content mb-3 text-sm font-semibold tracking-widest md:text-left">
                LINKS
              </div>

              <div className="mb-10 flex flex-col items-center justify-center gap-2 text-sm md:items-start">
                {config.resend.supportEmail && (
                  <a
                    href={`mailto:${config.resend.supportEmail}`}
                    target="_blank"
                    className="link-hover link"
                    aria-label="Contact Support"
                  >
                    Suporte
                  </a>
                )}
                <Link href="/#pricing" className="link-hover link">
                  Preços
                </Link>
              </div>
            </div>

            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="footer-title text-base-content mb-3 text-sm font-semibold tracking-widest md:text-left">
                LEGAL
              </div>

              <div className="mb-10 flex flex-col items-center justify-center gap-2 text-sm md:items-start">
                <Link href="/tos" className="link-hover link">
                  Termos de Serviços
                </Link>
                <Link href="/privacy-policy" className="link-hover link">
                  Política de Privacidade
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
