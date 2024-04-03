import { useMemo } from "react";

const anglesByBreakpoint: Record<string, [number, number, number]> = {
  base: [0, 0, 0],
  sm: [14, 35, 65],
  md: [12, 32, 63],
  lg: [12, 28, 58],
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
