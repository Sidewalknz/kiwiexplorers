// src/components/Hero.js
"use client";

import { useMemo } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  // Clouds: 3–5 random
  const clouds = useMemo(() => {
    const count = Math.floor(Math.random() * 3) + 3;
    return Array.from({ length: count }).map((_, i) => ({
      id: `c-${i}`,
      top: Math.random() * 60 + 10,           // 10%–70%
      size: Math.random() * 120 + 100,        // 100–220px
      duration: Math.random() * 50 + 60,      // 60–110s
      delay: Math.random() * -100,            // negative = already in motion
    }));
  }, []);

  // Vehicles: 2–4 random
  const vehicles = useMemo(() => {
    const sprites = [
      { src: "/icons/blimp.svg", alt: "Blimp" },
      { src: "/icons/helicopter.svg", alt: "Helicopter" },
      { src: "/icons/hotairballoon.svg", alt: "Hot air balloon" },
      { src: "/icons/plane.svg", alt: "Plane" },
    ];
    const count = Math.floor(Math.random() * 3) + 2;

    return Array.from({ length: count }).map((_, i) => {
      const sprite = sprites[Math.floor(Math.random() * sprites.length)];
      const fromRight = Math.random() < 0.5; // 50/50 direction
      return {
        id: `v-${i}`,
        ...sprite,
        fromRight,
        top: Math.random() * 65 + 8,          // 8%–73%
        size: Math.random() * 80 + 80,        // 80–160px
        duration: Math.random() * 40 + 40,    // 40–80s
        delay: Math.random() * -60,           // negative to desync
      };
    });
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Kiwiexplorers</h1>
        <p className={styles.subtitle}>Nurturing young minds through play and exploration</p>

        <div className={styles.buttons}>
          <Link href="/about" className={styles.discoverBtn}>Discover</Link>
          <Link href="/enrol" className={styles.enrolBtn}>Enrol</Link>
        </div>
      </div>

      {/* Clouds */}
      {clouds.map(c => (
        <img
          key={c.id}
          src="/icons/cloud.svg"
          alt="Cloud"
          className={styles.cloud}
          style={{
            top: `${c.top}%`,
            width: `${c.size}px`,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}

      {/* Vehicles */}
      {vehicles.map(v => (
        <div
          key={v.id}
          className={`${styles.vehicleWrap} ${v.fromRight ? styles.fromRight : styles.fromLeft}`}
          style={{
            top: `${v.top}%`,
            animationDuration: `${v.duration}s`,
            animationDelay: `${v.delay}s`,
          }}
          aria-hidden="true"
        >
          {/* flip the image only when fromRight, using an inner img so animation transforms don't clash */}
          <img
            src={v.src}
            alt={v.alt}
            className={`${styles.vehicleImg} ${v.fromRight ? styles.flipX : ""}`}
            style={{ width: `${v.size}px` }}
          />
        </div>
      ))}
    </section>
  );
}
