"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const hasLogo = false; // set true if /logo.png exists

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // add frosted bg after 10px scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/gallery", label: "Gallery" },
    { href: "/team", label: "Team" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : styles.top}`}>
      {/* Logo / Title */}
      <div className={styles.logo}>
        <Link href="/">
          {hasLogo ? (
            <Image
              src="/logo.png"
              alt="Kiwiexplorers Logo"
              width={50}
              height={50}
            />
          ) : (
            <span className={styles.siteTitle}>Kiwiexplorers</span>
          )}
        </Link>
      </div>

      {/* Nav Links */}
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
    </nav>
  );
}
