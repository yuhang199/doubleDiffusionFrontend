"use client";
import { useEffect } from "react";

/**
 * Lightweight scroll-reveal observer.
 * Wraps IntersectionObserver to add the `.revealed` class
 * when any `.reveal` element enters the viewport.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Animate section-visual containers
    document.querySelectorAll(".section-visual").forEach((el) => {
      el.classList.add("section-visual--animate");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null; // render-less component — only side-effect
}
