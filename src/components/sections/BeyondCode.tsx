import "../style/BeyondCode.css";
import { ArrowUpRight } from "lucide-react";

function BeyondCode() {
  return (
    <section id="beyond">
      <div className="section-header">
        <span className="section-title">/ beyond code</span>
    
      </div>

      <p className="beyond-intro">
         I
        I've always enjoyed video editing and writing.
        They're my favorite ways to keep learning and growing,
        It's how I challenge myself outside of programming.
      </p>

      <div className="creator-grid">
        <a href="#" className="creator-card">
          <div className="creator-image">
            <img src="/creator/medium.jpg" alt="Medium" />
          </div>

          <div className="creator-content">
            <span className="creator-tag">MEDIUM</span>
            <h3>Writing</h3>
            <p>
              blogs?
            </p>

            <div className="creator-link">
              Read! <ArrowUpRight size={16} />
            </div>
          </div>
        </a>

        <a href="#" className="creator-card">
          <div className="creator-image">
            <img src="/creator/instagram.jpg" alt="Instagram" />
          </div>

          <div className="creator-content">
            <span className="creator-tag">INSTAGRAM</span>
            <h3>A jouney</h3>
            <p>
              sharing what i build & talk about my thoughts xo.
            </p>

            <div className="creator-link">
             follow me!<ArrowUpRight size={16} />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

export default BeyondCode;