import React, { type FC } from "react";
import { Tabpanel } from "react-routing-tabs";

export interface Tab2Props {}

export const Tab2: FC<Tab2Props> = ({}) => {
  console.log("Logic Placeholder");

  return (
    <Tabpanel>
      <h1>Goodbye World</h1>
    </Tabpanel>
  );
};
