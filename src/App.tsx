import { useState } from "react";
import Navbar from "./navbar/Navbar"; 
import Hero from "./Hero/Hero"; 
import Background from "./Hero/background"; 
import About from "./about/about"; 
import Projects from "./projects/projects"; 
import Creative from "./creative/creative"; 
import Contact from "./contact/contact"; 
import Footer from "./footer/footer"; 
import Blip from "./buddy/Blip";
import useReveal from "./useReveal";

function App() {
  useReveal();
  const [buddyOn, setBuddyOn] = useState(() => {
    try {
      return localStorage.getItem("buddy") !== "off";
    } catch {
      return true;
    }
  });

  const toggleBuddy = () => {
    setBuddyOn((on) => {
      try {
        localStorage.setItem("buddy", on ? "off" : "on");
      } catch {
        /* storage unavailable: just don't remember */
      }
      return !on;
    });
  };

  return (
    <> 
      <Background /> 
      <Navbar buddyOn={buddyOn} onToggleBuddy={toggleBuddy} />
      <main className="page"> 
        <Hero /> 
        <About /> 
        <Projects /> 
        <Creative /> 
        <Contact /> 
      </main> 
      <Footer />
      {buddyOn && <Blip />}
    </> 
  ); 
} 

export default App;
