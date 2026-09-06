import "../style/About.css";
import profile from "../../assets/images/n.jpg";

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
            I'm currently pursuing my Master's while
            building small creative projects that help me grow as a developer.
          </p>
         

          <p className="tech-title">
            Technologies I have been working with:
          </p>

          <ul className="tech-stack">
            {techStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
             <p>
            Outside of coding, I read science books, learn video editing, and
            oh yes I make content too.
          </p>
         
        </div>


        <div className="about-image">
          <img src={profile} alt="Nirali" />
        </div>
      </div>
    </section>
  );
};

export default About;




