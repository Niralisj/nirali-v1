import "./Hero.css";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/* each letter rises in on its own, offset by --i */
function Letters({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span
          key={i}
          className="hero-letter"
          style={{ "--i": start + i } as React.CSSProperties}
          aria-hidden="true"
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="hero-title" aria-label="hi, I'm Nirali.">
          <Letters text="hi, I'm " />
          <span className="hero-name">
            <Letters text="Nirali." start={8} />
          </span>
        </h1>

        <p className="hero-text hero-rise" style={{ "--d": "0.9s" } as React.CSSProperties}>
          Software developer and Master's student, and someone who likes making
          things just to see if I can. I'm interested in full-stack development,
          machine learning, creative projects, and the weird little ideas that
          turn into something bigger.
        </p>

        <a
          className="flip-button hero-rise"
          style={{ "--d": "1.15s" } as React.CSSProperties}
          href="#contact"
          aria-label="Say hi, go to contact"
        >
          <span className="flip-inner" aria-hidden="true">
            <span className="flip-face flip-front">
              Say hi!
              <ArrowIcon />
            </span>
            <span className="flip-face flip-back"> lets's connect</span>
          </span>
        </a>
      </div>
    </section>
  );
}

export default Hero;