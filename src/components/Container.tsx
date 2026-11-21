import type { ReactNode } from "react";

/** Shared page width: 1100px max, 24px side padding. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1148px] px-6 ${className}`}>{children}</div>
  );
}
