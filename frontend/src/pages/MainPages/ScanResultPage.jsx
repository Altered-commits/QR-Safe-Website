//React imports
import React from 'react';
//My imports
import '../../styles/MainPages/ScanResultPage.css';

const ScanResultPage = ({ scannedData }) => {
  return (
    <div className="scan-result-container">
      <h1 className="neon-text">Scan Result</h1>
      <div className="result-box">
        <p className="scanned-data">{scannedData || 'No QR data found'}</p>
      </div>
    </div>
  );
};

export default ScanResultPage;