import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      primary: string;
      custom: { [key: string]: string };
      customPallete: { [key: string]: string };
    };
  }
}
