import { useBreakpoint as useBreakpointHelper } from "use-breakpoint";
const defaultConfig = {
  sm: 0,
  md: 640,
  lg: 768,
  xl: 1024,
  "2xl": 1280,
};

export const useBreakpoint = (
  config: Record<string, number> = defaultConfig
) => {
  const { breakpoint } = useBreakpointHelper(config, "sm");

  return breakpoint;
};
