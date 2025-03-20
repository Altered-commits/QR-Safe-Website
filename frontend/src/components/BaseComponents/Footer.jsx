//React imports
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; 
//My imports
import "../../styles/BaseComponents/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wave"></div>
      <div className="footer-content">
        <p className="footer-text">
          Ensuring secure and reliable QR code scanning.
        </p>
        <div className="social-icons">
          <a href="#" className="icon"><FaFacebook /></a>
          <a href="#" className="icon"><FaTwitter /></a>
          <a href="#" className="icon"><FaInstagram /></a>
          <a href="#" className="icon"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;