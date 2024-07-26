import React, { type FC } from "react";
import { TabpanelLayout } from "./TabpanelLayout";

export interface Tab2Props {}

export const Tab2: FC<Tab2Props> = ({}) => {
  console.log("Logic Placeholder");

  return (
    <TabpanelLayout>
      <h1>Goodbye World</h1>
    </TabpanelLayout>
  );
};
