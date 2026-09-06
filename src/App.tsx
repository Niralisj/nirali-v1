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
import MagicCursor from "./components/ui/MagicCursor";
import FadeIn from "../src/components/ui/FadeIn";

function App() {
  return (
    <div className="page">
      <MagicCursor />
      <Navbar />
      {
        <main>
          <Hero />
        <FadeIn>
           <About />
          
         
        
          <Projects />
          <BeyondCode />
            <Contact />
        </FadeIn>?
           {/*
        <Experience />
      */}
        </main>
        

      }
    </div>
  );
}

export default App;