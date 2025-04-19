import React from "react";
import { useUselessKonamiCode } from "./useUselessKonamiCode";

export default function UselessKonamiCode() {
  const hasNoLife = useUselessKonamiCode();

  return hasNoLife ? (
    <div>
      <p>30 Lives</p>
    </div>
  ) : null;
}
