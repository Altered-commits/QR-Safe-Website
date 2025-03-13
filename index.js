//Load critical stuff from .env file
import { configDotenv } from "dotenv";
configDotenv();

//Node imports
import express, { json } from "express";
import cors from "cors";
//My imports
import apiRoutes from "./routes/qrSafeApiRoutes.js";
import statusCodes from "./constants/statusCodes.js";

//Handles everything
const app = express();

//Get the port from .env file (or use the default 5000)
const PORT = process.env.PORT;

//--------------------MIDDLEWARE--------------------
app.use(json()); //Parse incoming data to JSON
app.use(cors()); //Enable Cross-Origin Resource Sharing for all routes (for now)

//--------------------MAIN ROUTES--------------------
app.use("/api", apiRoutes);

//--------------------DEFAULT ROUTE--------------------
app.get("/", (req, res) => {
    res.send("Welcome to the QR-Safe Backend.");
});

//--------------------INVALID ROUTES--------------------
app.all("*", (req, res) => {
    //Any other route other than the ones defined above get a bad request error
    res.status(statusCodes.BAD_REQUEST).json({
        safe: false,
        message: "BAD_REQUEST. Invalid route."
    });
});

//--------------------SERVER START--------------------
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});