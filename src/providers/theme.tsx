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
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7373cb",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      paper: "#2a2a3b",
      default: "#282a36",
    },
  },
});

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
