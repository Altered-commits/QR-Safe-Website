//React import
import React from "react";
//My imports
import "../../styles/MainPages/NotFoundPage.css";

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <h1>Something went wrong :(</h1>
            <p>Error: Oh, cuz its a wrong route. Go back to '/'</p>
            <p>Error Code: 404</p>
        </div>
    );
};

export default NotFoundPage;