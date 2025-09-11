import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Hills divider at the top */}
      <div className={styles.hills} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Kiwi Explorers Early Education Centre
        </p>

        <nav className={styles.nav}>
          <a href="#mission">Our Mission</a>
          <a href="#age-groups">Age Groups</a>
          <a href="#location">Find Us</a>
        </nav>
      </div>
    </footer>
  );
}
