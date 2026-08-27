"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState(null); // null | "sending" | "ok" | "err"
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      setStatus("ok");
      form.reset();
    } catch (err) {
      setErrMsg(err.message);
      setStatus("err");
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" required maxLength={120} autoComplete="name" />

      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" />

      <label htmlFor="company">Company / role (optional)</label>
      <input id="company" name="company" maxLength={200} />

      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" rows={6} required maxLength={5000} />

      <div className="cta-row" style={{ marginTop: 20 }}>
        <button className="btn primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>

      {status === "ok" && (
        <p className="status ok">✓ Sent — thanks, I&rsquo;ll get back to you shortly.</p>
      )}
      {status === "err" && <p className="status err">✗ {errMsg}</p>}
    </form>
  );
}
