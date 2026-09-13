"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

/**
 * Global page-transition curtain.
 * Intercepts internal <a> clicks, plays an exit animation,
 * then navigates. On arrival the curtain slides away to reveal content.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const [phase, setPhase] = useState("entering"); // entering | exiting | idle
  const [pendingHref, setPendingHref] = useState(null);

  // ── On new page mount → play the "entering" reveal ──
  useEffect(() => {
    setPhase("entering");
    const timer = setTimeout(() => setPhase("idle"), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  // ── Navigate after exit animation completes ──
  useEffect(() => {
    if (phase === "exiting" && pendingHref) {
      const timer = setTimeout(() => {
        window.location.href = pendingHref;
      }, 500); // matches CSS exit duration
      return () => clearTimeout(timer);
    }
  }, [phase, pendingHref]);

  // ── Intercept internal link clicks ──
  const handleClick = useCallback(
    (e) => {
      // Walk up to find closest <a>
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip hash links, mailto, external, and same-page anchors
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("http") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      // Skip if already on this page
      if (href === pathname) return;

      // It's an internal navigation — intercept
      e.preventDefault();
      setPendingHref(href);
      setPhase("exiting");
    },
    [pathname]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [handleClick]);

  // ── Restore from the back/forward cache ──
  // Navigation is a full page load, so the browser freezes this page while the
  // exit curtain is covering it. Coming back restores that frozen DOM without
  // re-running effects, leaving the curtain stuck over the page. `pageshow`
  // with persisted=true is the only signal for that restore.
  useEffect(() => {
    const onPageShow = (e) => {
      if (!e.persisted) return;
      setPendingHref(null);
      setPhase("idle");
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  if (phase === "idle") return null;

  return (
    <div
      className={`page-transition-curtain ${
        phase === "exiting"
          ? "page-transition--exit"
          : "page-transition--enter"
      }`}
    />
  );
}
