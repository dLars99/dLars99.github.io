import React, { type FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DemoTabs } from "./DemoTabs";
import { Intro } from "./Tabpanels/Intro";
import { HowToUse } from "./Tabpanels/HowToUse";
import { Styling } from "./Tabpanels/Styling";
import { Links } from "./Tabpanels/Links";

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
            path: "/how-to-use",
            element: <HowToUse />,
          },
          {
            path: "/styling",
            element: <Styling />,
          },
          {
            path: "/links",
            element: <Links />,
          },
        ],
      },
    ],
    { basename: "/react-routing-tabs" }
  );

  return <RouterProvider router={router} />;
};
