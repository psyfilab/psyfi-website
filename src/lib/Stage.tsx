import type { ReactNode } from "react";

type StageProps = {
    children: ReactNode;
    /** Layout classes for below lg (grid, flex column, padding...). */
    className?: string;
};

export function Stage({ children, className = "" }: StageProps) {
    return (
        <div className="relative min-h-dvh w-full bg-plum lg:flex lg:h-dvh lg:justify-center lg:overflow-hidden">
            <div
                className={`
          relative min-h-dvh w-full
          lg:block lg:min-h-0 lg:p-0
          lg:[--u:min(1vw,1.37dvh)]
          lg:h-[calc(var(--u)*73)] lg:w-[calc(var(--u)*100)]
          ${className}
        `}
            >
                {children}
            </div>
        </div>
    );
}