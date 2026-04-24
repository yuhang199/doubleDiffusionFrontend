"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── brand logos ─── */
const BRAND_LOGOS = [
  { src: "/logos/trek.png", alt: "Trek" },
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
  "/videos/reel-04.mp4",
  "/videos/reel-01.mp4",
  "/videos/reel-06.mp4",
  "/videos/reel-03.mp4",
  "/videos/reel-02.mp4",
];

const SERVICES = [
  {
    title: "Creative\nDesign",
    items: [
      "Ad Creative",
      "Social Media Creative",
      "Presentation Design",
      "Illustration Design",
      "Branding Services",
      "eBooks & Report Design",
      "Concept Creation",
      "Print Design",
      "Packaging & Merchandise",
    ],
  },
  {
    title: "Specialized\nProduction",
    items: [
      "Video Production",
      "Motion Design",
      "Email Creation",
      "Web Design",
      "Design Systems",
      "Product Design",
      "Copywriting",
    ],
  },
  {
    title: "AI\nServices",
    items: [
      "AI-Powered Creative",
      "AI Consulting",
      "Automation",
      "Data Services",
      "Marketing Services",
      "Campaign Strategy",
    ],
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "Deep-dive into your brand, audience, and objectives. We map the creative territory and identify where AI amplifies your vision.",
  },
  {
    num: "02",
    title: "Conceive",
    desc: "Humans and machines collaborate to generate concepts, storyboards, and prototypes at unprecedented speed. Hundreds of directions, refined to the one.",
  },
  {
    num: "03",
    title: "Produce",
    desc: "From Seedance-powered cinematics to hand-crafted motion design — highest fidelity output from our proprietary AI-native pipeline.",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "Polished, optimized, platform-ready. Human quality control at every gate. No compromises on the final frame.",
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

/* ─── Brand Marquee ─── */
function BrandMarquee() {
  const logos = [...BRAND_LOGOS, ...BRAND_LOGOS];
  return (
    <div className="reel-strip reel-strip--inline">
      <div className="reel-track">
        {logos.map((l, i) => (
          <span key={i} style={{ display: "contents" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="reel-logo" src={l.src} alt={l.alt} />
            <span className="reel-sep">✦</span>
          </span>
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
    if (videosRef.current[prev]) videosRef.current[prev].pause();
    currentRef.current = index;
    setCurrent(index);
    const v = videosRef.current[index];
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const v = videosRef.current[0];
    if (v) {
      v.play().catch(() => {});
    }
    // Preload all
    setTimeout(() => {
      videosRef.current.forEach((vid, i) => {
        if (vid && i !== 0) {
          vid.currentTime = 0;
          const p = vid.play();
          if (p)
            p.then(() => {
              vid.pause();
              vid.currentTime = 0;
            }).catch(() => {});
        }
      });
    }, 2000);
  }, []);

  // Watch for end
  useEffect(() => {
    let raf;
    const check = () => {
      const idx = currentRef.current;
      const v = videosRef.current[idx];
      if (v && v.duration && v.currentTime >= v.duration - 0.5) {
        goToSlide((idx + 1) % VIDEOS.length);
      } else if (v && v.duration && v.currentTime >= v.duration - 2) {
        const nextIdx = (idx + 1) % VIDEOS.length;
        const nv = videosRef.current[nextIdx];
        if (nv && nv.paused) {
          nv.currentTime = 0;
          nv.play().catch(() => {});
          setTimeout(() => {
            if (nextIdx !== currentRef.current) {
              nv.pause();
              nv.currentTime = 0;
            }
          }, 200);
        }
      }
      raf = requestAnimationFrame(check);
    };
    raf = requestAnimationFrame(check);
    return () => cancelAnimationFrame(raf);
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
        if (entries[0].isIntersecting) el.classList.add("visible");
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
            {["work", "services", "about", "process"].map((s) => (
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
          <a
            href="#contact"
            className="nav-cta"
            onClick={(e) => scrollTo(e, "contact")}
          >
            Get in Touch
          </a>
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

      {/* Services */}
      <section className="section services" id="services">
        <Reveal className="section-header">
          <h2 className="section-title">Services</h2>
          <p className="section-sub">
            Full-spectrum creative. Supercharged by AI.
          </p>
        </Reveal>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={i} className="service-block" delay={i * 0.1}>
              <div className="service-block-header">
                <h3
                  className="sb-title"
                  dangerouslySetInnerHTML={{
                    __html: s.title.replace("\n", "<br>"),
                  }}
                />
              </div>
              <ul className="service-items">
                {s.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="section about" id="about">
        <div className="section-visual">
          <BrandMarquee />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/work-01.png"
            alt=""
            className="section-visual-img"
          />
        </div>
        <div className="about-inner">
          <Reveal className="section-header">
            <h2 className="section-title">About</h2>
          </Reveal>
          <div className="about-content">
            <Reveal>
              <h3 className="about-headline">
                We don&apos;t just use AI.
                <br />
                <span className="outline-text">We think in it.</span>
              </h3>
            </Reveal>
            <div className="about-columns">
              <Reveal className="about-col">
                <p>
                  Double Diffusion is a creative studio built for the age of
                  generative intelligence. We operate at the frontier where
                  neural networks meet narrative — where prompts become
                  productions and algorithms become art directors.
                </p>
              </Reveal>
              <Reveal className="about-col">
                <p>
                  Every frame we produce, every campaign we launch, every brand
                  we build is infused with machine intelligence — not as a
                  gimmick, but as a fundamental creative partner. This is not the
                  future. This is now.
                </p>
              </Reveal>
            </div>
          </div>
          <Reveal className="about-metrics">
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
                <Counter target={100} suffix="%" />
              </div>
              <div className="metric-label">
                AI-Native
                <br />
                Pipeline
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="section process" id="process">
        <div className="section-visual section-visual--duo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/work-03.png"
            alt=""
            className="section-visual-img"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/work-04.png"
            alt=""
            className="section-visual-img"
          />
        </div>
        <Reveal className="section-header">
          <h2 className="section-title">Process</h2>
          <p className="section-sub">
            From brief to final frame — our AI-native pipeline.
          </p>
        </Reveal>
        <div className="process-timeline">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={i} className="process-step" delay={i * 0.08}>
              <div className="ps-marker">
                <span className="ps-num">{s.num}</span>
              </div>
              <div className="ps-body">
                <h3 className="ps-title">{s.title}</h3>
                <p className="ps-desc">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="section contact" id="contact">
        <div className="section-visual">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/work-05.png"
            alt=""
            className="section-visual-img"
          />
        </div>
        <div className="contact-inner">
          <Reveal>
            <h2 className="contact-headline">
              <span className="contact-line">Let&apos;s build</span>
              <span className="contact-line">
                <em>something</em>
              </span>
              <span className="contact-line">extraordinary.</span>
            </h2>
          </Reveal>
          <Reveal className="contact-actions">
            <a
              href="mailto:doublediffusionstudios@gmail.com"
              className="contact-btn"
            >
              <span className="btn-text">
                doublediffusionstudios@gmail.com
              </span>
              <span className="btn-icon">↗</span>
            </a>
          </Reveal>
          <Reveal className="contact-links">
            <a href="#" className="cl-link">Instagram</a>
            <a href="#" className="cl-link">Twitter / X</a>
            <a href="#" className="cl-link">LinkedIn</a>
            <a href="#" className="cl-link">YouTube</a>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-name">Double Diffusion®</span>
            <span className="footer-sub">AI-Native Creative Studio</span>
          </div>
          <div className="footer-copy">© 2025 All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
