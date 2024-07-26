import React, { type FC } from "react";
import { Tabpanel } from "react-routing-tabs";

export interface Tab1Props {}

export const Tab1: FC<Tab1Props> = ({}) => {
  console.log("Logic Placeholder");

  return (
    <Tabpanel>
      <h1>Hello World</h1>
    </Tabpanel>
  );
};
