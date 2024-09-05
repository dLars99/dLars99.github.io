import React, { type FC } from "react";
import { TabpanelLayout } from "./TabpanelLayout";

export interface Tab1Props {}

export const Intro: FC<Tab1Props> = ({}) => (
  <TabpanelLayout>
    <h1>React Routing Tabs</h1>
    <p>
      React Routing Tabs is an easy-to-setup tab structure that gives you tabs
      that route along with standard WAI-ARIA accessiblity features.
    </p>

    <p>
      Use the tabs to navigate between pages. Notice that the URL updates with
      each tab change. You can also use the keyboard to navigate through the
      tabs.
    </p>
  </TabpanelLayout>
);
