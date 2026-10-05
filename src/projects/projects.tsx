import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import daisImg from "../assets/projects/dais.png";
import mikrokosmosImg from "../assets/projects/mikrokosmos.png";
import newsimg from "../assets/projects/image.png";
import "./projects.css";

type Project = {
  name: string;
  stack: string[];
  description: string;
  points: [string, string]; // two detail bullets
  github?: string; // repo URL — icon is hidden if empty
  live?: string; // live demo URL — icon is hidden if empty
  image?: string; // import an image from src/assets and put it here
  color: string; // placeholder background until you have images
};

// TODO: replace the "#" placeholders with your real GitHub / live links
const projects: Project[] = [
  {
    name: "DAIS",
    description:
      "An AI-powered skincare recommendation platform using TF-IDF and cosine similarity with FastAPI and React.",
    points: [
      "A short quiz works out your skin type, then products are ranked by matching them with TF-IDF and cosine similarity.",
      "Returns personalized product suggestions and skincare routines, plus friendly reminders to keep you consistent.",
    ],
    stack: ["React", "FastAPI", "MongoDB"],
    github: "https://github.com/Niralisj/DAIS",
    live: "#",
    image: daisImg,
    color: "#1b2a5c",
  },
  
  {
    name: "MakeNews",
    description:
      "A personalized content dashboard combining news, movies and social content.",
    points: [
      "Brings news, movies and social content together in a single dashboard instead of three separate apps.",
      "Personalized to each user, built with Next.js, Redux and TypeScript.",
    ],
    stack: ["Next.js", "Redux", "TypeScript"],
    github: "#",
    live: "#",
    image: newsimg,
    color: "#123a4a",
  },
  {
    name: "Mikrokosmos",
    description:
      "An interactive Three.js recreation of the solar system inspired by space.",
    points: [
      "A 3D solar system built with Three.js: a textured, glowing sun with the planets orbiting it, including Saturn's rings.",
      "Fully interactive: drag to rotate, scroll to zoom, a speed slider for the orbits, and spacebar to reset the camera.",
    ],
    stack: ["Three.js", "JavaScript"],
    github: "https://github.com/Niralisj/Mikrokosmos",
    live: "#",
    image: mikrokosmosImg,
    color: "#3a1b4a",
  },
];

function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      const progress = Math.min(Math.max(-top / scrollable, 0), 1);
      setActive(Math.round(progress * (projects.length - 1)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const current = projects[active];

  return (
    <section
      className="projects"
      id="projects"
      ref={ref}
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="projects-sticky">
        <div className="projects-info reveal">
          <h2 className="projects-label">
            my <span>projects.</span>
          </h2>
          <p className="projects-count">
            {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </p>
          <h3 className="projects-name">{current.name}</h3>
          <p className="projects-desc">{current.description}</p>
          <ul className="projects-points">
            {current.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
          <p className="projects-stack">{current.stack.join(" · ")}</p>
          <div className="projects-links">
            {current.github && (
              <a href={current.github} target="_blank" rel="noreferrer" aria-label={`${current.name} on GitHub`} title="GitHub">
                <FaGithub />
              </a>
            )}
            {current.live && (
              <a href={current.live} target="_blank" rel="noreferrer" aria-label={`${current.name} live demo`} title="Live demo">
                <FiExternalLink />
              </a>
            )}
          </div>
        </div>

        <div className="wheel reveal" style={{ "--d": "0.2s" } as React.CSSProperties}>
          {projects.map((p, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            return (
              <div
                key={p.name}
                className="wheel-card"
                style={{
                  background: p.color,
                  transform: `translateY(${offset * 108}%) scale(${1 - abs * 0.12})`,
                  opacity: abs === 0 ? 1 : abs === 1 ? 0.3 : 0,
                }}
              >
                {p.image && <img src={p.image} alt={p.name} />}
                <span className="wheel-card-title">{p.name}</span>
              </div>
            );
          })}
        </div>

        <div className="wheel-dots" aria-hidden="true">
          {projects.map((p, i) => (
            <span key={p.name} className={i === active ? "dot on" : "dot"} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;