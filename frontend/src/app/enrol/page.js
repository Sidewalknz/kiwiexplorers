"use client";

import { useMemo, useState } from "react";
import Footer from "@/components/Footer";
import styles from "./Enrol.module.css";

const AGE_GROUPS = [
  { id: "little", label: "Little Explorers — Ngā Kōhungahunga (6 months–2 years)" },
  { id: "early",  label: "Early Explorers — Ngā Kaitiaki Iti (2–3 years)" },
  { id: "junior", label: "Junior Explorers — Ngā Kārearea Iti (3–4 years)" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export default function EnrolPage() {
  const title = "Enrol Now";

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

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    const fd = new FormData(e.currentTarget);
    const childName = (fd.get("childName") || "").toString().trim();
    const dob = (fd.get("dob") || "").toString().trim();
    const caregiver = (fd.get("caregiver") || "").toString().trim();
    const phone = (fd.get("phone") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const start = (fd.get("start") || "").toString().trim();
    const ageGroup = (fd.get("ageGroup") || "").toString();
    const consent = fd.get("consent");
    const chosenDays = DAYS.filter((d) => fd.get(`day_${d}`));

    if (!childName || !dob || !caregiver || !phone || !email || !start || !ageGroup || !consent) {
      setStatus({ type: "err", msg: "Please complete all required fields (*) before submitting." });
      return;
    }
    if (chosenDays.length === 0) {
      setStatus({ type: "err", msg: "Please select at least one preferred day." });
      return;
    }

    setBusy(true);
    try {
      // Replace with a real API call later (e.g., POST /api/enrol)
      await new Promise((r) => setTimeout(r, 700));
      setStatus({
        type: "ok",
        msg: "Kia ora! Thanks for your application. We’ll be in touch shortly.",
      });
      e.currentTarget.reset();
    } catch {
      setStatus({
        type: "err",
        msg: "Something went wrong. You can email us directly at kiwiexplorerseec@gmail.com.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <section className={styles.section}>
        {/* Playful decorations (no clouds) */}
        <img src="/icons/balloons.svg" alt="" className={styles.dec1} aria-hidden="true" />
        <img src="/icons/kite.svg" alt="" className={styles.dec2} aria-hidden="true" />

        <div className={styles.container}>
          {/* Animated title */}
          <h1 className={styles.title} aria-label={title}>
            <span className={styles.letters}>{letters}</span>
          </h1>

          {/* Lead copy */}
          <p className={styles.lead}>
            Fill in the form below and our team will get back to you with next steps.
          </p>

          <form className={styles.form} onSubmit={onSubmit} noValidate>
            {/* Child details */}
            <fieldset className={styles.group}>
              <legend className={styles.legend}>Child Details</legend>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="childName">Child’s name*</label>
                  <input id="childName" name="childName" type="text" placeholder="Full name" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="dob">Date of birth*</label>
                  <input id="dob" name="dob" type="date" required />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="ageGroup">Age group*</label>
                  <select id="ageGroup" name="ageGroup" required defaultValue="">
                    <option value="" disabled>
                      Select an age group
                    </option>
                    {AGE_GROUPS.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="start">Preferred start date*</label>
                  <input id="start" name="start" type="date" required />
                </div>
              </div>
            </fieldset>

            {/* Caregiver details */}
            <fieldset className={styles.group}>
              <legend className={styles.legend}>Caregiver Details</legend>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="caregiver">Primary caregiver*</label>
                  <input id="caregiver" name="caregiver" type="text" placeholder="Your full name" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="phone">Phone*</label>
                  <input id="phone" name="phone" type="tel" placeholder="027 123 4567" required />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="email">Email*</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="address">Home address</label>
                  <input id="address" name="address" type="text" placeholder="Street, suburb, town" />
                </div>
              </div>
            </fieldset>

            {/* Attendance preferences */}
            <fieldset className={styles.group}>
              <legend className={styles.legend}>Attendance Preferences</legend>
              <div className={styles.daysRow}>
                {DAYS.map((d) => (
                  <label key={d} className={styles.dayChip}>
                    <input type="checkbox" name={`day_${d}`} />
                    <span>{d}</span>
                  </label>
                ))}
              </div>

              <div className={styles.field}>
                <label htmlFor="notes">Anything we should know? (allergies, routines, comments)</label>
                <textarea id="notes" name="notes" rows={5} placeholder="Kōrero mai — share any helpful details." />
              </div>
            </fieldset>

            {/* Consent + submit */}
            <div className={styles.consentRow}>
              <label className={styles.consentLabel}>
                <input type="checkbox" name="consent" />{" "}
                I agree to be contacted about enrolment and understand my details will be handled in line with your privacy practices.*
              </label>
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
                {busy ? "Submitting…" : "Submit application"}
              </button>
              <a
                className={styles.secondary}
                href="mailto:kiwiexplorerseec@gmail.com?subject=Enrolment%20enquiry"
              >
                Or email us directly
              </a>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
