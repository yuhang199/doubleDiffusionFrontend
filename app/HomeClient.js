"use client";
import Image from "next/image";

import { useEffect, useRef, useState, useCallback } from "react";
import { SOLUTIONS } from "./lib/services";
import { REELS } from "./lib/reels";
import ReelPlayer from "./components/ReelPlayer";
import SiteFooter from "./components/SiteFooter";

const NAV_LINKS = [
  { id: "work", label: "Work", href: "/work" },
  { id: "services", label: "AI/VFX Solutions" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const VIDEOS = [
  { src: "/videos/sample-01.mp4", poster: "/videos/posters/sample-01.jpg" },
  { src: "/videos/biker.mp4", poster: "/videos/posters/biker.jpg" },
  { src: "/videos/blue-dress.mp4", poster: "/videos/posters/blue-dress.jpg" },
  { src: "/videos/tomato.mp4", poster: "/videos/posters/tomato.jpg" },
  { src: "/videos/field.mp4", poster: "/videos/posters/field.jpg" },
  { src: "/videos/coffee.mp4", poster: "/videos/posters/coffee.jpg" },
  { src: "/videos/reel-new-06.mp4", poster: "/videos/posters/reel-new-06.jpg" },
];


/* ─── Hero tagline ─── */
const TAGLINE_POINTS = [
  "Cutting-edge AI/hybrid workflows with customizable models",
  "Professional VFX/AI and full post-production support",
  <>
    AI-powered production for ads, narratives, music videos, and{" "}
    <a href="#work" className="hero-tagline-link">more →</a>
  </>,
];

// The points open on hover (CSS) on desktop, and on tap via `open` for touch.
function HeroTagline() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`hero-tagline${open ? " open" : ""}`}>
      <button
        type="button"
        className="hero-headline-sub hero-tagline-toggle"
        aria-expanded={open}
        aria-controls="hero-tagline-points"
        onClick={() => setOpen((v) => !v)}
      >
        We provide AI/VFX solutions for professional productions.
        <span className="hero-tagline-chevron" aria-hidden="true">
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 4 20 16 36 4" />
          </svg>
        </span>
      </button>
      <div className="hero-tagline-points" id="hero-tagline-points">
        <span className="hero-tagline-rule" aria-hidden="true" />
        <ul>
          {TAGLINE_POINTS.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── Hero Carousel ─── */
function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const videosRef = useRef([]);
  const currentRef = useRef(0);

  const goToSlide = useCallback((index) => {
    const prev = currentRef.current;
    if (index === prev) return;
    currentRef.current = index;
    setCurrent(index);
    // Pause immediately to prevent looping back to frame 0
    if (videosRef.current[prev]) {
      videosRef.current[prev].pause();
    }
  }, []);

  useEffect(() => {
    const v = videosRef.current[0];
    if (v) {
      v.play().catch(() => { });
    }
    // Warm only the next slide once the first one is under way. Decoding all
    // eight here would pull the entire carousel (~217 MB) on every visit; the
    // rest are fetched just in time by the handoff effect below.
    const warm = setTimeout(() => {
      const next = videosRef.current[1];
      if (next) {
        next.preload = "metadata";
        next.load();
      }
    }, 2000);
    return () => clearTimeout(warm);
  }, []);

  // Pre-start next video and switch BEFORE current ends
  useEffect(() => {
    const handlers = [];
    videosRef.current.forEach((vid, i) => {
      if (!vid) return;
      let switching = false;
      let raf = null;
      // Switch 500ms before end to prevent first-frame flash
      const pollEnd = () => {
        if (switching) return;
        if (vid.duration && vid.currentTime >= vid.duration - 0.5) {
          switching = true;
          vid.pause(); // freeze on current frame immediately
          goToSlide((i + 1) % VIDEOS.length);
          return;
        }
        raf = requestAnimationFrame(pollEnd);
      };
      const onTimeUpdate = () => {
        if (vid.duration && vid.currentTime >= vid.duration - 1.5) {
          const nextIdx = (i + 1) % VIDEOS.length;
          const nv = videosRef.current[nextIdx];
          // Start next video playing hidden. It may still be at preload="none",
          // so lift that before asking it to play.
          if (nv && nv.paused && nextIdx !== currentRef.current) {
            if (nv.preload !== "auto") nv.preload = "auto";
            nv.currentTime = 0;
            nv.play().catch(() => { });
          }
          // Start tight polling
          if (!raf && !switching) {
            raf = requestAnimationFrame(pollEnd);
          }
        }
      };
      const onEnded = () => {
        // Fallback — pause immediately to prevent looping to frame 0
        vid.pause();
        if (!switching) {
          switching = true;
          goToSlide((i + 1) % VIDEOS.length);
        }
      };
      // Reset switching flag when this video starts playing again
      const onPlay = () => {
        switching = false;
        raf = null;
      };
      vid.addEventListener('timeupdate', onTimeUpdate);
      vid.addEventListener('ended', onEnded);
      vid.addEventListener('play', onPlay);
      handlers.push({ vid, onTimeUpdate, onEnded, onPlay });
    });
    return () => {
      handlers.forEach(({ vid, onTimeUpdate, onEnded, onPlay }) => {
        vid.removeEventListener('timeupdate', onTimeUpdate);
        vid.removeEventListener('ended', onEnded);
        vid.removeEventListener('play', onPlay);
      });
    };
  }, [goToSlide]);

  return (
    <section className="hero" id="hero">
      <div className="hero-slides" id="heroSlides">
        {VIDEOS.map(({ src, poster }, i) => (
          <div
            key={i}
            className={`hero-slide${i === current ? " active" : ""}`}
            data-index={i}
          >
            <video
              className="slide-video"
              muted
              playsInline
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              poster={poster}
              /* Only the first slide is fetched up front. The rest stay at
                 "none" until the carousel warms them, so the landing page no
                 longer opens eight concurrent video downloads. */
              preload={i === 0 ? "auto" : "none"}
              ref={(el) => {
                videosRef.current[i] = el;
              }}
            >
              <source src={src} type="video/mp4" />
            </video>
            <div className="slide-overlay" />
          </div>
        ))}
      </div>
      <div className="hero-content">
        <h1 className="hero-headline">
          <span className="hero-headline-main">Double Diffusion Studios</span>
        </h1>
        <HeroTagline />
      </div>
    </section>
  );
}

/* ─── Reveal wrapper ─── */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal");
    if (delay) el.style.transitionDelay = `${delay}s`;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add("visible");
        } else {
          el.classList.remove("visible");
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [curtainDone, setCurtainDone] = useState(false);
  const [curtainHiding, setCurtainHiding] = useState(false);
  const [openSolution, setOpenSolution] = useState(null);

  // Intro curtain timer
  useEffect(() => {
    // Lock scroll while curtain is visible
    document.body.style.overflow = "hidden";
    const showTimer = setTimeout(() => {
      setCurtainHiding(true);
    }, 1000);
    const removeTimer = setTimeout(() => {
      setCurtainDone(true);
      document.body.style.overflow = "";
    }, 2000);
    // Leaving before the intro finishes freezes this page into the back/forward
    // cache mid-curtain; restoring it does not re-run these timers, so the
    // curtain and the scroll lock would stay put.
    const onPageShow = (e) => {
      if (!e.persisted) return;
      setCurtainHiding(true);
      setCurtainDone(true);
      document.body.style.overflow = "";
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(removeTimer);
      window.removeEventListener("pageshow", onPageShow);
      document.body.style.overflow = "";
    };
  }, []);

  // Cursor
  useEffect(() => {
    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;
    // Record only — writing styles straight from the event fires a style
    // recalc per mousemove (120+/s on a trackpad). Both elements are written
    // once per frame in the loop below instead.
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    let raf = null;
    const loop = () => {
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      tx += (mx - tx) * 0.1;
      ty += (my - ty) * 0.1;
      if (trailRef.current)
        trailRef.current.style.transform = `translate3d(${tx - 22}px, ${ty - 22}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener("mousemove", onMove);
      // The loop re-queued itself forever; without this it outlives the page.
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    setMenuOpen((v) => {
      document.body.style.overflow = !v ? "hidden" : "";
      return !v;
    });
  };

  return (
    <>
      {/* Intro Curtain */}
      {!curtainDone && (
        <div className={`intro-curtain${curtainHiding ? " intro-curtain--hide" : ""}`}>
          <div className="intro-curtain-content">
            <h2 className="intro-curtain-headline">Cinema Built To Convert</h2>
            <p className="intro-curtain-sub">By Double Diffusion AI</p>
          </div>
        </div>
      )}

      {/* Cursor */}
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-trail" ref={trailRef} />

      {/* Nav */}
      <nav className={`nav${navScrolled ? " scrolled" : ""}`} id="nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo" onClick={(e) => scrollTo(e, "hero")}>
            <span className="logo-top">DOUBLE</span>
            <span className="logo-line" />
            <span className="logo-bot">DIFFUSION</span>
          </a>
          <div className="nav-center">
            {NAV_LINKS.map(({ id, label, href }) => (
              <a
                key={id}
                href={href ?? `#${id}`}
                className="nav-link"
                onClick={href ? undefined : (e) => scrollTo(e, id)}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="nav-ctas">
            <div className="nav-socials">
              <a href="https://www.instagram.com/doublediffusionstudios" target="_blank" rel="noopener noreferrer" className="nav-social" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/double-diffusion-studios" target="_blank" rel="noopener noreferrer" className="nav-social" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
          <button
            className={`nav-burger${menuOpen ? " open" : ""}`}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-overlay${menuOpen ? " open" : ""}`}>
        <div className="mobile-nav">
          {NAV_LINKS.map(({ id, label, href }) => (
            <a
              key={id}
              href={href ?? `#${id}`}
              className="mobile-link"
              onClick={href ? undefined : (e) => scrollTo(e, id)}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="mobile-footer">creative@doublediffusion.co</div>
      </div>

      {/* Hero */}
      <HeroCarousel />



      {/* Work */}
      <section className="section work">
        <div id="work" />
        <Reveal className="section-header work-header">
          <div className="work-title-row">
            <h2 className="section-title">Our Work</h2>
            <a href="/work" className="sa-explore work-see-all">See All →</a>
          </div>
          <p className="section-sub">
            Our AI/VFX/hybrid workflows reduce cost and improve efficiency.
          </p>
        </Reveal>
        <Reveal className="work-reels">
          <ReelPlayer reel={REELS.pureAi} />
          <ReelPlayer reel={REELS.hybrid} />
        </Reveal>
        <Reveal className="work-more">
          <a href="/work" className="sa-explore">View All Work →</a>
        </Reveal>
      </section>

      {/* Services */}
      <section className="section services">
        <div id="services" />
        <Reveal className="section-header sol-header">
          <h2 className="section-title">AI/Hybrid Solutions</h2>
          <p className="section-sub">
            Advanced AI/hybrid solutions that meet industry standards.
          </p>
        </Reveal>
        {/* Two-column list of solutions; the selected one opens in the panel
            below. Every panel stays in the DOM so all copy is crawlable. */}
        <Reveal className="sol-list">
          {SOLUTIONS.map((s, i) => {
            const isOpen = openSolution === i;
            return (
              <button
                key={s.title}
                type="button"
                className={`sol-item${isOpen ? " sol-item--open" : ""}`}
                aria-expanded={isOpen}
                aria-controls={`sol-panel-${i}`}
                onClick={() => setOpenSolution(isOpen ? null : i)}
              >
                <span className="sol-item-title">{s.title}</span>
                <span className="sol-item-sign" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
            );
          })}
        </Reveal>
        <div className="sol-panels">
          {SOLUTIONS.map((s, i) => (
            <div
              key={s.title}
              id={`sol-panel-${i}`}
              className="sol-panel"
              hidden={openSolution !== i}
            >
              <h3 className="sol-panel-title">{s.title}</h3>
              {s.paragraphs.map((p, pi) => (
                <p key={pi} className="sol-panel-text">{p}</p>
              ))}
              {s.href && (
                <a href={s.href} className="sa-explore">
                  Explore →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="section about">
        <div className="section-visual">
          <Image src="/images/work-01.jpg" alt="" className="section-visual-img" fill sizes="100vw" />
        </div>
        <div className="about-inner" id="about">
          <Reveal className="section-header">
            <h2 className="section-title">About Us</h2>
          </Reveal>
          <div className="about-intro">
            <Reveal delay={0.1}>
              <h3 className="about-headline">Who We Are</h3>
            </Reveal>
            <Reveal className="about-intro-body" delay={0.2}>
              <p className="about-text about-text--hero">
                We&apos;re a Los Angeles-based production studio.
              </p>
              <p className="about-text about-text--hero">
                Our team spans directors, screenwriters, VFX artists, and AI researchers.
              </p>
            </Reveal>
          </div>

          <Reveal className="spaces-showcase">
            <h3 className="spaces-headline">Our Spaces</h3>
            <div className="spaces-grid">
              <div className="space-card">
                <div className="space-img-wrap">
                  <Image src="/images/studio.jpg" alt="Double Diffusion LA Studio" className="space-img" fill sizes="(max-width: 900px) 100vw, 50vw" />
                </div>
                <div className="space-info">
                  <span className="space-badge">2,400 SQFT</span>
                  <span className="space-name">Partner Production Studio<br />Los Angeles</span>
                  <span className="space-desc">Equipped with full lighting rigs, sound stage, and dedicated AI render stations for real-time post-production.</span>
                </div>
              </div>
              <div className="space-card">
                <div className="space-img-wrap">
                  <Image src="/images/warehouse.jpg" alt="Double Diffusion Houston Warehouse" className="space-img" fill sizes="(max-width: 900px) 100vw, 50vw" />
                </div>
                <div className="space-info">
                  <span className="space-badge">5,000 SQFT</span>
                  <span className="space-name">Creative Warehouse<br />Houston</span>
                  <span className="space-desc">Large-format set builds, prop storage, and multi-zone shooting stages for end-to-end in-house production.</span>
                </div>
              </div>
              <div className="space-card">
                <div className="space-img-wrap">
                  <Image src="/images/gallery-reel-new-03.jpg" alt="Double Diffusion in-house AI/VFX platform" className="space-img" fill sizes="(max-width: 900px) 100vw, 50vw" />
                </div>
                <div className="space-info">
                  <span className="space-badge">1,000+ Hours</span>
                  <span className="space-name">In-house AI/VFX Platform</span>
                  <span className="space-desc">Unique in-house AI/VFX platform with customizable models. Built, tested, and used for more than 1,000 hours.</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* Get in Touch */}
      <section className="section contact">
        <div className="section-visual">
          <Image src="/images/work-05.jpg" alt="" className="section-visual-img" fill sizes="100vw" />
        </div>
        <div className="contact-inner" id="contact">
          <Reveal>
            <h2 className="contact-headline">
              <span className="contact-line">Get in Touch</span>
            </h2>
          </Reveal>
          <Reveal className="contact-emails">
            <div className="email-item">
              <span className="email-label">Production Partnerships</span>
              <a href="mailto:creative@doublediffusion.co" className="email-link">creative@doublediffusion.co</a>
            </div>
            <div className="email-item">
              <span className="email-label">General Inquiries &amp; Press</span>
              <a href="mailto:manager@doublediffusion.co" className="email-link">manager@doublediffusion.co</a>
            </div>
          </Reveal>
          <Reveal className="socials-inner">
            <h3 className="socials-headline">Follow Us</h3>
            <div className="socials-row">
              <a href="https://www.instagram.com/doublediffusionstudios" target="_blank" rel="noopener noreferrer" className="social-card">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                <span className="social-card-name">Instagram</span>
                <span className="social-card-handle">@doublediffusionstudios</span>
              </a>
              <a href="https://www.linkedin.com/company/double-diffusion-studios" target="_blank" rel="noopener noreferrer" className="social-card">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <span className="social-card-name">LinkedIn</span>
                <span className="social-card-handle">Double Diffusion Studios</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </>
  );
}
