import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  colors: {
    background: "#ffffff",
    text: "#111111",
    primary: "#2563eb",
    custom: {
      header: "#181818",
      search: "#242424",
      searchBorder: "#454545",
      searchText: "#CCCCCC",
    },
    customPallete: {
      purpleSecondary: "#9D00FF",
      selectedColor: "#FFFFFF",
    },
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    background: "",
    text: "",
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
      purpleSecondary: "#9D00FF",
      selectedColor: "#FFFFFF",
      unselectedColor: "#868686",
      backgroundSelected: "#ecceff4b",
      backgroundHover: "#ecceff1e",
    },
  },
};
