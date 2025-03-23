//React imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//My imports
import LandingPage from "../MainPages/LandingPage/LandingPage";
import ScanStartPage from "../MainPages/ScanStartPage/ScanStartPage";
import ScanResultPage from "../MainPages/ScanResultPage/ScanResultPage";
import NotFoundPage from "../MainPages/NotFoundPage/NotFoundPage";
import AboutUsPage from "../MainPages/AboutUsPage/AboutUsPage";
import QRSafeLayout from "./Layout";

const EntryPoint = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRSafeLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about-us" element={<AboutUsPage />} />
          <Route path="start-scan" element={<ScanStartPage/>}/>
          <Route path="scan-result" element={<ScanResultPage />} />
          <Route path="*" element={<NotFoundPage />} /> 
        </Route>
      </Routes>
    </Router>
  );
};

export default EntryPoint;