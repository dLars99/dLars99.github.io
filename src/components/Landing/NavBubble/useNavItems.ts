import { useMemo } from "react";

const anglesByBreakpoint: Record<string, [number, number, number]> = {
  sm: [0, 0, 0],
  md: [14, 35, 65],
  lg: [12, 32, 63],
  xl: [12, 28, 58],
  "2xl": [10, 25, 55],
};

export const useNavItems = (breakpoint: string) =>
  useMemo(() => {
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
