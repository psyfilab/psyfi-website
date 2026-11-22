"use client";

import type { ReactNode } from "react";
import { ArrowRightIcon } from "./Icons";
import { useDiagnostic } from "./DiagnosticModal";

const variants = {
  /** Small plum button for the header */
  dark: "h-[37px] rounded-lg bg-plum px-[17px] text-[15px] font-medium text-white hover:-translate-y-0.5 hover:bg-[#451a63] hover:shadow-[0_10px_24px_-10px_rgba(50,18,74,0.7)] active:translate-y-0 active:scale-[0.98]",
  /** Big coral call to action */
  primary:
    "h-[53px] rounded-[10px] bg-coral px-[29px] text-[17px] font-semibold text-plum shadow-[0_10px_30px_-8px_rgba(238,120,103,0.55)] hover:-translate-y-0.5 hover:bg-[#f28676] hover:shadow-[0_16px_36px_-8px_rgba(238,120,103,0.75)] active:translate-y-0 active:scale-[0.98]",
  /** Big outlined button */
  outline:
    "h-[53px] rounded-[10px] border-2 border-[#ddd6e7] bg-white px-[27px] text-[17px] font-semibold text-plum hover:-translate-y-0.5 hover:border-plum hover:bg-plum hover:text-white active:translate-y-0 active:scale-[0.98]",
  /** Big white button for dark backgrounds */
  white:
    "h-[53px] rounded-[10px] bg-white px-[29px] text-[17px] font-semibold text-plum hover:-translate-y-0.5 hover:bg-[#f4efff] hover:shadow-[0_14px_30px_-10px_rgba(255,255,255,0.35)] active:translate-y-0 active:scale-[0.98]",
} as const;

type ButtonProps = {
  variant: keyof typeof variants;
  arrow?: boolean;
  /** Plain link target (ignored when opensDiagnostic is set) */
  href?: string;
  /** Opens the "Book a diagnostic" dialog instead of navigating */
  opensDiagnostic?: boolean;
  /** Open the link in a new browser tab */
  newTab?: boolean;
  children: ReactNode;
};

export function Button({
  href,
  variant,
  arrow = false,
  opensDiagnostic = false,
  newTab = false,
  children,
}: ButtonProps) {
  const { open } = useDiagnostic();
  const className = `group inline-flex items-center justify-center gap-2.5 whitespace-nowrap transition duration-200 ${variants[variant]}`;
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRightIcon className="size-[18px] transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </>
  );

  if (opensDiagnostic) {
    return (
      <button type="button" onClick={open} className={className}>
        {content}
      </button>
    );
  }

  return (
    <a
      href={href}
      className={className}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}