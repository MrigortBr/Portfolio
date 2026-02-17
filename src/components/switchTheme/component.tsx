"use client";

import { useTheme } from "next-themes";
import { SwitchContainer, SwitchItemWrapper } from "./style";
import { IoSunny, IoMoonOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const [themeLocal, setThemeState] = useState<"light" | "dark">(
    theme == "light" ? "light" : "dark"
  );

  function tradeTheme(theme: string) {
    const newTheme = theme == "light" ? "dark" : "light";
    setTheme(newTheme);
    setThemeState(newTheme);
  }

  return (
    <SwitchContainer
      $light={themeLocal == "light"}
      onClick={() => tradeTheme(themeLocal)}
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
