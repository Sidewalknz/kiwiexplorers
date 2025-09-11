// src/components/Hero.js
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // trigger entrance transitions after mount
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Clouds: 3–5 random (movement on wrapper, pop on img)
  const clouds = useMemo(() => {
    const count = Math.floor(Math.random() * 3) + 3;
    return Array.from({ length: count }).map((_, i) => ({
      id: `c-${i}`,
      top: Math.random() * 60 + 10,           // 10%–70%
      size: Math.random() * 120 + 100,        // 100–220px
      duration: Math.random() * 50 + 60,      // 60–110s
      delay: Math.random() * -100,            // negative = already in motion
      popDelay: Math.random() * 0.6,          // 0–0.6s entrance stagger
    }));
  }, []);

  // Vehicles: 2–4 random (movement on wrapper, pop on img)
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
        popDelay: Math.random() * 0.6,        // 0–0.6s entrance stagger
      };
    });
  }, []);

  return (
    <section id="hero" className={`${styles.hero} ${mounted ? styles.mounted : ""}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to KiwiExplorers</h1>
        <p className={styles.subtitle}>Nurturing young minds through play and exploration</p>

        <div className={styles.buttons}>
          <Link href="/about" className={styles.discoverBtn}>Discover</Link>
          <Link href="/enrol" className={styles.enrolBtn}>Enrol</Link>
        </div>
      </div>

      {/* Clouds (wrapper moves, img pops) */}
      {clouds.map(c => (
        <div
          key={c.id}
          className={styles.cloudWrap}
          style={{
            top: `${c.top}%`,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <img
            src="/icons/cloud.svg"
            alt="Cloud"
            className={styles.cloud}
            style={{
              width: `${c.size}px`,
              transitionDelay: `${c.popDelay}s`,
            }}
          />
        </div>
      ))}

      {/* Vehicles (wrapper moves, img pops; flip if from right) */}
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
          <img
            src={v.src}
            alt={v.alt}
            className={`${styles.vehicleImg} ${v.fromRight ? styles.flipX : ""}`}
            style={{
              width: `${v.size}px`,
              transitionDelay: `${v.popDelay}s`,
            }}
          />
        </div>
      ))}
    </section>
  );
}
