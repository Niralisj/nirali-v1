import "../style/Projects.css";
import { Folder, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

function Projects() {
  return (
    <section id="projects">
      <div className="projects-header">
        <div>
          <span className="section-title">/ projects</span>
          <h2>Things I've built.</h2>
        </div>

        <a
          href="https://github.com/Niralisj"
          className="view-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          View GitHub →
        </a>
      </div>

      <div className="featured-project">
        <div className="project-image">
          <img src="/projects/maknews.png" alt="MakNews" />
        </div>

        <div className="project-info">
          <span className="featured">Featured Project</span>
          <h3>MakNews</h3>

          <p>
            A personalized content dashboard that brings together news, movies,
            and trending content into one clean experience.
          </p>

          <div className="tech">
            <span>React</span>
            <span>Redux</span>
            <span>TypeScript</span>
            <span>News API</span>
          </div>

          <div className="links">
            <a href="#">
              <FaGithub size={20} />
            </a>

            <a href="#">
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="projects-grid">
        <div className="project-card">
          <Folder className="folder" />
          <h4>The Royal Vault</h4>
          <p>
            An interactive virtual museum inspired by Indian royal jewellery.
          </p>

          <div className="card-tech">
            <span>React</span>
            <span>CSS</span>
            <span>Vite</span>
          </div>
        </div>

        <div className="project-card">
          <Folder className="folder" />
          <h4>DAIS</h4>
          <p>
            A skincare recommendation platform powered by TF-IDF and cosine
            similarity.
          </p>

          <div className="card-tech">
            <span>Python</span>
            <span>FastAPI</span>
            <span>MongoDB</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;