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

export const DemoTabs: FC<DemoTabsProps> = ({}) => {
  const config = [
    {
      name: "Intro",
      route: "intro",
    },
    {
      name: "Tab 2",
      route: "tab-2",
    },
  ];

  return (
    <div className={css(styles)}>
      <RoutingTabs config={config}>
        <TabList />

        <TabPanelWindow />
      </RoutingTabs>
    </div>
  );
};
