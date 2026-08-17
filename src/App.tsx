import "./App.css";
import Stars from "./components/stars";
function App() {
  return (
    <div className="page">
      <nav className="navbar">
        <div className="logo">Nirali</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main className="hero" id="home">
            <Stars />
        <div className="hero-content">
          
          <h1>
            hi, I'm <span>Nirali.</span>
          </h1>

          <p className="description">
                Software developer and Master's student, and someone who likes making things just to see if I can.
           
            I'm interested in full-stack development , machine learning, creative projects,  
                and the weird little ideas that turn into something bigger.
          </p>
          <div className="buttons">
      
            <a href="#contact" className="button secondary">
              say hi!
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;