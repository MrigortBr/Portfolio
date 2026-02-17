/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { lightTheme, darkTheme } from "@/styles/theme";
import { DefaultTheme } from "styled-components";

interface Props {
  children: ReactNode;
}

function StyledThemeBridge({ children }: Props) {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 🔥 Se não houver preferência salva, usa o sistema
    const savedTheme = localStorage.getItem("theme");

    if (!savedTheme) {
      setTheme("system");
    }
  }, [setTheme]);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  const resolvedTheme: DefaultTheme =
    currentTheme === "dark" ? darkTheme : lightTheme;

  return (
    <StyledThemeProvider theme={resolvedTheme}>{children}</StyledThemeProvider>
  );
}

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      storageKey='theme' // salva no localStorage automaticamente
    >
      <StyledThemeBridge>{children}</StyledThemeBridge>
    </NextThemeProvider>
  );
}
