import React, { type FC } from "react";
import { TabpanelLayout } from "./TabpanelLayout";

export interface HowToUseProps {}

export const HowToUse: FC<HowToUseProps> = () => {
  return (
    <TabpanelLayout>
      <h2>How To Use react-routing-tabs</h2>

      <p>
        The components in react-routing-tabs integrate seamlessly with any app
        that uses react-router-dom.
      </p>

      <p>Requirements:</p>

      <p>React v18</p>

      <p>react-router-dom v6+</p>

      <p>
        For routing, make sure all your routes for the tabs and their content
        are configured in react-router-dom's route structure.
      </p>
    </TabpanelLayout>
  );
};
