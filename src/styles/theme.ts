import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  colors: {
    background: "#F8F9FB",
    text: "#1A1A1A",
    primary: "#6C63FF",

    custom: {
      header: "#d6d6d6",
      search: "#cacaca",
      searchBorder: "#DADCE0",
      searchText: "#4A4A4A",
      border: "#E6E6E6",
      fileSelected: "#d3d4d6",
    },

    customPallete: {
      purplePrimary: "#6C63FF",
      purpleSecondary: "#9D00FF",

      purpleTranslucent: "#9d00ff20",
      purpleTranslucentSecondary: "#53008615",

      purpleGradientTranslucent: "rgba(157, 0, 255, 0.06)",
      purpleGradientTranslucentSecondary: "rgba(83, 0, 134, 0.03)",

      selectedColor: "#1A1A1A",
      unselectedColor: "#8A8A8A",

      backgroundSelected: "#6C63FF20",
      backgroundHover: "#6C63FF12",
    },
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    background: "#000000",
    text: "#fff",
    primary: "",
    custom: {
      header: "#181818",
      search: "#242424",
      searchBorder: "#454545",
      searchText: "#CCCCCC",
      border: "#232323",
      fileSelected: "#1F1F1F",
    },
    customPallete: {
      purplePrimary: "#6C63FF",
      purpleSecondary: "#9D00FF",
      purpleTranslucent: "#9d00ff65",
      purpleTranslucentSecondary: "#53008665",
      purpleGradientTranslucent: "rgba(157, 0, 255, 0.10)",
      purpleGradientTranslucentSecondary: "rgba(83, 0, 134, 0.05)",
      selectedColor: "#FFFFFF",
      unselectedColor: "#868686",
      backgroundSelected: "#ecceff4b",
      backgroundHover: "#ecceff1e",
    },
  },
};
