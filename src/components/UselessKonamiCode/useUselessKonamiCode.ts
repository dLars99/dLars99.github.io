import { useCallback, useEffect, useState } from "react";

const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export const useUselessKonamiCode = () => {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    let konamiCodeKeystroke = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === konamiCode[konamiCodeKeystroke]) {
        konamiCodeKeystroke++;
        if (konamiCodeKeystroke === konamiCode.length) {
          alert("Useless Konami Code activated!");
          setActivated(true);
          konamiCodeKeystroke = 0;
        }
      } else {
        konamiCodeKeystroke = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return activated;
};
