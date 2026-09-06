import "./App.css";
//import Stars from "./components/stars";

import Navbar from "./components/layout/Navbar";
//import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
// import Experience from "./components/sections/Experience";
import BeyondCode from "./components/sections/BeyondCode";
import Contact from "./components/sections/Contact";

function App() {
  return (
    <div className="page">
      <Navbar />
      {
        <main>
          <Hero />
          <About />
        
          <Projects />
          <BeyondCode />
          <Contact />
           {/*
        <Experience />
      */}
        </main>
        

      }
    </div>
  );
}

export default App;