import React, { type FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DemoTabs } from "./DemoTabs";
import { Intro } from "./Tabpanels/Intro";
import { Tab2 } from "./Tabpanels/Tab2";

export interface RrtProps {}

export const RrtDemo: FC<RrtProps> = ({}) => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <DemoTabs />,
        children: [
          {
            path: "/intro",
            element: <Intro />,
          },
          {
            path: "/tab-2",
            element: <Tab2 />,
          },
        ],
      },
    ],
    { basename: "/react-routing-tabs" }
  );

  return <RouterProvider router={router} />;
};
