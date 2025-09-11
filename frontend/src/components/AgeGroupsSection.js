"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import styles from "./AgeGroupsSection.module.css";

/** Inline toggle term: shows Māori first, switches to English when clicked */
function Term({ maori, english }) {
  const [showEnglish, setShowEnglish] = useState(false);
  const toggle = useCallback(() => setShowEnglish((v) => !v), []);

  return (
    <span
      className={styles.term}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${showEnglish ? english : maori} — click to toggle translation`}
    >
      <strong>{showEnglish ? english : maori}</strong>
    </span>
  );
}

export default function AgeGroupsSection() {
  const title = "Our Age Groups";

  const groups = [
    {
      key: "little",
      name: "Little Explorers",
      maori: "Ngā Kōhungahunga",
      ages: "6 months – 2 years",
      img: "/images/age1.jpg",
      imgAlt: "Infant playing with soft blocks",
      blurb: (
        <>
          Gentle beginnings with <Term maori="manaaki" english="care" /> and{" "}
          <Term maori="aroha" english="love" />. We nurture{" "}
          <Term maori="tamariki" english="children" /> as they explore through
          play, routine, and calm sensory experiences.
        </>
      ),
    },
    {
      key: "early",
      name: "Early Explorers",
      maori: "Ngā Kaitiaki Iti",
      ages: "2 – 3 years",
      img: "/images/age2.jpg",
      imgAlt: "Toddler painting at a low table",
      blurb: (
        <>
          Curiosity blossoms! We lean into{" "}
          <Term maori="ako" english="learning together" />,{" "}
          <Term maori="waiata" english="song" />, and{" "}
          <Term maori="pukapuka" english="books" /> to build language,
          independence, and{" "}
          <Term maori="whanaungatanga" english="relationships" />.
        </>
      ),
    },
    {
      key: "junior",
      name: "Junior Explorers",
      maori: "Ngā Kārearea Iti",
      ages: "3 – 4 years",
      img: "/images/age3.jpg",
      imgAlt: "Preschoolers collaborating with blocks",
      blurb: (
        <>
          Preparing for school with rich play, problem-solving, and teamwork. We
          build confidence, <Term maori="tikanga" english="values" />, and a love
          of learning.
        </>
      ),
    },
  ];

  return (
    <section className={styles.section}>
      {/* Decorative SVGs (toy plane, balloons, kite) */}
      <img
        src="/icons/toyplane.svg"
        alt=""
        className={`${styles.svgDecor} ${styles.decA}`}
        aria-hidden="true"
      />
      <img
        src="/icons/balloons.svg"
        alt=""
        className={`${styles.svgDecor} ${styles.decB}`}
        aria-hidden="true"
      />
      <img
        src="/icons/kite.svg"
        alt=""
        className={`${styles.svgDecor} ${styles.decC}`}
        aria-hidden="true"
      />

      {/* Animated, bobbing title */}
      <h2 className={styles.title} aria-label={title}>
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
      </h2>

      <div className={styles.groups}>
        {groups.map((g) => (
          <article className={styles.card} key={g.key}>
            <div className={styles.media}>
              <Image
                src={g.img}
                alt={g.imgAlt}
                width={600}
                height={380}
                className={styles.cardImage}
                priority={g.key === "little"}
              />
              <span className={styles.ageBadge}>{g.ages}</span>
            </div>

            <header className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{g.name}</h3>
              <p className={styles.cardMaori}>{g.maori}</p>
            </header>

            <p className={styles.cardText}>{g.blurb}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
