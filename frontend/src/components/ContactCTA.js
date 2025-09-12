"use client";

import Link from "next/link";
import styles from "./ContactCTA.module.css";

export default function ContactCTA() {
  const title = "Get in Touch";

  return (
    <section className={styles.section}>
      {/* Cloudy top divider (tiling via CSS background) */}
      <div className={styles.cloudTop} aria-hidden="true" />

      {/* Decorative floaters (match mission section style) */}
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
          We’d love to hear from you! Whether you’re curious about our programmes, have questions
          about enrolment, or just want to say hello — our team is here to help.
        </p>

        <Link href="/contact" className={styles.ctaButton}>
          Contact Us
        </Link>
      </div>
    </section>
  );
}
