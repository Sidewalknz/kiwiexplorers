"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import styles from "./Gallery.module.css";

const GROUPS = {
  l: "Little Explorers",
  e: "Early Explorers",
  j: "Junior Explorers",
};

const FILTERS = [
  { key: "All", label: "All" },
  { key: "Little", label: "Little Explorers" },
  { key: "Early", label: "Early Explorers" },
  { key: "Junior", label: "Junior Explorers" },
];

/** Probe /gallery for e|j|l + number .jpg files using HEAD (fast) */
async function probeGallery({ maxPerGroup = 100, missStreakLimit = 5 } = {}) {
  const results = [];

  // Scan each prefix independently so they can have different counts
  for (const code of Object.keys(GROUPS)) {
    let misses = 0;
    for (let n = 1; n <= maxPerGroup; n++) {
      const base = `/gallery/${code}${n}.jpg`;
      try {
        const res = await fetch(base, { method: "HEAD", cache: "no-cache" });
        if (res.ok) {
          results.push({
            base,           // full path with .jpg (we know extension now)
            alt: `${GROUPS[code]} photo ${n}`,
            group: GROUPS[code],
            code,
            n,
          });
          misses = 0; // reset since we found one
        } else {
          misses++;
        }
      } catch {
        misses++;
      }
      // Break early if we’ve missed a handful in a row (handles gaps but stops scanning)
      if (misses >= missStreakLimit) break;
    }
  }

  return results;
}

export default function GalleryPage() {
  const title = "Gallery";

  const [active, setActive] = useState("All");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch once on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const found = await probeGallery({ maxPerGroup: 60, missStreakLimit: 5 });
      if (!mounted) return;

      // Randomize order a bit and add a small rotation for the polaroid vibe
      const shuffled = [...found].sort(() => Math.random() - 0.5).map((img) => ({
        ...img,
        rot: (Math.random() - 0.5) * 8, // -4..+4 deg
      }));
      setImages(shuffled);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (active === "All") return images;
    if (active === "Little") return images.filter((i) => i.group === "Little Explorers");
    if (active === "Early") return images.filter((i) => i.group === "Early Explorers");
    if (active === "Junior") return images.filter((i) => i.group === "Junior Explorers");
    return images;
  }, [active, images]);

  // ---------------- Lightbox ----------------
  const [isOpen, setIsOpen] = useState(false);
  const [lightIndex, setLightIndex] = useState(0);

  const openAt = (idx) => { setLightIndex(idx); setIsOpen(true); };
  const close = () => setIsOpen(false);
  const prev = () => setLightIndex((i) => (i - 1 + filtered.length) % filtered.length);
  const next = () => setLightIndex((i) => (i + 1) % filtered.length);

  // Keyboard + scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, filtered.length]);

  // Keep lightbox sane if filter changes
  useEffect(() => {
    if (isOpen && filtered.length === 0) setIsOpen(false);
    if (isOpen && lightIndex >= filtered.length) setLightIndex(0);
  }, [filtered.length, isOpen, lightIndex]);

  const current = isOpen ? filtered[lightIndex] : null;
  const nextItem =
    isOpen && filtered.length > 1 ? filtered[(lightIndex + 1) % filtered.length] : null;

  return (
    <>
      <main className={styles.page}>
        {/* Animated Title */}
        <h1 className={styles.title} aria-label={title}>
          <span className={styles.letters}>
            {Array.from(title).map((ch, i) =>
              ch === " " ? (
                <span key={`sp-${i}`} className={styles.space} aria-hidden="true">
                  &nbsp;
                </span>
              ) : (
                <span
                  key={`ch-${i}`}
                  className={styles.letter}
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  {ch}
                </span>
              )
            )}
          </span>
        </h1>

        {/* Filters */}
        <div className={styles.filters} role="tablist" aria-label="Gallery filters">
          {FILTERS.map((cat) => (
            <button
              key={cat.key}
              role="tab"
              aria-selected={active === cat.key}
              className={`${styles.filterBtn} ${active === cat.key ? styles.activeFilter : ""}`}
              onClick={() => setActive(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading / Grid */}
        {loading ? (
          <p className={styles.loading}>Loading photos…</p>
        ) : (
          <section className={styles.grid} aria-live="polite">
            {filtered.map((img, i) => (
              <figure
                key={`${img.code}-${img.n}`}
                className={styles.polaroid}
                style={{ "--rot": `${img.rot}deg` }}
              >
                <button
                  type="button"
                  className={styles.openBtn}
                  onClick={() => openAt(i)}
                  aria-label={`Open ${img.alt} in lightbox`}
                >
                  <div className={styles.photoWrap}>
                    <Image
                      src={img.base}
                      alt={img.alt}
                      width={800}
                      height={600}
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </button>
                <figcaption className={styles.caption}>{img.group}</figcaption>
              </figure>
            ))}
            {filtered.length === 0 && (
              <p className={styles.emptyNote}>No photos yet for this group — check back soon!</p>
            )}
          </section>
        )}

        {/* Lightbox */}
        {isOpen && current && (
          <div
            className={styles.lbOverlay}
            role="dialog"
            aria-modal="true"
            aria-label={`${current.group} image`}
            onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          >
            <div className={styles.lbInner}>
              <button type="button" className={styles.lbClose} onClick={close} aria-label="Close">
                ×
              </button>

              <button
                type="button"
                className={`${styles.lbNav} ${styles.lbPrev}`}
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous image"
              >
                ‹
              </button>

              <figure className={styles.lbFigure}>
                <div className={styles.lbImgWrap}>
                  <Image
                    key={current.base}
                    src={current.base}
                    alt={current.alt}
                    fill
                    sizes="90vw"
                    className={styles.lbImg}
                    priority
                  />
                </div>
                <figcaption className={styles.lbCaption}>{current.group}</figcaption>
              </figure>

              <button
                type="button"
                className={`${styles.lbNav} ${styles.lbNext}`}
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            {/* silent preload of next */}
            {nextItem && (
              <img src={nextItem.base} alt="" width="1" height="1" style={{ display: "none" }} />
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
