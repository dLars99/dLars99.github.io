import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import Barkeep from "./Barkeep.astro";
import GearPatch from "./GearPatch.astro";
import Greener from "./Greener.astro";
import Jsbasic from "./Jsbasic.astro";
import MinneMe from "./MinneMe.astro";
import Portfolio from "./Portfolio.astro";
import Rrt from "./Rrt.astro";
import TimeCrunch from "./TimeCrunch.astro";

export const demoMap: Record<string, AstroComponentFactory> = {
  barkeep: Barkeep,
  gearpatch: GearPatch,
  greener: Greener,
  jsbasic: Jsbasic,
  "minne-me": MinneMe,
  portfolio: Portfolio,
  rrt: Rrt,
  timecrunch: TimeCrunch,
};
