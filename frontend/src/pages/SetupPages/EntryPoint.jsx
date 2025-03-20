//React imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//My imports
import LandingPage from "../MainPages/LandingPage";
import ScanResult from "../MainPages/ScanResultPage";
import NotFoundPage from "../MainPages/NotFoundPage";
import QRSafeLayout from "./Layout";

const EntryPoint = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRSafeLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="scanresult" element={<ScanResult />} />
          <Route path="*" element={<NotFoundPage />} /> 
        </Route>
      </Routes>
    </Router>
  );
};

export default EntryPoint;