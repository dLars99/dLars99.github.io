import React, { type FC } from "react";
import { RoutingTabs, TabList, TabPanelWindow } from "react-routing-tabs";
import styles from "./DemoTabs.module.css";

export interface DemoTabsProps {}

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
    <div className={styles.wrapper}>
      <RoutingTabs config={routerConfig}>
        <TabList />

        <TabPanelWindow />
      </RoutingTabs>
    </div>
  );
};
