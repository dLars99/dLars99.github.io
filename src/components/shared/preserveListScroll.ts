// Keep a list's scroll position when opening or closing its detail drawer
export function preserveListScroll(basePath: string) {
  let savedScroll: number | null = null;
  const inSection = (url: URL) => url.pathname.startsWith(basePath);

  document.addEventListener("astro:before-swap", (event) => {
    const { from, to, navigationType } = event;
    savedScroll =
      navigationType !== "traverse" && inSection(from) && inSection(to)
        ? window.scrollY
        : null;
  });

  document.addEventListener("astro:after-swap", () => {
    if (savedScroll !== null) {
      window.scrollTo({ top: savedScroll, behavior: "instant" });
    }
  });
}
