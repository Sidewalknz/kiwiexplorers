"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import styles from "./Gallery.module.css";
import MeetTheTeamCTA from "@/components/MeetTheTeamCTA";

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
async function probeGallery({ maxPerGroup = 60, missStreakLimit = 5 } = {}) {
  const results = [];
  for (const code of Object.keys(GROUPS)) {
    let misses = 0;
    for (let n = 1; n <= maxPerGroup; n++) {
      const base = `/gallery/${code}${n}.jpg`;
      try {
        const res = await fetch(base, { method: "HEAD", cache: "no-cache" });
        if (res.ok) {
          results.push({
            base,
            alt: `${GROUPS[code]} photo ${n}`,
            group: GROUPS[code],
            code,
            n,
          });
          misses = 0;
        } else {
          misses++;
        }
      } catch {
        misses++;
      }
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

      const shuffled = [...found]
        .sort(() => Math.random() - 0.5)
        .map((img) => ({
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

  return (
    <>
      <main className={styles.page}>
        {/* Sunset decorative icons */}
        <img src="/icons/kite.svg" alt="" className={styles.svgKite} aria-hidden="true" />
        <img src="/icons/balloons.svg" alt="" className={styles.svgBalloons} aria-hidden="true" />
        <img src="/icons/toyplane.svg" alt="" className={styles.svgPlane} aria-hidden="true" />

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
            {filtered.map((img) => (
              <figure
                key={`${img.code}-${img.n}`}
                className={styles.polaroid}
                style={{ "--rot": `${img.rot}deg` }}
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
                <figcaption className={styles.caption}>{img.group}</figcaption>
              </figure>
            ))}
            {filtered.length === 0 && (
              <p className={styles.emptyNote}>No photos yet for this group — check back soon!</p>
            )}
          </section>
        )}
      </main>
      <MeetTheTeamCTA />
      <Footer />
    </>
  );
}
