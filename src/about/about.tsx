import "./about.css";

const stack: { name: string }[] = [
  { name: "Python" },
  { name: "React.js" },
  { name: "JavaScript" },
  { name: "TypeScript" },
  { name: "FastAPI" },
  { name: "Electron" },
  { name: "Vite" },
];

function About() {
  return (
    <section className="about" id="about">
      <h1 className="about-title reveal">
        about <span>me</span>
      </h1>

      <div className="about-layout">
        <div className="about-text reveal" style={{ "--d": "0.15s" } as React.CSSProperties}>
          <p>
            I'm currently pursuing my Master's while building small creative
            projects that help me grow as a developer.
          </p>
          <p>
            Outside of coding, I read science books, learn video editing, and oh
            yes, I make content too.
          </p>
        </div>

        <div className="about-stack reveal" style={{ "--d": "0.3s" } as React.CSSProperties}>
          <p className="about-stack-label">
            Here are some technologies I have been working with:
          </p>
          <ul className="stack-grid">
            {stack.map(({ name }) => (
              <li key={name} className="stack-item">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
