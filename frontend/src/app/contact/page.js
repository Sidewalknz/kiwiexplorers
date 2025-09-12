"use client";

import { useMemo, useState } from "react";
import Footer from "@/components/Footer";
import EnrolNowCTA from "@/components/EnrolNowCTA";
import styles from "./Contact.module.css";

export default function ContactPage() {
  const title = "Contact Us";

  // animated letters
  const letters = useMemo(
    () =>
      Array.from(title).map((ch, i) =>
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
      ),
    [title]
  );

  const [status, setStatus] = useState({ type: "", msg: "" });
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const message = (fd.get("message") || "").toString().trim();

    if (!name || !email || !message) {
      setStatus({ type: "err", msg: "Please fill in all required fields." });
      return;
    }

    setBusy(true);
    try {
      // No backend wired yet; emulate success and provide mailto fallback
      await new Promise((r) => setTimeout(r, 600));
      setStatus({
        type: "ok",
        msg: "Thanks! We’ve received your message. We’ll get back to you shortly.",
      });
      e.currentTarget.reset();
    } catch {
      setStatus({
        type: "err",
        msg: "Sorry, something went wrong. You can email us directly at kiwiexplorerseec@gmail.com.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <section className={styles.section} id="contact">
        {/* Decorative Sun + Birds (no clouds) */}
        <img src="/icons/sun.svg" alt="" className={styles.sunSvg} aria-hidden="true" />
        <img src="/icons/bird1.svg" alt="" className={styles.bird1} aria-hidden="true" />
        <img src="/icons/bird2.svg" alt="" className={styles.bird2} aria-hidden="true" />

        <div className={styles.container}>
          {/* Animated title */}
          <h1 className={styles.title} aria-label={title}>
            <span className={styles.letters}>{letters}</span>
          </h1>

          {/* Quick info cards */}
          <div className={styles.quickRow}>
            <a className={styles.card} href="tel:+64274567340">
              <div className={styles.cardLabel}>Phone</div>
              <div className={styles.cardValue}>027 4567340</div>
            </a>

            <a className={styles.card} href="mailto:kiwiexplorerseec@gmail.com">
              <div className={styles.cardLabel}>Email</div>
              <div className={styles.cardValue}>kiwiexplorerseec@gmail.com</div>
            </a>

            <div className={styles.card} aria-label="Opening hours">
              <div className={styles.cardLabel}>Hours</div>
              <div className={styles.cardValue}>7.30am – 5.30pm, Mon–Fri</div>
            </div>
          </div>

          {/* Content grid: form + map */}
          <div className={styles.grid}>
            {/* Contact form */}
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="name">Name*</label>
                <input id="name" name="name" type="text" placeholder="Your full name" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email*</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="message">Message*</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Kia ora! How can we help?"
                  required
                />
              </div>

              {status.msg && (
                <p
                  className={`${styles.status} ${status.type === "ok" ? styles.ok : styles.err}`}
                  role="status"
                  aria-live="polite"
                >
                  {status.msg}
                </p>
              )}

              <div className={styles.actions}>
                <button className={styles.submit} type="submit" disabled={busy}>
                  {busy ? "Sending…" : "Send message"}
                </button>
                <a
                  className={styles.secondary}
                  href="mailto:kiwiexplorerseec@gmail.com?subject=Enquiry%20from%20website"
                >
                  Or email us directly
                </a>
              </div>
            </form>

            {/* Map + address */}
            <div className={styles.mapWrap}>
              <div className={styles.address}>
                <strong>Kiwi Explorers Early Education Centre</strong>
                <br />
                219 Main Road, Hope, Nelson 7020, New Zealand
              </div>

              <div className={styles.mapCard} aria-hidden="true">
                <iframe
                  className={styles.map}
                  title="Kiwi Explorers on Google Maps"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=219%20Main%20Road,%20Hope,%20Nelson%207020,%20New%20Zealand&output=embed"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnrolNowCTA />
      <Footer />
    </>
  );
}
