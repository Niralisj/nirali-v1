import "../style/BeyondCode.css";
import { ArrowUpRight } from "lucide-react";

function BeyondCode() {
  return (
    <section id="beyond">
      <div className="section-header">
        <span className="section-title">/ beyond code</span>
      </div>

      <p className="beyond-intro">
        I've always enjoyed video editing and writing. They're my favorite ways
        to keep learning and growing—it's how I challenge myself outside of
        programming.
      </p>

      <div className="creator-grid">
        <a
          href="https://medium.com/@niralipandey3"
          target="_blank"
          rel="noopener noreferrer"
          className="creator-card"
        >
          <div className="creator-image">
            <img src="/creator/medium.jpg" alt="Medium" />
          </div>

          <div className="creator-content">
            <span className="creator-tag">MEDIUM</span>
            <h3>Writing</h3>

            <p>
              I write about projects, AI, cloud, and everything I'm learning
              along the way.
            </p>

            <div className="creator-link">
              Read my articles <ArrowUpRight size={16} />
            </div>
          </div>
        </a>

        <a
          href="https://www.instagram.com/nirii.ai?stkn=MWxmNHM5Mno2Y2pqeg%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="creator-card"
        >
          <div className="creator-image">
            <img src="/creator/instagram.jpg" alt="Instagram" />
          </div>

          <div className="creator-content">
            <span className="creator-tag">INSTAGRAM</span>
            <h3>A journey</h3>

            <p>
              Sharing what I build, documenting my journey, and creating content
              along the way.
            </p>

            <div className="creator-link">
              Follow me <ArrowUpRight size={16} />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

export default BeyondCode;