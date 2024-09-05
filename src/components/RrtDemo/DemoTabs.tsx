import React, { type FC } from "react";
import { RoutingTabs, TabList, TabPanelWindow } from "react-routing-tabs";
import { css } from "../../../styled-system/css";

export interface DemoTabsProps {}

const styles = {
  bg: "background",
  color: "black",
  borderRadius: "4px",
  maxWidth: "60ch",
  width: ["95%", "calc(65ch + 2rem)"],
  mx: "auto",
  mt: 40,
};

export const routerConfig = [
  {
    name: "Intro",
    route: "intro",
  },
  {
    name: "How to Use",
    route: "how-to-use",
  },
  {
    name: "Styling",
    route: "styling",
  },
  {
    name: "Links",
    route: "links",
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
