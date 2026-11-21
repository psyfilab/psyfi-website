"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/** Respects the visitor's "reduce motion" setting for every animation below it. */
export function MotionRoot({ children }: { children: ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}