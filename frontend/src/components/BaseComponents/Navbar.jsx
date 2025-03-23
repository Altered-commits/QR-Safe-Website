//React imports
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
//My imports
import "./Navbar.css";

/* TODO: FIX THE NAVBAR SCROLLING EFFECT BUG. ITS NOT WORKING. */

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
        <Link to={"/about-us"} className="about-us-btn">
          About us
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;