import "../style/Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">Nirali</div>

      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#beyond">Beyond</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Navbar;