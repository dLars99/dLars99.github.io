import React, { type FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DemoTabs } from "./DemoTabs";
import { Tab1 } from "./Tabpanels/Tab1";
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
            path: "/tab-1",
            element: <Tab1 />,
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
