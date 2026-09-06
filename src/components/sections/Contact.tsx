import "../style/Contact.css";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Contact() {
  return (
    <section id="contact">
      <div className="contact-container">
        <span className="section-title">/ contact</span>
        <h2>Find me here</h2>
        <p>
          Feel free to reach out for opportunities or project discussions.
        </p>
        <a href="mailto:niralipandey3@gmail.com" className="contact-button">
          <Mail size={18} />
          Say Hello
        </a>
        <div className="socials">
          <a href="https://github.com/Niralisj" target="_blank" rel="noopener noreferrer">
            <FaGithub size={22} />
          </a>
          <a href="https://linkedin.com/in/niralipandey3" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={22} />
          </a>
          <a href="https://www.instagram.com/nirii.ai?stkn=MWxmNHM5Mno2Y2pqeg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}
export default Contact;