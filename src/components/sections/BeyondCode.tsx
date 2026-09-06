import "../style/BeyondCode.css";
import { ArrowUpRight } from "lucide-react";

function BeyondCode() {
  return (
    <section id="beyond">
      <div className="section-header">
        <span className="section-title">/ beyond code</span>
        <h2>Building in public.</h2>
      </div>

      <p className="beyond-intro">
        Coding is one half of my journey—the other half is documenting it. I
        write what I learn, share UI builds, and create content for aspiring
        developers.
      </p>

      <div className="creator-grid">
        <a href="#" className="creator-card">
          <div className="creator-image">
            <img src="/creator/medium.jpg" alt="Medium" />
          </div>

          <div className="creator-content">
            <span className="creator-tag">MEDIUM</span>
            <h3>Writing Articles</h3>
            <p>
              React notes, internship learnings, and detailed project breakdowns.
            </p>

            <div className="creator-link">
              Read my articles <ArrowUpRight size={16} />
            </div>
          </div>
        </a>

        <a href="#" className="creator-card">
          <div className="creator-image">
            <img src="/creator/instagram.jpg" alt="Instagram" />
          </div>

          <div className="creator-content">
            <span className="creator-tag">INSTAGRAM</span>
            <h3>Developer Content</h3>
            <p>
              UI experiments, coding reels, and the behind-the-scenes of my
              projects.
            </p>

            <div className="creator-link">
              Follow the journey <ArrowUpRight size={16} />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

export default BeyondCode;