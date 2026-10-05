import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>built &amp; designed by Nirali ✦</p>
    <p>© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
}

export default Footer;