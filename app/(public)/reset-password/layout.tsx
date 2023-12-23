import { ReactNode } from "react";

export default async function LayoutPrivate({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
