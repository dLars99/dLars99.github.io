import React, { type FC } from "react";
import { TabpanelLayout } from "./TabpanelLayout";

export interface StylingProps {}

export const Styling: FC<StylingProps> = () => {
  return (
    <TabpanelLayout>
      <h2>Customizable Styling</h2>

      <p>
        Basic styles are included in react-routing-tabs. Those styles are also
        easily customizable to your needs.
      </p>

      <p>
        Inspect the elements in these tabs to see how custom styles have been
        applied to this demo.
      </p>
    </TabpanelLayout>
  );
};
