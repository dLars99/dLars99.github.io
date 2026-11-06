import { navigate } from "astro:transitions/client";

export const isLogPage = () =>
  window.location.pathname.replace(/\/$/, "") === "/log";

// Go back to the previous in-site page (router restores its scroll), else home
export function closeLog() {
  if (history.state?.index > 0) {
    history.back();
  } else {
    navigate("/");
  }
}
