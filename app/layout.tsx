import { Viewport } from "next";
import { Inter } from "next/font/google";
import PlausibleProvider from "next-plausible";
import { ReactNode } from "react";

import { ClientLayout } from "@/components/layout/LayoutClient";

import { GlobalProviders } from '@/providers/GlobalProviders';
import { ThemeProvider } from "@/providers/ThemeProvider"

import { getSEOTags } from "@/libs/seo";

import config from "@/config";

import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={font.className}>
      {config.domainName && (
        <head>
          <PlausibleProvider domain={config.domainName} />
        </head>
      )}
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* GlobalProviders contains all contexts */}
          <GlobalProviders>
            {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
            <ClientLayout>{children}</ClientLayout>
          </GlobalProviders>
        </ThemeProvider>

      </body>
    </html>
  );
}
