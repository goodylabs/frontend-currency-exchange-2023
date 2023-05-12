import React from "react";
import {
  ThemeProvider as MUIThemeProvider,
  Theme,
  createTheme,
} from "@mui/material";
import { ThemeProvider as SCThemeProvider } from "styled-components";

interface Props {
  children: React.ReactNode;
}
const theme = createTheme();

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

export const CustomThemeProvider = ({ children }: Props) => {
  return (
    <MUIThemeProvider theme={theme}>
      <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
    </MUIThemeProvider>
  );
};
