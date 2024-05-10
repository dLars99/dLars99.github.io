import { useCallback, useState } from "react";

export const useDimensions = () => {
  const [dimensions, setDimensions] = useState<[number, number]>([0, 0]);

  const ref = useCallback(<T extends HTMLElement>(node: T) => {
    if (!node) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].target.getBoundingClientRect();
      setDimensions([width, height]);
    });
    resizeObserver.observe(node);
  }, []);

  return { dimensions, ref };
};
