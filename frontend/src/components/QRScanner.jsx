//React imports
import React from "react";
//My imports
import "../../styles/Components/QRScanner.css";

const QRScanner = () => {
  return (
    <div className="qr-scanner-container">
      <h2 className="scanner-heading">Scan Your QR Code Securely</h2>
      <button className="scan-button">Start Scanning</button>
    </div>
  );
};

export default QRScanner;