import React, { type FC } from "react";
import { RoutingTabs, Tab, TabList, TabPanelWindow } from "react-routing-tabs";
import { css } from "../../../styled-system/css";

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
    <div className={css({ width: "fit-content", mx: "auto", mt: 20 })}>
      <RoutingTabs config={config}>
        <TabList />

        <TabPanelWindow />
      </RoutingTabs>
    </div>
  );
};
