import { ReactNode } from "react";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: `Reset password to ${config.appName}`,
  canonicalUrlRelative: "/reset-password",
});

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
