import { useCallback, useEffect } from "react";

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
  "b",
  "a",
  "Enter",
];

export const useUselessKonamiCode = () => {
  useEffect(() => {
    let konamiCodeKeystroke = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      console.log("keydown");
      if (event.key === konamiCode[konamiCodeKeystroke]) {
        konamiCodeKeystroke++;
        if (konamiCodeKeystroke === konamiCode.length) {
          alert("Useless Konami Code activated!");
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
};
