import { useEffect, useRef, useState, type FC } from "react";
import styles from "./AuditLogMobile.module.css";

export interface AuditLogEntry {
  version: string;
  message: string;
}

interface Props {
  entries: AuditLogEntry[];
}

const ROTATE_INTERVAL_MS = 4000;

const AuditLogMobile: FC<Props> = ({ entries }) => {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (entries.length <= 1) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setTickerIndex((index) => (index + 1) % entries.length);
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [entries.length]);

  useEffect(() => {
    if (!isOpen) return;

    const sheet = sheetRef.current;
    const focusable = sheet?.querySelectorAll<HTMLElement>("a[href], button");
    focusable?.[0]?.focus();

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) triggerRef.current?.focus();
  }, [isOpen]);

  const current = entries[tickerIndex];

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.ticker}
        aria-expanded={isOpen}
        aria-controls="audit-log-sheet"
        aria-label="Open audit log"
        onClick={() => setIsOpen(true)}
      >
        <span className={styles.tickerVersion}>{current?.version}</span>
        <span className={styles.tickerMessage}>{current?.message}</span>
        <span aria-hidden="true">▶</span>
      </button>

      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
          <div
            id="audit-log-sheet"
            ref={sheetRef}
            className={styles.sheet}
            role="dialog"
            aria-modal="true"
            aria-label="Audit log"
          >
            {entries.map((entry) => (
              <div className={styles.entry} key={entry.version}>
                <span className={styles.entryVersion}>{entry.version}</span>
                {entry.message}
              </div>
            ))}
            <a className={styles.exploreLink} href="/work">
              [EXPLORE FULL LOG -&gt;]
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default AuditLogMobile;
