"use client";

import { useTheme } from "next-themes";
import { SwitchContainer, SwitchItemWrapper } from "./style";
import { IoSunny, IoMoonOutline } from "react-icons/io5";
import { useState } from "react";

export default function ThemeSwitcher() {
  const { setTheme } = useTheme();
  const [theme, setThemeState] = useState<"light" | "dark">("dark");

  function tradeTheme(theme: string) {
    console.log(theme);
    const newTheme = theme == "light" ? "dark" : "light";
    console.log(newTheme);
    setTheme(newTheme);
    setThemeState(newTheme);
  }

  return (
    <SwitchContainer
      $light={theme == "light"}
      onClick={() => tradeTheme(theme)}
    >
      <SwitchItemWrapper className='left'>
        <IoSunny />
      </SwitchItemWrapper>
      <SwitchItemWrapper className='right'>
        <IoMoonOutline />
      </SwitchItemWrapper>
    </SwitchContainer>
    // <div>
    //   <button onClick={() => tradeTheme("light")}>TROCAR TEMA - LIGHT</button>
    //   <button onClick={() => tradeTheme("dark")}>TROCAR TEMA - DARK</button>
    // </div>
  );
}
