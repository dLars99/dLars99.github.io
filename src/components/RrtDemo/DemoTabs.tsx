import React, { type FC } from "react";
import { RoutingTabs, TabList, TabPanelWindow } from "react-routing-tabs";
import { css } from "../../../styled-system/css";
import "./styleOverrides.css";

export interface DemoTabsProps {}

const styles = {
  bg: "background",
  color: "black",
  borderRadius: "4px",
  minWidth: "60ch",
  maxWidth: "calc(65ch + 2rem)",
  mx: "auto",
  mt: 20,
};

export const routerConfig = [
  {
    name: "Intro",
    route: "intro",
  },
  {
    name: "Tab 2",
    route: "tab-2",
  },
];

export const DemoTabs: FC<DemoTabsProps> = ({}) => {
  return (
    <div className={css(styles)}>
      <RoutingTabs config={routerConfig}>
        <TabList />

        <TabPanelWindow />
      </RoutingTabs>
    </div>
  );
};

/** Tabs:
 * 1. Intro
 * 2. Styling
 * 3. Syntax and important info (react-router-dom requirements, etc.)
 * ?? Break 3 into sections for data, config, etc. ??
 * 4. Links
 */
