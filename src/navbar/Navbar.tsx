import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdEdit } from "react-icons/md";
import "./Navbar.css";

const links = [
  { label: "home", id: "home" },
  { label: "about", id: "about" },
  { label: "projects", id: "projects" },
  { label: "creative", id: "creative" },
  { label: "contact", id: "contact" },
];

const socials = [
  { label: "Email", href: "mailto:nirr0313@gmail.com", Icon: MdEmail },
  { label: "GitHub", href: "https://github.com/Niralisj", Icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nirali-pandey3", Icon: FaLinkedin },
  { label: "Medium", href: "https://medium.com/@niralipandey3", Icon: MdEdit },
];

type NavbarProps = { buddyOn: boolean; onToggleBuddy: () => void };

function Navbar({ buddyOn, onToggleBuddy }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className={scrolled ? "topbar scrolled" : "topbar"}>
      <div className="topbar-left">
        <button
          type="button"
          className={buddyOn ? "topbar-mascot on" : "topbar-mascot"}
          onClick={onToggleBuddy}
          role="switch"
          aria-checked={buddyOn}
          aria-label="Show mascot"
          title={buddyOn ? "Hide mascot" : "Show mascot"}
        >
          <span className="topbar-switch">
            <span className="topbar-switch-knob" />
          </span>
          mascot
        </button>
        <div className="topbar-socials">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={label}
              title={label}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <nav className="navbar">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={active === link.id ? "active" : ""}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
