import { useMemo } from "react";

const anglesByBreakpoint: Record<string, [number, number, number]> = {
  sm: [0, 0, 0],
  md: [15, 40, 67],
  lg: [15, 40, 68],
  xl: [15, 40, 70],
  "2xl": [11, 28, 60],
};

export const useNavItems = (breakpoint: string) =>
  useMemo(() => {
    console.log({ breakpoint });
    const angles = anglesByBreakpoint[breakpoint] || anglesByBreakpoint["lg"];

    return [
      {
        name: "about",
        angle: angles[0],
      },
      {
        name: "work",
        angle: angles[1],
      },
      {
        name: "projects",
        angle: angles[2],
      },
    ];
  }, [breakpoint]);
