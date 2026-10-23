import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import Barkeep from "./Barkeep.astro";
import GearPatch from "./GearPatch.astro";
import Greener from "./Greener.astro";
import Jsbasic from "./Jsbasic.astro";
import Portfolio from "./Portfolio.astro";
import Rrt from "./Rrt.astro";

export const demoMap: Record<string, AstroComponentFactory> = {
  barkeep: Barkeep,
  gearpatch: GearPatch,
  greener: Greener,
  jsbasic: Jsbasic,
  portfolio: Portfolio,
  rrt: Rrt,
};
