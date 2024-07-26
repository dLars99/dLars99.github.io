import React, { type FC } from "react";
import { TabpanelLayout } from "./TabpanelLayout";

export interface Tab1Props {}

export const Tab1: FC<Tab1Props> = ({}) => {
  console.log("Logic Placeholder");

  return (
    <TabpanelLayout>
      <h1>Hello World</h1>
    </TabpanelLayout>
  );
};
