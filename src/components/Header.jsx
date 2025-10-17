// src/components/Header.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/Gallery", label: "Gallery" },
  { href: "/Resources", label: "Resources" },
  { href: "/Team", label: "Team" },
  { href: "/Merch", label: "Merch" },
  { href: "/Join", label: "Join Us", cta: true },
];

export default function Header() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0); // existing scroll bar (top)
  const [routePct, setRoutePct] = useState(0); // new: page load percent (bottom)
  const [routeActive, setRouteActive] = useState(false); // bar visibility
  const btnRef = useRef(null);
  const firstLinkRef = useRef(null);

  // Scroll effects (top progress)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100;
      setProgress(pct);
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // scroll indicator is separate from loader [web:209]

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const body = document.body;
    if (open) {
      const prev = body.style.overflow;
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = prev || "";
      };
    }
  }, [open]);

  // Focus management + Esc to close
  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close on route change
  useEffect(() => setOpen(false), [pathname]);

  // Pointer glow for CTA
  const glowMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  // NEW: page loading percentage (runs on initial mount and on each pathname change)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let done = false;
    setRouteActive(true);
    setRoutePct(5);

    // Small ramp-up timer toward ~85–90% while assets load
    let ramp = window.setInterval(() => {
      setRoutePct((p) => (p < 90 ? p + Math.max(1, (90 - p) * 0.05) : p));
    }, 120);

    // Gather images in main area and track their load state
    const root = document.querySelector("main") || document.body;
    const imgs = Array.from(root.querySelectorAll("img"));
    const total = imgs.length;
    let loaded = imgs.filter((img) => img.complete).length; // HTMLImageElement.complete [web:197]

    const updateFromImages = () => {
      if (done) return;
      // Map image progress into 10–95%
      if (total > 0) {
        const mapped = 10 + (loaded / total) * 85;
        setRoutePct((p) => Math.max(p, Math.min(95, mapped)));
      }
    };

    const listeners = [];
    imgs.forEach((img) => {
      if (img.complete) return; // already loaded [web:197]
      const onDone = () => {
        loaded += 1;
        updateFromImages();
        img.removeEventListener("load", onDone);
        img.removeEventListener("error", onDone); // load fires when resource finishes; error also settles it [web:202]
      };
      img.addEventListener("load", onDone, { once: true }); // load event for <img> [web:202]
      img.addEventListener("error", onDone, { once: true });
      listeners.push([img, onDone]);
    });

    // Fallback completion after a soft timeout or when all images are done
    const tryFinish = () => {
      if (done) return;
      if (total === 0 || loaded >= total) {
        done = true;
        window.clearInterval(ramp);
        setRoutePct(100);
        // allow CSS transition to show full bar briefly, then hide
        window.setTimeout(() => {
          setRouteActive(false);
          setRoutePct(0);
        }, 400);
      }
    };

    // Periodic check to finish when all images are done
    const finCheck = window.setInterval(() => tryFinish(), 150);

    // Hard cap to avoid a stuck bar if some resources never resolve
    const hardCap = window.setTimeout(() => {
      setRoutePct((p) => Math.max(p, 95));
      tryFinish();
    }, 6000);

    // Initial compute
    updateFromImages();
    tryFinish();

    return () => {
      done = true;
      window.clearInterval(ramp);
      window.clearInterval(finCheck);
      window.clearTimeout(hardCap);
      listeners.forEach(([img, fn]) => {
        img.removeEventListener("load", fn);
        img.removeEventListener("error", fn);
      });
    };
  }, [pathname]); // re-run whenever the route changes (progress is percent of page load, not scroll) [web:209][web:202][web:197]

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-200 motion-reduce:transition-none",
        "bg-surface/80 backdrop-blur supports-[backdrop-filter]:bg-surface/60",
        "border-b border-white/10",
        scrolled ? "py-1.5 sm:py-2" : "py-2 sm:py-4",
      ].join(" ")}
      aria-label="Primary"
    >
      {/* Neon scroll progress (top edge) */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-white/0">
        <span
          className="block h-full bg-gradient-to-r from-primary via-secondary to-primary transition-[width] duration-200 motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </span>

      {/* Top bar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-4">
        <Link href="/" className="group flex min-w-0 items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_theme(colors.glow)] motion-safe:animate-pulse" />
          <span className="truncate text-base sm:text-lg font-semibold text-textPrimary tracking-tight">
            Electra
          </span>
          <span className="sr-only">Home</span>
        </Link>

        <button
          ref={btnRef}
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-textMuted hover:text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Toggle menu"
          aria-controls="primary-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" className={open ? "hidden" : "block"}>
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg width="26" height="26" viewBox="0 0 24 24" className={open ? "block" : "hidden"}>
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV.slice(0, 5).map((item) => {
            const current = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className="group relative text-sm text-textMuted hover:text-textPrimary transition"
              >
                {item.label}
                <span
                  className={[
                    "absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary transition-all duration-200 motion-reduce:transition-none",
                    current ? "w-full" : "group-hover:w-full",
                  ].join(" ")}
                />
              </Link>
            );
          })}

          <Link
            href="/join"
            onMouseMove={(e) => {
              const el = e.currentTarget;
              const r = el.getBoundingClientRect();
              el.style.setProperty("--x", `${e.clientX - r.left}px`);
              el.style.setProperty("--y", `${e.clientY - r.top}px`);
            }}
            className="relative overflow-hidden rounded-md bg-primary px-4 py-2 text-sm font-semibold text-background shadow-[0_0_12px_theme(colors.glow/0.2)] hover:bg-secondary transition motion-reduce:transition-none group/cta"
          >
            <span className="relative z-10">Join Us</span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover/cta:opacity-100 motion-reduce:opacity-0"
              style={{
                background:
                  "radial-gradient(160px circle at var(--x,50%) var(--y,50%), rgba(20,247,255,0.35), transparent 60%)",
              }}
            />
          </Link>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        id="primary-menu"
        className={[
          "lg:hidden absolute left-0 right-0 top-full z-40 transition-all duration-200 motion-reduce:transition-none",
          open ? "opacity-100 translate-y-0 pointer-events-auto visible" : "opacity-0 -translate-y-2 pointer-events-none invisible",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div className="w-screen">
          <div className="mx-auto max-w-7xl px-3 sm:px-4">
            <div className="mt-2 rounded-2xl border border-white/10 bg-surface/95 backdrop-blur shadow-[0_20px_40px_rgba(0,0,0,.35)] max-h-[85svh] overflow-y-auto overscroll-contain">
              <div className="sticky top-0 z-10 flex items-center justify-between gap-2 px-3 py-2 border-b border-white/10 bg-surface/95 backdrop-blur">
                <span className="text-textPrimary text-sm font-semibold">Menu</span>
                <Link
                  href="/join"
                  className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-background shadow-[0_0_10px_theme(colors.glow/0.2)] hover:bg-secondary transition"
                >
                  Join Us
                </Link>
              </div>
              <div className="py-1">
                {NAV.map((item, i) => {
                  const current = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      ref={i === 0 ? firstLinkRef : undefined}
                      aria-current={current ? "page" : undefined}
                      className={[
                        "block rounded-md px-4 py-3 text-base outline-none focus:ring-2 focus:ring-primary",
                        item.cta
                          ? "relative overflow-hidden bg-primary text-background font-semibold hover:bg-secondary transition"
                          : "text-textMuted hover:text-textPrimary transition",
                        "motion-reduce:transition-none",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="h-[max(env(safe-area-inset-bottom),10px)]" />
            </div>
          </div>
        </div>
      </div>

      {/* NEW: Page loading percent bar at header bottom (not scroll-based) */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-white/0 overflow-hidden">
        <div
          className={[
            "h-full origin-left transition-[width,opacity] duration-200",
            routeActive ? "opacity-100" : "opacity-0",
            "bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400",
          ].join(" ")}
          style={{ width: `${routePct}%` }}
        />
      </div>
      <span className="sr-only" aria-live="polite">
        {routeActive ? `Loading ${Math.round(routePct)} percent` : "Loaded"}
      </span>
    </header>
  );
}
