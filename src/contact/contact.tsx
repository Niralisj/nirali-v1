import { useRef, useState } from "react";
import "./contact.css";

const EMAIL = "nirr0313@gmail.com";

// x/y are positions inside the 420x340 constellation
const stars = [
  { label: "instagram", href: "https://www.instagram.com/nirii.ai", x: 80, y: 70 },
  { label: "linkedin", href: "https://www.linkedin.com/in/nirali-pandey3", x: 300, y: 120 },
  { label: "medium", href: "https://medium.com/@niralipandey3", x: 170, y: 245 },
];

// tiny unlabeled stars, just for atmosphere
const dust = [
  [20, 160], [200, 30], [380, 50], [250, 300], [390, 260], [40, 300], [210, 190],
];

const RADIUS = 80; // px: how far the cursor glow reaches

function Contact() {
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const [copied, setCopied] = useState(false);

  const light = (clientX: number, clientY: number) => {
    lettersRef.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = clientX - (r.left + r.width / 2);
      const dy = clientY - (r.top + r.height / 2);
      const p = Math.max(0, 1 - Math.hypot(dx, dy) / RADIUS);
      el.style.setProperty("--p", p.toFixed(3));
    });
  };

  const reset = () =>
    lettersRef.current.forEach((el) => el?.style.setProperty("--p", "0"));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-left reveal">
        <h2 className="contact-title">
          let's talk<span>.</span>
        </h2>
        <p className="contact-text">
          Feel free to reach out for opportunities or project discussions. Got
          an idea, a question, or just want to say hi? My inbox is open.
        </p>

        <p className="contact-label">
          contact me at <span className="contact-dash" aria-hidden="true" />
        </p>

        <button
          className="contact-email"
          onClick={copy}
          onPointerMove={(e) => light(e.clientX, e.clientY)}
          onPointerLeave={reset}
          aria-label={`Copy email address ${EMAIL}`}
        >
          {EMAIL.split("").map((ch, i) => (
            <span
              key={i}
              className="contact-letter"
              ref={(el) => {
                if (el) lettersRef.current[i] = el;
              }}
            >
              {ch}
            </span>
          ))}
        </button>

        <p className="contact-hint" aria-live="polite">
          {copied ? (
            <span className="contact-copied">✦ signal received. copied!</span>
          ) : (
            <>
              click to copy · or{" "}
              <a href={`mailto:${EMAIL}`}>open your mail app</a>
            </>
          )}
        </p>
      </div>

      <svg
        className="contact-sky reveal"
        style={{ "--d": "0.25s" } as React.CSSProperties}
        viewBox="0 0 420 340"
        role="group"
        aria-label="Other places to find me"
      >
        {dust.map(([x, y], i) => (
          <circle
            key={i}
            className="dust"
            cx={x}
            cy={y}
            r="1.5"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}

        <polyline
          className="contact-line"
          points={stars.map((s) => `${s.x},${s.y}`).join(" ")}
        />

        {stars.map((s, i) => (
          <a
            key={s.label}
            className="contact-star"
            href={s.href}
            target="_blank"
            rel="noreferrer"
          >
            <circle className="halo" cx={s.x} cy={s.y} r="16" />
            <circle
              className="core"
              cx={s.x}
              cy={s.y}
              r="5"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
            <text x={s.x} y={s.y + 34} textAnchor="middle">
              {s.label}
            </text>
          </a>
        ))}
      </svg>
    </section>
  );
}

export default Contact;