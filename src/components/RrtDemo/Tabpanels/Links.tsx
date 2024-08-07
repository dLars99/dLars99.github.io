import React, { type FC } from "react";
import { TabpanelLayout } from "./TabpanelLayout";

export interface LinksProps {}

export const Links: FC<LinksProps> = ({}) => {
  console.log("Logic Placeholder");

  return (
    <TabpanelLayout>
      <h2>More Info</h2>

      <p>Want to learn more about react-routing-tabs?</p>

      <p>On NPM:</p>

      <p>On GitHub:</p>

      <p>More about the author</p>
    </TabpanelLayout>
  );
};
