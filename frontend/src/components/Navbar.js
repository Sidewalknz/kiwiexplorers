"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const hasLogo = false; // set to true if you have /public/logo.png

  // Transparent at top, frosted after scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && open) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/gallery", label: "Gallery" },
    { href: "/team", label: "Team" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : styles.top}`}
      aria-label="Primary"
    >
      {/* Left: Logo / Title */}
      <div className={styles.logo}>
        <Link href="/" aria-label="Home">
          {hasLogo ? (
            <Image src="/logo.png" alt="KiwiExplorers Logo" width={50} height={50} />
          ) : (
            <span className={styles.siteTitle}>Kiwiexplorers</span>
          )}
        </Link>
      </div>

      {/* Burger (mobile) */}
      <button
        className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />
      </button>

      {/* Desktop Links */}
      <ul className={styles.navLinks}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${styles.navLink} ${
                pathname === link.href ? styles.activeLink : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/enrol" className={styles.enrolButton}>
            Enrol
          </Link>
        </li>
      </ul>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        className={`${styles.mobileDrawer} ${open ? styles.mobileOpen : ""}`}
      >
        <ul className={styles.mobileList}>
          {links.map((link) => (
            <li key={`m-${link.href}`} className={styles.mobileItem}>
              <Link
                href={link.href}
                className={`${styles.mobileLink} ${
                  pathname === link.href ? styles.mobileActive : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className={styles.mobileItem}>
            <Link
              href="/enrol"
              className={`${styles.enrolButton} ${styles.mobileEnrol}`}
              onClick={() => setOpen(false)}
            >
              Enrol
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
