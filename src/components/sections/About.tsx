import "../style/About.css";

const About = () => {
  const techStack = [
    "React.js",
    "TypeScript",
    "Python",
    "Java",
    "FastAPI",
    "MongoDB",
  ];

  return (
    <section id="about" className="about">
      <div className="section-header">
        <span className="section-title">/ about me</span>
        
      </div>

      <div className="about-content">
        <div className="about-description">
          <p>
            Hey, I’m <b>Nirali</b> — an MCA student and software developer based
            I enjoy building full-stack applications that are as
            thoughtful in design as they are in functionality.
          </p>

          <p>
            Lately I've been obsessed with React, machine learning, and creating
            projects that solve small everyday problems. I'm also learning in
            public by writing on Medium and sharing my journey through Instagram
            content.
          </p>

          <p className="tech-title">
            Technologies I enjoy working with:
          </p>

          <ul className="tech-stack">
            {techStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          <p>
            Outside of coding, I redesign interfaces for fun, collect random
            project ideas at 2 AM, and believe the best way to learn is by
            building things from scratch.
          </p>
        </div>

        <div className="about-image">
          <img src="/assets/me.jpg" alt="Nirali" />
        </div>
      </div>
    </section>
  );
};

export default About;