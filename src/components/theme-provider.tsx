"use client";
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from "next-themes";
import type { ReactNode } from "react";
export function ThemeProvider({ children }: { children: ReactNode }) { return <NextThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>{children}</NextThemeProvider>; }
export function useTheme() {
  const state = useNextTheme();
  const setTheme = (theme: string) => {
    const apply = () => state.setTheme(theme);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("startViewTransition" in document)) { apply(); return; }
    document.startViewTransition(apply);
  };
  return { theme: state.theme ?? "system", resolvedTheme: state.resolvedTheme ?? "light", setTheme };
}
