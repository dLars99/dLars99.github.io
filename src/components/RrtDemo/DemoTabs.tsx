import React, { type FC } from "react";
import { RoutingTabs, Tab, TabList, TabPanelWindow } from "react-routing-tabs";
import { css, cx } from "../../../styled-system/css";
import "./styleOverrides.css";

export interface DemoTabsProps {}

export const DemoTabs: FC<DemoTabsProps> = ({}) => {
  console.log("Logic Placeholder");
  const config = [
    {
      name: "Tab 1",
      route: "tab-1",
    },
    {
      name: "Tab 2",
      route: "tab-2",
    },
  ];

  return (
    <div
      className={css({
        bg: "background",
        color: "black",
        borderRadius: "4px",
        width: "fit-content",
        minWidth: "60ch",
        mx: "auto",
        mt: 20,
        "& li": {
          border: "none",
        },
      })}
    >
      <RoutingTabs config={config}>
        <TabList />

        <TabPanelWindow />
      </RoutingTabs>
    </div>
  );
};
