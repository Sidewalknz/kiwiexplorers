"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import styles from "./Whanau.module.css";
import TEAM from "@/data/team.json"; // JSON import works in Next.js

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

  // Filters (added Centre Leadership)
  const categories = [
    { key: "All", label: "All" },
    { key: "Little", label: "Little Explorers" },
    { key: "Early", label: "Early Explorers" },
    { key: "Junior", label: "Junior Explorers" },
  ];

  const [active, setActive] = useState("All");

  // Shuffle once for a fresh, friendly arrangement
  const teamShuffled = useMemo(() => [...TEAM].sort(() => Math.random() - 0.5), []);

  const filtered =
    active === "All"
      ? teamShuffled
      : teamShuffled.filter((p) => {
          if (active === "Little") return p.group === "Little Explorers";
          if (active === "Early") return p.group === "Early Explorers";
          if (active === "Junior") return p.group === "Junior Explorers";
          return true;
        });

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
          {filtered.map((p) => (
            <article key={p.id} className={styles.card}>
              <div className={styles.portrait}>
                <SmartImage
                  base={p.base}
                  alt={`${p.name} portrait`}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className={styles.img}
                />
              </div>

              <header className={styles.header}>
                <h3 className={styles.name}>{p.name}</h3>
                <p className={styles.role}>{p.title}</p>
                <p className={styles.group}>{p.group}</p>
              </header>

              <p className={styles.bio}>{p.bio}</p>
            </article>
          ))}

          {filtered.length === 0 && (
            <p className={styles.emptyNote}>We’re updating our whānau — check back soon!</p>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
