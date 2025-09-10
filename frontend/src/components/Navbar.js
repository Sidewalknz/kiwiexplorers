// src/components/Navbar.js
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/logo.png" alt="Kiwiexplorers Logo" width={50} height={50} />
        </Link>
      </div>

      {/* Nav Links */}
      <ul className={styles.navLinks}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/gallery">Gallery</Link></li>
        <li><Link href="/team">Team</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li>
          <Link href="/enrol" className={styles.enrolButton}>
            Enrol
          </Link>
        </li>
      </ul>
    </nav>
  );
}
