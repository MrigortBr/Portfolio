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
  const { theme, systemTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedTheme: DefaultTheme = !mounted
    ? darkTheme
    : theme === "system"
      ? systemTheme === "dark"
        ? darkTheme
        : lightTheme
      : theme === "dark"
        ? darkTheme
        : lightTheme;

  return (
    <StyledThemeProvider theme={resolvedTheme}>{children}</StyledThemeProvider>
  );
}

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <StyledThemeBridge>{children}</StyledThemeBridge>
    </NextThemeProvider>
  );
}
