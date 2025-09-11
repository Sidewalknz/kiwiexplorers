"use client";

import Link from "next/link";
import styles from "./MeetTheTeamCTA.module.css";

export default function MeetTheTeamCTA() {
  const title = "Meet Our Team";

  return (
    <section className={styles.section}>
      {/* Cloudy top divider */}
      <div className={styles.cloudTop} aria-hidden="true">
        <img src="/icons/cloudsection3.svg" alt="" className={styles.cloudSvg} />
      </div>

      {/* Decorative floaters (optional; visually match your mission section) */}
      <img src="/icons/balloon.svg" alt="" className={styles.svgDecor1} aria-hidden="true" />
      <img src="/icons/plane1.svg" alt="" className={styles.svgDecor2} aria-hidden="true" />

      <div className={styles.content}>
        {/* Animated, bobbing title (same letter treatment) */}
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
          Behind every adventure is a group of passionate explorers ready to guide, inspire, and
          create unforgettable memories. Get to know the people who make it all possible!
        </p>

        <Link href="/team" className={styles.ctaButton}>
          Meet the Team
        </Link>
      </div>
    </section>
  );
}
