"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── brand logos ─── */
const BRAND_LOGOS = [
  { src: "/logos/doublediffusion.png", alt: "Double Diffusion" },
  { src: "/logos/liquiddeath.png", alt: "Liquid Death" },
  { src: "/logos/patagonia.png", alt: "Patagonia" },
  { src: "https://cdn.simpleicons.org/nike/ffffff", alt: "Nike" },
  { src: "/logos/oatly.png", alt: "Oatly" },
  { src: "https://cdn.simpleicons.org/yeti/ffffff", alt: "Yeti" },
  { src: "/logos/allbirds.png", alt: "Allbirds" },
  { src: "/logos/glossier.png", alt: "Glossier" },
  { src: "/logos/stanley.png", alt: "Stanley" },
  {
    src: "https://cdn.simpleicons.org/thenorthface/ffffff",
    alt: "North Face",
  },
];

const VIDEOS = [
  "/videos/snowboard.mp4",
  "/videos/sample-01.mp4",
  "/videos/biker.mp4",
  "/videos/blue-dress.mp4",
  "/videos/tomato.mp4",
  "/videos/field.mp4",
  "/videos/coffee.mp4",
  "/videos/reel-new-06.mp4",
];

const SERVICES = [
  {
    title: "Creative Production",
    desc: "End-to-end AI-powered ad and campaign production. From concept to final cut — high-converting video ads, branded content, and campaign visuals delivered at cinematic quality.",
    slug: "creative-production",
    timeline: "1–2 Weeks",
    tags: ["Video Ads", "Campaign Visuals", "Branded Content", "Color Grading", "Storyboarding"],
    img: "/images/service-creative.png",
  },
  {
    title: "Social Content",
    desc: "Scroll-stopping vertical video for Instagram, TikTok, YouTube Shorts, and beyond. AI-powered UGC-style content, product demos, and social-first campaigns at scale.",
    slug: "social-content",
    timeline: "3–5 Days",
    tags: ["Instagram Reels", "TikTok", "YouTube Shorts", "UGC-Style", "Product Demos"],
    img: "/images/service-social.png",
  },
  {
    title: "Music Videos",
    desc: "Visually stunning music videos produced with AI-powered workflows. From concept and storyboarding to final delivery — cinematic visuals at a fraction of traditional production costs.",
    slug: "music-videos",
    timeline: "1–3 Weeks",
    tags: ["Concept Art", "Storyboarding", "VFX", "Color Grading", "Final Delivery"],
    img: "/images/service-music.png",
  },
  {
    title: "Narrative Production",
    desc: "Hybrid live-action and AI production for short films, branded narratives, and feature-length projects. We seamlessly blend traditional filmmaking with cutting-edge generative AI.",
    slug: "narrative-production",
    timeline: "2–6 Weeks",
    tags: ["Short Films", "Branded Narratives", "Live-Action", "Generative AI", "Feature Films"],
    img: "/images/service-narrative.png",
  },
  {
    title: "AI Evaluation",
    desc: "Submit your creative brief and our AI pipeline evaluates every scene for AI-assisted production potential. We identify exactly where generative tools can replace traditional methods — giving you a clear cost breakdown and optimized production roadmap before a single frame is shot.",
    slug: "ai-evaluation",
    timeline: "2–3 Days",
    tags: ["Feasibility Analysis", "Cost Optimization", "Scene Breakdown", "AI Readiness", "Production Roadmap"],
    img: "/images/service-evaluation.png",
  },
];

/* ─── Counter component ─── */
function Counter({ target, suffix }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !counted.current) {
          counted.current = true;
          let cur = 0;
          const step = target / 50;
          const timer = setInterval(() => {
            cur += step;
            if (cur >= target) {
              setValue(target);
              clearInterval(timer);
            } else {
              setValue(Math.floor(cur));
            }
          }, 25);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* ─── Brand Grid ─── */
function BrandMarquee() {
  return (
    <div className="brand-grid-wrap">
      <div className="brand-grid">
        {BRAND_LOGOS.map((l, i) => (
          <div key={i} className="brand-cell">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand-cell-logo" src={l.src} alt={l.alt} />
          </div>
        ))}
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
    // Preload all: decode first frame
    setTimeout(() => {
      videosRef.current.forEach((vid, i) => {
        if (vid && i !== 0) {
          vid.currentTime = 0;
          const p = vid.play();
          if (p)
            p.then(() => {
              setTimeout(() => {
                if (i !== currentRef.current) {
                  vid.pause();
                  vid.currentTime = 0;
                }
              }, 150);
            }).catch(() => { });
        }
      });
    }, 2000);
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
          // Start next video playing hidden
          if (nv && nv.paused && nextIdx !== currentRef.current) {
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
        {VIDEOS.map((src, i) => (
          <div
            key={i}
            className={`hero-slide${i === current ? " active" : ""}`}
            data-index={i}
          >
            <video
              className="slide-video"
              muted
              playsInline
              preload="auto"
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
        <span className="hero-label">AI-Powered Production Studio</span>
        <h1 className="hero-headline">
          <span className="hero-headline-main">Cinema Quality.</span>
          <span className="hero-headline-sub">Startup Budget.</span>
        </h1>
        <p className="hero-sub-text">
          AI-powered production for ads, campaigns, social content,
          music videos, and more — delivered in DAYS, not months.
        </p>
        <a href="/demo" className="hero-cta-btn">
          Book a Demo <span className="btn-icon">→</span>
        </a>
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
  const [openServices, setOpenServices] = useState(new Set([0]));

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
    return () => {
      clearTimeout(showTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  // Cursor
  useEffect(() => {
    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };
    const loop = () => {
      tx += (mx - tx) * 0.1;
      ty += (my - ty) * 0.1;
      if (trailRef.current)
        trailRef.current.style.transform = `translate(${tx - 22}px, ${ty - 22}px)`;
      requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", onMove);
    requestAnimationFrame(loop);
    return () => document.removeEventListener("mousemove", onMove);
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
          <a href="#" className="nav-logo" onClick={(e) => scrollTo(e, "hero")}>
            <span className="logo-top">DOUBLE</span>
            <span className="logo-line" />
            <span className="logo-bot">DIFFUSION</span>
          </a>
          <div className="nav-center">
            {["work", "services", "about", "contact"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="nav-link"
                onClick={(e) => scrollTo(e, s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            ))}
          </div>
          <div className="nav-ctas">
            <a
              href="#contact"
              className="nav-cta"
              onClick={(e) => scrollTo(e, "contact")}
            >
              Get in Touch
            </a>
            <a
              href="/demo"
              className="nav-cta nav-cta--primary"
            >
              Book a Demo
            </a>
            <div className="nav-socials">
              <a href="https://www.instagram.com/doublediffusionstudios" target="_blank" rel="noopener noreferrer" className="nav-social" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@doublediffusionstudios" target="_blank" rel="noopener noreferrer" className="nav-social" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.48a8.27 8.27 0 004.76 1.5V7.56a4.84 4.84 0 01-1-.87z"/></svg>
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
          {["work", "services", "about", "process", "contact"].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="mobile-link"
              onClick={(e) => scrollTo(e, s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          ))}
        </div>
        <div className="mobile-footer">doublediffusionstudios@gmail.com</div>
      </div>

      {/* Hero */}
      <HeroCarousel />



      {/* Work */}
      <section className="section work">
        <div id="work" />
        <Reveal className="section-header work-header">
          <h2 className="section-title">Our Work</h2>
          <p className="section-sub">
            Selected frames from our productions. Industry-leading AI productions, crafted to the highest quality.
          </p>
        </Reveal>
        <div className="gallery-wrap">
          <div className="gallery-row gallery-row--1">
            <div className="gallery-track">
              {[
                "/images/gallery-reel-04.jpg",
                "/images/work-01.png",
                "/images/gallery-reel-new-01.jpg",
                "/images/gallery-reel-new-02.jpg",
                "/images/gallery-reel-new-03.jpg",
                "/images/work-02.png",
                "/images/gallery-reel-04-b.jpg",
                "/images/gallery-reel-04.jpg",
                "/images/work-01.png",
                "/images/gallery-reel-new-01.jpg",
                "/images/gallery-reel-new-02.jpg",
                "/images/gallery-reel-new-03.jpg",
                "/images/work-02.png",
                "/images/gallery-reel-04-b.jpg",
              ].map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt="" className="gallery-img" />
              ))}
            </div>
          </div>
          <div className="gallery-row gallery-row--2">
            <div className="gallery-track gallery-track--reverse">
              {[
                "/images/gallery-reel-new-04.jpg",
                "/images/upgrade-01.png",
                "/images/gallery-reel-new-05.jpg",
                "/images/gallery-reel-new-06.jpg",
                "/images/upgrade-02.png",
                "/images/gallery-reel-new-04-b.jpg",
                "/images/gallery-reel-new-05-b.jpg",
                "/images/gallery-reel-new-04.jpg",
                "/images/upgrade-01.png",
                "/images/gallery-reel-new-05.jpg",
                "/images/gallery-reel-new-06.jpg",
                "/images/upgrade-02.png",
                "/images/gallery-reel-new-04-b.jpg",
                "/images/gallery-reel-new-05-b.jpg",
              ].map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt="" className="gallery-img" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section services">
        <div className="section-visual">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/upgrade-11.png" alt="" className="section-visual-img" />
        </div>
        <div id="services" />
        <Reveal className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-sub">
            Full-spectrum creative production. Supercharged by AI.
          </p>
        </Reveal>
        <div className="services-accordion">
          {SERVICES.map((s, i) => {
            const isOpen = openServices.has(i);
            return (
              <Reveal key={i} delay={i * 0.06}>
                <div className={`sa-item${isOpen ? " sa-item--open" : ""}`}>
                  <button
                    className="sa-header"
                    onClick={() => setOpenServices(prev => {
                      const next = new Set(prev);
                      if (next.has(i)) next.delete(i);
                      else next.add(i);
                      return next;
                    })}
                    aria-expanded={isOpen}
                  >
                    <span className="sa-index">0{i + 1}</span>
                    <h3 className="sa-title">{s.title}</h3>
                    <span className="sa-timeline">{s.timeline}</span>
                    <span className="sa-chevron">{isOpen ? "−" : "+"}</span>
                  </button>
                  <div className="sa-body" style={{ maxHeight: isOpen ? "400px" : "0" }}>
                    <div className="sa-body-inner">
                      <div className="sa-body-content">
                        <p className="sa-desc">{s.desc}</p>
                        <div className="sa-tags">
                          {s.tags.map((tag, ti) => (
                            <span key={ti} className="sa-tag">{tag}</span>
                          ))}
                        </div>
                        <a href={`/services/${s.slug}`} className="sa-explore">
                          Explore →
                        </a>
                      </div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.img} alt={s.title} className="sa-img" />
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Case Study */}
      <section className="section case-study">
        <div className="case-study-inner">
          <Reveal>
            <span className="case-study-label">Case Study — Ad Campaign</span>
          </Reveal>
          <Reveal>
            <div className="case-study-stats">
              <div className="case-study-stat">
                <span className="case-study-before">$80K</span>
                <span className="case-study-arrow">→</span>
                <span className="case-study-after">$15K</span>
              </div>
              <p className="case-study-headline">
                80% production cost reduction through our AI + physical hybrid pipeline.
              </p>
              <p className="case-study-desc">
                By combining on-set cinematography with AI-driven post-production, we delivered a full ad campaign at a fraction of the traditional budget — same cinematic quality, radically lower cost.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section className="section about">
        <BrandMarquee />
        <div className="section-visual">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/work-01.png" alt="" className="section-visual-img" />
        </div>
        <div className="about-inner" id="about">
          <Reveal className="section-header">
            <h2 className="section-title">About Us</h2>
          </Reveal>
          <div className="about-row">
            <div className="about-content card">
              <Reveal delay={0.1}>
                <h3 className="about-headline">Who We Are</h3>
              </Reveal>

              <Reveal className="about-subsection" delay={0.2}>
                <p className="about-text about-text--hero">
                  We&apos;re a Los Angeles-based studio where filmmakers and engineers build together. Our crew spans directors, screenwriters, post-production artists, and AI researchers — all under one roof, all obsessed with the final frame.
                </p>
                <p className="about-text about-text--hero">
                  Our AI + physical hybrid pipeline merges on-set cinematography with generative post-production — slashing production costs by up to 80% while delivering studio-grade quality. From $80K campaigns reduced to $15K, the math speaks for itself.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <a href="/about" className="learn-more-btn">Learn More →</a>
              </Reveal>
            </div>

            <Reveal className="about-metrics card" delay={0.15}>
              <h3 className="about-headline">Performance</h3>
              <div className="metric">
                <div className="metric-value">
                  <Counter target={50} suffix="+" />
                </div>
                <div className="metric-label">
                  Projects
                  <br />
                  Delivered
                </div>
              </div>
              <div className="metric">
                <div className="metric-value">
                  <Counter target={10} suffix="×" />
                </div>
                <div className="metric-label">
                  Faster
                  <br />
                  Production
                </div>
              </div>
              <div className="metric">
                <div className="metric-value">
                  <Counter target={80} suffix="%" />
                </div>
                <div className="metric-label">
                  Cost
                  <br />
                  Savings
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="spaces-showcase">
            <h3 className="spaces-headline">Our Spaces</h3>
            <div className="spaces-grid">
              <div className="space-card">
                <div className="space-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/studio.png" alt="Double Diffusion LA Studio" className="space-img" />
                </div>
                <div className="space-info">
                  <span className="space-badge">2,400 SQFT</span>
                  <span className="space-name">Partner Production Studio<br />Los Angeles</span>
                  <span className="space-desc">Equipped with full lighting rigs, sound stage, and dedicated AI render stations for real-time post-production.</span>
                </div>
              </div>
              <div className="space-card">
                <div className="space-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/warehouse.png" alt="Double Diffusion Houston Warehouse" className="space-img" />
                </div>
                <div className="space-info">
                  <span className="space-badge">5,000 SQFT</span>
                  <span className="space-name">Creative Warehouse<br />Houston</span>
                  <span className="space-desc">Large-format set builds, prop storage, and multi-zone shooting stages for end-to-end in-house production.</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* Get in Touch */}
      <section className="section contact">
        <div className="section-visual">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/work-05.png" alt="" className="section-visual-img" />
        </div>
        <div className="contact-inner" id="contact">
          <Reveal>
            <h2 className="contact-headline">
              <span className="contact-line">Get in Touch</span>
            </h2>
            <p className="contact-subtitle">Tell us about your project and we&apos;ll get back to you with a free estimate within 24 hours.</p>
          </Reveal>
          <div className="contact-split">
            <Reveal className="contact-left">
              <div className="email-item">
                <span className="email-label">New Creative Clients</span>
                <a href="mailto:creative@doublediffusion.co" className="email-link">creative@doublediffusion.co</a>
              </div>
              <div className="email-item">
                <span className="email-label">Technology Partnerships</span>
                <a href="mailto:partnerships@doublediffusion.co" className="email-link">partnerships@doublediffusion.co</a>
              </div>
              <div className="email-item">
                <span className="email-label">General Inquiries &amp; Press</span>
                <a href="mailto:hello@doublediffusion.co" className="email-link">hello@doublediffusion.co</a>
              </div>
            </Reveal>
            <Reveal className="contact-right">
              <form className="contact-form" onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const btn = form.querySelector("button[type=submit]");
                btn.textContent = "Sending...";
                btn.disabled = true;
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: form.elements["cf-name"].value,
                      email: form.elements["cf-email"].value,
                      company: form.elements["cf-company"].value,
                      service: form.elements["cf-service"].value,
                      message: form.elements["cf-message"].value,
                    }),
                  });
                  if (res.ok) {
                    btn.textContent = "Sent ✓";
                    form.reset();
                  } else {
                    btn.textContent = "Failed — Try Again";
                    btn.disabled = false;
                  }
                } catch {
                  btn.textContent = "Failed — Try Again";
                  btn.disabled = false;
                }
              }}>
                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label" htmlFor="cf-name">Full Name</label>
                    <input className="cf-input" id="cf-name" type="text" placeholder="John Smith" required />
                  </div>
                  <div className="cf-field">
                    <label className="cf-label" htmlFor="cf-email">Email</label>
                    <input className="cf-input" id="cf-email" type="email" placeholder="john@company.com" required />
                  </div>
                </div>
                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label" htmlFor="cf-company">Company</label>
                    <input className="cf-input" id="cf-company" type="text" placeholder="Your company" />
                  </div>
                  <div className="cf-field">
                    <label className="cf-label" htmlFor="cf-service">Service Interested In</label>
                    <select className="cf-input cf-select" id="cf-service" defaultValue="">
                      <option value="" disabled>Select a service</option>
                      <option>Creative Production</option>
                      <option>Social Content</option>
                      <option>Music Videos</option>
                      <option>Narrative Production</option>
                      <option>AI Evaluation</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="cf-field">
                  <label className="cf-label" htmlFor="cf-message">Tell us about your project</label>
                  <textarea className="cf-input cf-textarea" id="cf-message" rows={5} placeholder="Brief description of your project, timeline, budget..." required />
                </div>
                <div className="cf-submit-row">
                  <button type="submit" className="contact-cta">Send Message</button>
                  <span className="contact-cta-sub">We generally respond within 24 hours.</span>
                </div>
              </form>
            </Reveal>
          </div>
          <Reveal className="socials-inner">
            <h3 className="socials-headline">Follow Our Journey</h3>
            <div className="socials-row">
              <a href="https://www.instagram.com/doublediffusionstudios" target="_blank" rel="noopener noreferrer" className="social-card">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                <span className="social-card-name">Instagram</span>
                <span className="social-card-handle">@doublediffusionstudios</span>
              </a>
              <a href="https://www.tiktok.com/@doublediffusionstudios" target="_blank" rel="noopener noreferrer" className="social-card">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.48a8.27 8.27 0 004.76 1.5V7.56a4.84 4.84 0 01-1-.87z"/></svg>
                <span className="social-card-name">TikTok</span>
                <span className="social-card-handle">@doublediffusionstudios</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision */}
      <section className="section vision">
        <video
          className="vision-video"
          src="/videos/chad.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="vision-overlay" />
        <div className="vision-inner">
          <Reveal>
            <h2 className="vision-title">The Double Diffusion Vision</h2>
          </Reveal>
          <Reveal>
            <p className="vision-text">
              We believe the future of content lies in the fusion of human creativity and artificial intelligence. Our mission is to build a new production process and mindset that is more agile, accurate, and creatively liberated.
            </p>
            <p className="vision-text">
              By combining cinematic storytelling, AI-driven generation, and engineering rigor, we deliver content that is both efficient and emotionally impactful.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-name">Double Diffusion®</span>
            <span className="footer-sub">AI-Powered Creative Studio</span>
          </div>
          <div className="footer-links">
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <a href="/terms" className="footer-link">Terms of Service</a>
            <a href="/compliance" className="footer-link">Ethical AI & Compliance</a>
            <a href="/support" className="footer-link">Support</a>
          </div>
          <div className="footer-copy">© 2026 Double Diffusion. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
