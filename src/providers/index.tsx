import React from "react";
import { CustomThemeProvider } from "./theme";
import { QueryProvider } from "./queryProvider";

interface Props {
  children: React.ReactNode;
}
export const Providers = ({ children }: Props) => {
  return (
    <CustomThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </CustomThemeProvider>
  );
};
