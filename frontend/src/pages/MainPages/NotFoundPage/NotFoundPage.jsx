//React imports
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
//My imports
import "./NotFoundPage.css";
import qrCodeImg from "../../../assets/QRCode.png";

const NotFoundPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bsodVisible, setBsodVisible] = useState(false);

	//For some tomfoolery
	const navbar = document.querySelector(".navbar");
  const footer = document.querySelector(".footer");

	//Just to display a good error message
	const currentLocation = useLocation();

  const handleGoHomeClick = () => {
    if(document.documentElement.requestFullscreen)
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
        setTimeout(() => {
          setBsodVisible(true);
        }, 5000);
      }).catch((err) => {
        console.error("Failed to enter fullscreen:", err);
      });
  };

	//Effect to hide navbar and footer when BSOD is visible
  useEffect(() => {
    if(bsodVisible)
		{
      if(navbar)
        navbar.style.display = "none";
      if(footer)
        footer.style.display = "none";
    }
    //Cleanup function to restore navbar and footer display
    return () => {
      if(navbar)
        navbar.style.display = "";
      if(footer)
        footer.style.display = "";
    };
  }, [bsodVisible]);

  return (
    <div className={`not-found-container ${bsodVisible ? "bsod" : ""}`}>
			{/* Start of tomfoolery */}
      {!isFullscreen && (
        <div className="prompt-container">
					<h1>Error 404: {currentLocation.pathname} is not a valid route</h1>
          <button onClick={handleGoHomeClick}>Go back</button>
        </div>
      )}

			{/* Loading Indicator while waiting for BSOD */}
      {isFullscreen && !bsodVisible && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>An error occurred. Collecting Error info...</p>
        </div>
      )}

      {/* BSOD Layout */}
      {isFullscreen && bsodVisible && (
				<div className="bsod-content">
					<div className="sad-face">:(</div>

					<div className="text-block">
						<p className="main-message">
							Your PC ran into a problem and needs to restart.
							We&apos;re just collecting some error info, and then we&apos;ll
							restart for you.
						</p>
						<p className="sub-message percentage">0% complete</p>
					</div>

					<div className="bottom-section">
						<img
							src={qrCodeImg}
							alt="QR Code"
							className="bsod-qr-code"
						/>
						<div className="bottom-text">
							<p className="info">
								For more information about this issue and possible fixes, visit{" "}
								<a
									href="https://www.windows.com/stopcode"
									target="_blank"
									rel="noreferrer"
								>
									www.windows.com/stopcode
								</a>
							</p>
							<div className="bottom-info">
								<p className="info">
									If you call a support person, give them this info:
								</p>
								<p className="stop-code">Stop code: TOMFOOLERY_OCCURRED</p>
							</div>
						</div>
					</div>
				</div>
      )}
    </div>
  );
};

export default NotFoundPage;