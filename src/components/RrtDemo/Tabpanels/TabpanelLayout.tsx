import React, { type FC, type ReactNode } from "react";
import { Tabpanel } from "react-routing-tabs";
import { css } from "../../../../styled-system/css";
import "../styleOverrides.css";

export interface TabpanelLayoutProps {
  children: ReactNode;
}

export const TabpanelLayout: FC<TabpanelLayoutProps> = ({ children }) => {
  const styles = {
    p: 4,
    "& h2": {
      fontSize: "20px",
      color: "blue",
    },
    "& p": {
      my: 2,
      lineHeight: 1.4,
    },
  };

  return (
    <Tabpanel>
      <article className={css(styles)}>{children}</article>
    </Tabpanel>
  );
};
