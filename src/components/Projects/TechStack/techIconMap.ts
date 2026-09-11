import { SiReact } from "@react-icons/all-files/si/SiReact";
import { SiTypescript } from "@react-icons/all-files/si/SiTypescript";
import { SiPostgresql } from "@react-icons/all-files/si/SiPostgresql";
import { SiCsharp } from "@react-icons/all-files/si/SiCsharp";
import { SiDotNet } from "@react-icons/all-files/si/SiDotNet";
import { SiJavascript } from "@react-icons/all-files/si/SiJavascript";
import { SiCss3 } from "@react-icons/all-files/si/SiCss3";

export type TechIcon = typeof SiReact;

export const techIconMap: Record<string, TechIcon> = {
  react: SiReact,
  typescript: SiTypescript,
  postgresql: SiPostgresql,
  "c#": SiCsharp,
  ".net": SiDotNet,
  javascript: SiJavascript,
  css: SiCss3,
};

export function getTechIcon(tech: string): TechIcon | undefined {
  return techIconMap[tech.toLowerCase()];
}
