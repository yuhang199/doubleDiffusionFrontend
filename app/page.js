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
    title: "Creative\nProduction",
    desc: "End-to-end AI-powered ad production. From concept to final cut, we create high-converting video ads and visual content at unprecedented speed and cinematic quality.",
    slug: "creative-production",
  },
  {
    title: "AI Brand\nAssets",
    desc: "Custom-trained visual style models exclusive to your brand. Maintain perfect brand consistency across thousands of assets while scaling creative output infinitely.",
    slug: "ai-brand-assets",
  },
  {
    title: "Dynamic Creative\nOptimization",
    desc: "AI-generated ad variants across hundreds of sizes, languages, and contexts. Platform-specific creatives optimized for every channel and audience segment, delivered in hours.",
    slug: "dynamic-creative-optimization",
  },
  {
    title: "Virtual Production\n& Avatars",
    desc: "Hyper-realistic digital humans and AI-generated environments for social media marketing. No studio, no scheduling — cinematic content with AI-driven virtual talent on demand.",
    slug: "virtual-production",
  },
  {
    title: "AI Content\nEngine",
    desc: "Automated pipeline from script to visuals to final edit. Continuous, high-volume ad creative output — eliminating the traditional production bottleneck entirely.",
    slug: "ai-content-engine",
  },
  {
    title: "Ad Testing &\nOptimization",
    desc: "A/B test creative variants at scale. Data-driven performance iteration and rapid creative refresh cycles to maximize ROAS across every campaign.",
    slug: "ad-testing",
  },
  {
    title: "Long-term\nRetainer",
    desc: "Dedicated creative production partnership with priority pipeline access. Monthly retainer model providing consistent, brand-aligned ad content for sustained growth.",
    slug: "retainer",
  },
  {
    title: "Narrative Creative\nProduction",
    desc: "Hybrid live-action and AI production. Technical consulting and creative direction that seamlessly blends traditional filmmaking with cutting-edge generative AI capabilities.",
    slug: "narrative-production",
  },
  {
    title: "Concept\nCreation",
    desc: "Strategic creative ideation powered by AI. From mood boards to storyboards, we generate and refine hundreds of concepts to find the perfect creative direction for your campaign.",
    slug: "concept-creation",
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
            {["work", "about", "services", "contact"].map((s) => (
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

      {/* Slogan */}
      <section className="slogan">
        <Reveal className="slogan-inner">
          <h2 className="slogan-hero">Cinema Built To Convert</h2>
          <p className="slogan-top">By Double Diffusion AI</p>
        </Reveal>
      </section>

      {/* Work */}
      <section className="section work" id="work">
        <Reveal className="section-header work-header">
          <h2 className="section-title">Our Work</h2>
          <p className="section-sub">
            Industry-leading AI productions, crafted to the highest quality. Selected frames from our productions.
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
                "/images/work-03.png",
                "/images/gallery-reel-new-05.jpg",
                "/images/gallery-reel-new-06.jpg",
                "/images/work-04.png",
                "/images/gallery-reel-new-04-b.jpg",
                "/images/gallery-reel-new-05-b.jpg",
                "/images/gallery-reel-new-04.jpg",
                "/images/work-03.png",
                "/images/gallery-reel-new-05.jpg",
                "/images/gallery-reel-new-06.jpg",
                "/images/work-04.png",
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

      {/* About */}
      <section className="section about" id="about">
        <div className="section-visual">
          <BrandMarquee />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/work-01.png" alt="" className="section-visual-img" />
        </div>
        <div className="about-inner">
          <Reveal className="section-header">
            <h2 className="section-title">About Us</h2>
          </Reveal>
          <div className="about-content">
            <Reveal>
              <h3 className="about-headline">Who We Are</h3>
            </Reveal>

            <Reveal className="about-subsection">
              <div className="about-columns">
                <div className="about-col">
                  <p>
                    We are a multidisciplinary AIGC-driven creative studio located in Los Angeles, specializing in advertising and cinematic content production. We operate at the intersection of film production, artificial intelligence, brand building, and visual storytelling.
                  </p>
                  <p>
                    Our team brings together expertise from film directing, screenwriting, post-production, and large-scale software engineering, forming a uniquely integrated production environment.
                  </p>
                </div>
                <div className="about-col">
                  <p>
                    With backgrounds spanning cinema, storytelling, and advanced cloud-based systems, we approach content creation and advertising as both an artistic and technological endeavor. Our studio is built to deliver the highest-quality and innovative visual content for commercial, entertainment, and experimental applications.
                  </p>
                  <p>
                    We specialize in transforming ideas into compelling visual narratives.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <a href="/about" className="learn-more-btn">Learn More →</a>
            </Reveal>

            {/* Performance */}
          </div>
          <Reveal className="about-metrics">
            <h4 className="about-sub-title" style={{ marginBottom: 32 }}>Performance</h4>
            <div className="metrics-row">
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
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="section services" id="services">
        <div className="section-visual section-visual--duo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/work-03.png" alt="" className="section-visual-img" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/work-04.png" alt="" className="section-visual-img" />
        </div>
        <Reveal className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-sub">
            Full-spectrum creative production. Supercharged by AI.
          </p>
        </Reveal>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={i} className="service-block" delay={i * 0.06}>
              <a href={`/services/${s.slug}`} className="service-block-link">
                <div className="service-block-header">
                  <span className="sb-index">0{i + 1}</span>
                  <h3
                    className="sb-title"
                    dangerouslySetInnerHTML={{
                      __html: s.title.replace("\n", "<br>"),
                    }}
                  />
                </div>
                <p className="sb-desc">{s.desc}</p>
                <span className="sb-arrow">→</span>
              </a>
            </Reveal>
          ))}
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
            <p className="contact-subtitle">See what AI-native production can do for your brand.</p>
          </Reveal>
          <Reveal className="contact-emails">
            <div className="email-item">
              <span className="email-label">New Creative Clients</span>
              <a href="mailto:creative@doublediffusion.co" className="email-link">creative@doublediffusion.co</a>
            </div>
            <div className="email-item">
              <span className="email-label">Technology Partnerships</span>
              <a href="mailto:partnerships@doublediffusion.co" className="email-link">partnerships@doublediffusion.co</a>
            </div>
            <div className="email-item">
              <span className="email-label">General Inquiries & Press</span>
              <a href="mailto:hello@doublediffusion.co" className="email-link">hello@doublediffusion.co</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision */}
      <section className="section vision">
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
            <span className="footer-sub">AI-Native Creative Studio</span>
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
