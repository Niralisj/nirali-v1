import "../style/Projects.css";
import { ExternalLink } from "lucide-react";
import { FaGithub} from "react-icons/fa";

const projects = [

    {
  title: "DAIS",
  image: "/projects/dais.png",
  description:
    "An AI-powered skincare recommendation platform using TF-IDF and cosine similarity with FastAPI and React.",
  tech: "React • FastAPI • MongoDB",
  github: "https://github.com/Niralisj/DAIS",
  live: "https://dais.vercel.app/",
},
  {
    title: "DropNote",
    image: "/projects/dropnote.png",
    description:
      "A tiny desktop reminder app where paper airplanes deliver reminders.",
    tech: "React • Electron • Vite",
    github: "#",
    live: "",
  },
  {
    title: "MakNews",
    image: "/projects/maknews.png",
    description:
      "A personalized content dashboard combining news, movies and social content.",
    tech: "Next.js • Redux • TypeScript",
    github: "https://github.com/Niralisj/personalized-dashboard-assignment",
    live: "",
  },
  {
    title: "Mikrokosmos",
    image: "/projects/mikrokosmos.png",
    description:
      "An interactive Three.js recreation of the solar system inspired by space.",
    tech: "Three.js • JavaScript",
    github: "https://github.com/Niralisj/Mikrokosmos",
    live: "https://miikrokosmos.netlify.app/",
  },
  {
    title: "Smart Bus",
    image: "/projects/bus.png",
    description:
      "Hackathon project for smarter city bus scheduling using predictive analytics.",
    tech: "FastAPI • Python",
    github: "#",
    live: "",
  },
];

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="section-header">
        <span className="section-title">/ projects</span>
       
      </div>

      {projects.map((project) => (
        <div className="project" key={project.title}>
          <div className="project-image">
            <img src={project.image} alt={project.title} />
          </div>

          <div className="project-info">
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <span className="tech">{project.tech}</span>

            <div className="project-links">
              <a href={project.github} target="_blank">
                <FaGithub size={18} />
              </a>

              {project.live && (
                <a href={project.live} target="_blank">
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Projects;