"use client";

import { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import styles from "./Whanau.module.css";
import TEAM from "@/data/team.json";
import ContactCTA from "@/components/ContactCTA";

/** Smart loader: tries .jpg → .jpeg → .png → .webp for a given base path */
function SmartImage({
  base,
  alt,
  className,
  sizes,
  width,
  height,
  fill = false,
  priority = false,
}) {
  const exts = [".jpg", ".jpeg", ".png", ".webp"];
  const [idx, setIdx] = useState(0);
  const src = `${base}${exts[idx]}`;

  const common = {
    alt,
    className,
    onError: () => setIdx((i) => (i < exts.length - 1 ? i + 1 : i)),
    priority,
  };

  if (fill) {
    return <Image src={src} fill sizes={sizes} {...common} />;
  }
  return <Image src={src} width={width} height={height} sizes={sizes} {...common} />;
}

export default function WhanauPage() {
  const title = "Our Whānau";

  const categories = [
    { key: "All", label: "All" },
    { key: "Little", label: "Little Explorers" },
    { key: "Early", label: "Early Explorers" },
    { key: "Junior", label: "Junior Explorers" },
  ];

  const [active, setActive] = useState("All");

  // Shuffle once and add a tiny random rotation for organic layout
  const teamShuffled = useMemo(
    () =>
      [...TEAM]
        .sort(() => Math.random() - 0.5)
        .map((p) => ({ ...p, rot: (Math.random() - 0.5) * 4 })),
    []
  );

  const filtered =
    active === "All"
      ? teamShuffled
      : teamShuffled.filter((p) => {
          if (active === "Little") return p.group === "Little Explorers";
          if (active === "Early") return p.group === "Early Explorers";
          if (active === "Junior") return p.group === "Junior Explorers";
          return true;
        });

  // Per-card flip state as a Set of ids
  const [flipped, setFlipped] = useState(() => new Set());
  const toggleFlip = useCallback((id) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const onKeyFlip = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip(id);
    }
  };

  return (
    <>
      <main className={styles.page}>
        {/* Night-sky decorative SVGs */}
        <img src="/icons/moon.svg" alt="" className={styles.svgMoon} aria-hidden="true" />
        <img src="/icons/star1.svg" alt="" className={styles.svgStar1} aria-hidden="true" />
        <img src="/icons/star2.svg" alt="" className={styles.svgStar2} aria-hidden="true" />
        <img src="/icons/rocket.svg" alt="" className={styles.svgRocket} aria-hidden="true" />
        <img src="/icons/comet.svg" alt="" className={styles.svgComet} aria-hidden="true" />

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
        <div className={styles.filters} role="tablist" aria-label="Team filters">
          {categories.map((cat) => (
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

        {/* Team Grid */}
        <section className={styles.grid} aria-live="polite">
          {filtered.map((p) => {
            const isFlipped = flipped.has(p.id);

            return (
              <article
                key={p.id}
                className={styles.card3d}
                style={{ "--rot": `${p.rot}deg` }}
              >
                <div className={`${styles.cardInner} ${isFlipped ? styles.isFlipped : ""}`}>
                  {/* FRONT: full image + overlayed name/title */}
                  <div
                    className={`${styles.cardFace} ${styles.front}`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isFlipped}
                    onClick={() => toggleFlip(p.id)}
                    onKeyDown={(e) => onKeyFlip(e, p.id)}
                    aria-label={`View bio for ${p.name}`}
                  >
                    <SmartImage
                      base={p.base}
                      alt={`${p.name} portrait`}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className={styles.img}
                    />
                    <div className={styles.overlay}>
                      <h3 className={styles.name}>{p.name}</h3>
                      <p className={styles.role}>{p.title}</p>
                    </div>
                  </div>

                  {/* BACK: bio (scrollable if long) */}
                  <div
                    className={`${styles.cardFace} ${styles.back}`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={!isFlipped}
                    onClick={() => toggleFlip(p.id)}
                    onKeyDown={(e) => onKeyFlip(e, p.id)}
                    aria-label={`Hide bio for ${p.name}`}
                  >
                    <div className={styles.backInner}>
                      <h3 className={styles.backName}>{p.name}</h3>
                      <p className={styles.backGroup}>{p.group}</p>
                      <p className={styles.backBio}>{p.bio}</p>
                      <span className={styles.flipHint}>Click to flip back</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <p className={styles.emptyNote}>We’re updating our whānau — check back soon!</p>
          )}
        </section>
      </main>
      <ContactCTA />
      <Footer />
    </>
  );
}
