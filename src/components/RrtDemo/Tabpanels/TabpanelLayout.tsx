import React, { type FC, type ReactNode } from "react";
import { Tabpanel } from "react-routing-tabs";
import { css } from "../../../../styled-system/css";

export interface TabpanelLayoutProps {
  children: ReactNode;
}

export const TabpanelLayout: FC<TabpanelLayoutProps> = ({ children }) => {
  console.log("Logic Placeholder");

  return (
    <Tabpanel>
      <article className={css({ p: 4 })}>{children}</article>
    </Tabpanel>
  );
};
