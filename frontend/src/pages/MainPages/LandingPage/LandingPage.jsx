//React imports
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faShieldAlt, faBolt, faGlobe } from "@fortawesome/free-solid-svg-icons";
//My imports
import "./LandingPage.css";

const LandingPage = () => {
  const aboutWebsiteSection = useRef(null);

  const heroContentToAboutContent = () => {
    if(aboutWebsiteSection.current) {
      aboutWebsiteSection.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <>
      <div className="landing-container">
        <div className="qr-bg">
          <div className="bg-image"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-content-animated-heading">Welcome to QR Safe website</h1>
          <Link to={"/start-scan"} className="hero-content-start-btn">
            Start Scanning
          </Link>
        </div>

        <button className="hero-content-to-about-content-btn" onClick={heroContentToAboutContent}>
          <FontAwesomeIcon icon={faAngleDown} className="i" />
        </button>
      </div>
      <div className="about-website-container" ref={aboutWebsiteSection}>
        <h1 className="about-website-title">What can our website do?</h1>

        <div className="info-section">
          <div className="info-box-container">
            <div className="info-box">
              <FontAwesomeIcon icon={faShieldAlt} className="info-icon" />
              <h2>Secure Scanning</h2>
              <p>QR Safe ensures your QR scans are protected from malicious threats.</p>
            </div>

            <div className="info-box">
              <FontAwesomeIcon icon={faBolt} className="info-icon" />
              <h2>Fast & Reliable</h2>
              <p>Lightning-fast scanning with real-time results and security checks.</p>
            </div>

            <div className="info-box">
              <FontAwesomeIcon icon={faGlobe} className="info-icon" />
              <h2>Universal Compatibility</h2>
              <p>Works seamlessly on all devices and platforms without hassle.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;