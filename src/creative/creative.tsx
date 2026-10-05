import { FaMedium } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import "./c.css";

const MEDIUM_URL = "https://medium.com/@niralipandey3";
const INSTAGRAM_URL = "https://www.instagram.com/nirii.ai";

const posts = [
  { title: "Read my articles", date: "medium", href: MEDIUM_URL },
];

function Creative() {
  return (
    <section className="creative" id="creative">
      <h2 className="creative-title reveal">
        beyond <span>??</span>
      </h2>

      <div className="creative-layout">
        <div className="blog-box reveal" style={{ "--d": "0.15s" } as React.CSSProperties}>
          <div className="blog-head">
            <span>writing</span>
            <a href={MEDIUM_URL} target="_blank" rel="noreferrer">
              all on medium <FiArrowUpRight />
            </a>
          </div>

          <ul className="blog-list">
            {posts.map((post) => (
              <li key={post.href}>
                <a href={post.href} target="_blank" rel="noreferrer">
                  <FaMedium className="blog-icon" />
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-name">{post.title}</span>
                  <FiArrowUpRight className="blog-arrow" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="creative-text reveal" style={{ "--d": "0.3s" } as React.CSSProperties}>
          <p>
            I've always enjoyed video editing and writing. They're my favorite
            ways to keep learning and growing, and how I challenge myself
            outside of programming.
          </p>
          <p>
            On Medium I write about projects, AI, cloud, and everything I'm
            learning along the way.
          </p>
          <p>
            On{" "}
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Instagram
            </a>{" "}
            I share what I build, document my journey, and create content along
            the way.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Creative;
