"use client";

import styles from "./LocationSection.module.css";

export default function LocationSection() {
  const title = "Find Us";

  return (
    <section className={styles.section}>
      {/* Flipped cloud divider (tiling via CSS background) */}
      <div className={styles.cloudTop} aria-hidden="true" />

      {/* Decorative Sun + Birds */}
      <img src="/icons/sun.svg" alt="" className={styles.sunSvg} aria-hidden="true" />
      <img src="/icons/bird1.svg" alt="" className={styles.bird1} aria-hidden="true" />
      <img src="/icons/bird2.svg" alt="" className={styles.bird2} aria-hidden="true" />
      <img src="/icons/bird3.svg" alt="" className={styles.bird3} aria-hidden="true" />

      <div className={styles.content}>
        {/* Animated Title */}
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

        {/* Address + Contact + Hours */}
        <p className={styles.address}>
          Kiwi Explorers Early Education Centre <br />
          219 Main Road, Hope <br />
          Nelson 7020, New Zealand
        </p>

        <hr className={styles.divider} />

        <p className={styles.contact}>
          <a href="tel:+64274567340" className={styles.link}>
            027 4567340
          </a>{" "}
          |{" "}
          <a href="mailto:kiwiexplorerseec@gmail.com" className={styles.link}>
            kiwiexplorerseec@gmail.com
          </a>
        </p>

        <hr className={styles.divider} />

        <p className={styles.hours}>
          Open: <strong>7.30am – 5.30pm</strong>, Monday to Friday
        </p>
      </div>
    </section>
  );
}
