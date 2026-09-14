import React, { type FC, type ReactNode } from "react";
import { Tabpanel } from "react-routing-tabs";
import styles from "./TabpanelLayout.module.css";
import "../styleOverrides.css";

export interface TabpanelLayoutProps {
  children: ReactNode;
}

export const TabpanelLayout: FC<TabpanelLayoutProps> = ({ children }) => {
  return (
    <Tabpanel>
      <article className={styles.article}>{children}</article>
    </Tabpanel>
  );
};
