import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Hills divider at the top */}
      <div className={styles.hills} aria-hidden="true" />

      <div className={styles.content}>
        {/* Contact details */}
        <div className={styles.contact}>
          <a href="tel:+64274567340" className={styles.link}>
            027 4567340
          </a>{" "}
          |{" "}
          <a
            href="mailto:kiwiexplorerseec@gmail.com"
            className={styles.link}
          >
            kiwiexplorerseec@gmail.com
          </a>
        </div>

        {/* Copyright */}
        <p className={styles.copy}>
          © {new Date().getFullYear()} Kiwi Explorers Early Education Centre
        </p>

        {/* Designer credit */}
        <p className={styles.credit}>
          Website by{" "}
          <a
            href="https://sidewalks.co.nz"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Sidewalk
          </a>
        </p>
      </div>
    </footer>
  );
}
