"use client";

import { useState, useCallback } from "react";
import styles from "./MissionStatementSection.module.css";

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

export default function MissionStatementSection() {
  const title = "Our Mission";

  return (
    <section className={styles.section}>
      {/* Cloudy top divider */}
      <div className={styles.cloudTop} aria-hidden="true">
        <img src="/icons/cloudsection.svg" alt="" className={styles.cloudSvg} />
      </div>

      {/* Decorative SVGs */}
      <img src="/icons/red-baron.svg" alt="" className={styles.svgDecor1} aria-hidden="true" />
      <img src="/icons/balloon.svg" alt="" className={styles.svgDecor2} aria-hidden="true" />
      <img src="/icons/plane1.svg" alt="" className={styles.svgDecor3} aria-hidden="true" />
      <img src="/icons/helicopter1.svg" alt="" className={styles.svgDecor4} aria-hidden="true" />

      <div className={styles.content}>
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

        {/* Mission + Vision */}
        <div className={styles.statements}>
          <div className={styles.block}>
            <h3 className={styles.heading}>Mission Statement</h3>
            <p className={styles.text}>
              When <Term maori="kaiako" english="teachers" /> nurture children’s
              interests with warmth and care, we grow and learn together.
            </p>
          </div>

          <div className={styles.block}>
            <h3 className={styles.heading}>Vision Statement</h3>
            <p className={styles.text}>
              To create a place of{" "}
              <Term maori="whanaungatanga" english="belonging & connection" />{" "}
              for our community.
            </p>
          </div>
        </div>

        {/* Philosophy */}
        <div className={styles.block}>
          <h3 className={styles.heading}>Kiwi Explorers Philosophy</h3>
          <p className={styles.text}>
            At <strong>Kiwiexplorers</strong>, we believe{" "}
            <Term maori="tamariki" english="children" /> and adults thrive
            together when learning is guided by genuine care. We provide a
            stimulating, safe environment with rich, uninterrupted play.{" "}
            <Term maori="Kaiako" english="teachers" /> act as encouragers and
            resources, facilitating, scaffolding and celebrating each child’s
            ideas and endeavours.
          </p>
        </div>

        {/* Four Guiding Principles */}
        <h3 className={styles.heading}>Our Four Guiding Principles</h3>
        <div className={styles.principles}>
          <article className={styles.card}>
            <h4 className={styles.cardTitle}>
              <Term maori="Whakamana" english="Empowerment" />
            </h4>
            <p className={styles.cardText}>
              We build children’s{" "}
              <Term maori="mana" english="authority, dignity, prestige" /> by
              offering real choices and meaningful challenges, so they can
              create, act on their ideas, and make decisions that matter to
              them. We recognise their right to wellbeing, protection, and
              equitable opportunities to participate and learn.
            </p>
          </article>

          <article className={styles.card}>
            <h4 className={styles.cardTitle}>
              <Term maori="Kotahitanga" english="Holistic Development" />
            </h4>
            <p className={styles.cardText}>
              We see the whole child. Learning connects across domains and builds
              on strengths, with the active role of{" "}
              <Term maori="whānau" english="family" /> woven through each child’s
              learning journey.
            </p>
          </article>

          <article className={styles.card}>
            <h4 className={styles.cardTitle}>
              <Term maori="Whānau Tangata" english="Family & Community" />
            </h4>
            <p className={styles.cardText}>
              We foster wellbeing by partnering with families, respecting
              culture and knowledge, and creating strong, consistent connections
              across children’s worlds.
            </p>
          </article>

          <article className={styles.card}>
            <h4 className={styles.cardTitle}>
              <Term maori="Ngā Hononga" english="Relationships" />
            </h4>
            <p className={styles.cardText}>
              Quality relationships are at our heart.{" "}
              <Term maori="Kaiako" english="teachers" /> model positive,
              responsive, reciprocal communication—so{" "}
              <Term maori="tamariki" english="children" /> learn to reason,
              investigate and collaborate within a caring community.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
