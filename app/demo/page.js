"use client";
import { useState } from "react";

export default function BookDemo() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    runtime: "",
    services: [],
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const SERVICE_OPTIONS = [
    "Creative Production",
    "AI Brand Assets",
    "Dynamic Creative Optimization",
    "Virtual Production & Avatars",
    "AI Content Engine",
    "Ad Testing & Optimization",
    "Long-term Retainer",
    "Narrative Creative Production",
    "Concept Creation",
  ];

  const RUNTIME_OPTIONS = [
    "0–30sec",
    "30–45sec",
    "45–60sec",
    "60–120sec",
    "120–300sec",
    "300sec+",
  ];

  const isCustomRuntime = form.runtime !== "" && !RUNTIME_OPTIONS.includes(form.runtime) && form.runtime !== undefined;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleService = (service) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", company: "", role: "", runtime: "", services: [], message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="demo-page">
      <div className="demo-inner">
        <a href="/" className="legal-back">← Back to Home</a>
        <div className="demo-header">
          <h1 className="demo-title">Book a Demo</h1>
          <p className="demo-subtitle">
            Tell us about your project and we&apos;ll get back to you within one business day.
          </p>
        </div>

        {status === "sent" ? (
          <div className="demo-success">
            <div className="success-icon">✓</div>
            <h2>Thank you!</h2>
            <p>We&apos;ve received your request and will be in touch shortly.</p>
            <a href="/" className="demo-home-btn">Back to Home</a>
          </div>
        ) : (
          <form className="demo-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text" id="name" name="name"
                  value={form.name} onChange={handleChange}
                  required placeholder="Jane Smith"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Work Email *</label>
                <input
                  type="email" id="email" name="email"
                  value={form.email} onChange={handleChange}
                  required placeholder="jane@company.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Company *</label>
                <input
                  type="text" id="company" name="company"
                  value={form.company} onChange={handleChange}
                  required placeholder="Acme Inc."
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Your Role</label>
                <input
                  type="text" id="role" name="role"
                  value={form.role} onChange={handleChange}
                  placeholder="Head of Marketing"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Services of Interest</label>
              <div className="service-chips">
                {SERVICE_OPTIONS.map((s) => (
                  <button
                    key={s} type="button"
                    className={`chip${form.services.includes(s) ? " chip--active" : ""}`}
                    onClick={() => toggleService(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Estimated Runtime</label>
              <div className="budget-options">
                {RUNTIME_OPTIONS.map((r) => (
                  <button
                    key={r} type="button"
                    className={`chip${form.runtime === r ? " chip--active" : ""}`}
                    onClick={() => setForm({ ...form, runtime: r })}
                  >
                    {r}
                  </button>
                ))}
                <button
                  type="button"
                  className={`chip${isCustomRuntime ? " chip--active" : ""}`}
                  onClick={() => setForm({ ...form, runtime: "custom:" })}
                >
                  Custom
                </button>
              </div>
              {isCustomRuntime && (
                <input
                  type="number" name="runtime" min="1" step="1"
                  value={form.runtime.replace("custom:", "")}
                  onChange={(e) => setForm({ ...form, runtime: `custom:${e.target.value.replace(/\D/g, "")}` })}
                  placeholder="Enter seconds, e.g. 90"
                  style={{ marginTop: 12 }}
                />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message">Tell us about your project</label>
              <textarea
                id="message" name="message"
                value={form.message} onChange={handleChange}
                rows={5}
                placeholder="What are you looking to create? Any timeline or specific goals?"
              />
            </div>

            <button
              type="submit"
              className="demo-submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Submit Request"}
              <span className="btn-icon">↗</span>
            </button>

            {status === "error" && (
              <p className="form-error">Something went wrong. Please try again or email us directly.</p>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
