"use client";

import Link from "next/link";
import styles from "./EnrolNowCTA.module.css";

export default function EnrolNowCTA() {
  const title = "Enrol Now";

  return (
    <section className={styles.section}>
      {/* Cloudy top divider (tiling via CSS background) */}
      <div className={styles.cloudTop} aria-hidden="true" />

      {/* Decorative floaters (match the style of your other CTAs) */}
      <img
        src="/icons/balloon.svg"
        alt=""
        className={styles.svgDecor1}
        aria-hidden="true"
      />
      <img
        src="/icons/plane1.svg"
        alt=""
        className={styles.svgDecor2}
        aria-hidden="true"
      />

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

        <p className={styles.text}>
          Secure your child’s spot and join our warm, playful learning community.
          We’re excited to welcome your whānau!
        </p>

        <Link href="/enrol" className={styles.ctaButton}>
          Enrol Now
        </Link>
      </div>
    </section>
  );
}
