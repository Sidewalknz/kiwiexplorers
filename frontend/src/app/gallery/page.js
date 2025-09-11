"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import styles from "./Gallery.module.css";

export default function GalleryPage() {
  const title = "Gallery";

  // Categories & filter
  const categories = [
    { key: "All", label: "All" },
    { key: "Little", label: "Little Explorers" },
    { key: "Early", label: "Early Explorers" },
    { key: "Junior", label: "Junior Explorers" },
  ];
  const [active, setActive] = useState("All");

  // ---- Image manifest (adjust counts if you add/remove files) ----
  // Files should exist like: /public/gallery/l1.jpg, l2.jpg ... ; e1.jpg ... ; j1.jpg ...
  const PER_GROUP = 8; // <— change this to match how many you have per group
  const makeSet = (prefix, groupLabel) =>
    Array.from({ length: PER_GROUP }, (_, i) => {
      const n = i + 1;
      return {
        src: `/gallery/${prefix}${n}.jpg`,
        alt: `${groupLabel} photo ${n}`,
        group: groupLabel,
        code: prefix,
      };
    });

  const little = makeSet("l", "Little Explorers");
  const early = makeSet("e", "Early Explorers");
  const junior = makeSet("j", "Junior Explorers");

  const allImages = [...little, ...early, ...junior];

  // Random rotation per card for polaroid feel
  const withRotation = useMemo(() => {
    // copy + shuffle a bit so each load feels mixed
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    return shuffled.map((img) => {
      const rot = (Math.random() - 0.5) * 8; // -4deg to +4deg
      return { ...img, rot };
    });
  }, []); // only once on mount

  const filtered =
    active === "All"
      ? withRotation
      : withRotation.filter((img) => {
          if (active === "Little") return img.group === "Little Explorers";
          if (active === "Early") return img.group === "Early Explorers";
          if (active === "Junior") return img.group === "Junior Explorers";
          return true;
        });

  return (
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
        {categories.map((cat) => (
          <button
            key={cat.key}
            role="tab"
            aria-selected={active === cat.key}
            className={`${styles.filterBtn} ${
              active === cat.key ? styles.activeFilter : ""
            }`}
            onClick={() => setActive(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Polaroid Grid */}
      <section className={styles.grid} aria-live="polite">
        {filtered.map((img, i) => (
          <figure
            key={`${img.code}-${i}`}
            className={styles.polaroid}
            style={{ "--rot": `${img.rot}deg` }}
          >
            <div className={styles.photoWrap}>
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={600}
                className={styles.image}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <figcaption className={styles.caption}>
              {img.group}
            </figcaption>
          </figure>
        ))}
        {/* Helpful note if nothing shows (e.g., no files yet) */}
        {filtered.length === 0 && (
          <p className={styles.emptyNote}>
            No photos yet for this group — check back soon!
          </p>
        )}
      </section>
    </main>
  );
}
