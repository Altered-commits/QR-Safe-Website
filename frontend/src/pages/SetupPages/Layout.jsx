//React imports
import React from "react";
import { Outlet } from "react-router-dom";
//My imports
import Navbar from "../../components/BaseComponents/Navbar";
import Footer from "../../components/BaseComponents/Footer";

const QRSafeLayout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default QRSafeLayout;