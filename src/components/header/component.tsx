"use client";

import Index from "@/components/switchTheme/component";
import {
  SearchIcon,
  VisualHeader,
  VisualSearch,
  VisualSearchWrapper,
} from "./style";
import Image from "next/image";
import { useState } from "react";
import ThemeSwitcher from "@/components/switchTheme/component";

export default function VisualHeaderComponent() {
  const [value, setValue] = useState<string>("Portfólio");

  return (
    <VisualHeader>
      <Image
        style={{
          position: "absolute",
          marginLeft: "0.5%",
        }}
        src={"vscode.svg"}
        width={16}
        height={16}
        alt='Official Logo Visual Studio'
      ></Image>
      <VisualSearchWrapper>
        <SearchIcon></SearchIcon>
        <VisualSearch
        // value={value}
        // onChange={(e) => setValue(e.target.value)}
        >
          {value}
        </VisualSearch>
        <ThemeSwitcher></ThemeSwitcher>
      </VisualSearchWrapper>
    </VisualHeader>
  );
}
