import Stars from "../stars";
import "../style/Hero.css";

function Hero() {
  return (
    <section className="hero" id="home">
      <Stars />

      <div className="hero-content">

        <h1>
          hi, I'm <span>Nirali.</span>
        </h1>

        <p className="description">
          Software developer and Master's student, and someone who likes making
          things just to see if I can. I'm interested in full-stack development,
          machine learning, creative projects, and the weird little ideas that
          turn into something bigger.
        </p>

        <div className="buttons">

          <a href="#contact" className="button secondary">
            Say Hi!
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;