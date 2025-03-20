//React imports
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//My imports
import "../../styles/BaseComponents/Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLandingPage = location.pathname === "/";

  return (
    <header className={`navbar ${scrolled ? "scrolled" : isLandingPage ? "transparent" : "visible"}`}>
      <div className="logo">QR Safe</div>
      <nav className="nav-links">
        <a href="#scan-result" className="scan-result-btn">Scan Result</a>
      </nav>
    </header>
  );
};

export default Navbar;