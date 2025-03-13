//Node imports
import { Router } from "express"; 
//My imports
import statusCodes from "../constants/statusCodes.js";

//Create routes for our api
const apiRoutes = Router();

//--------------------ROUTES--------------------
/*
 * POST - /check-url
 * Payload: {url: "some_url"}
 * Response: {safe: boolean, message: "diagnostics_message"}
 */
apiRoutes.post("/check-url", (req, res) => {
    const { url } = req.body;

    if(!url)
    {
        return res.status(statusCodes.BAD_REQUEST).json({
            safe: false,
            message: "BAD_REQUEST. Request format: { url: 'some_url' }"
        });
    }

    //We got the URL; send dummy safe response.
    return res.status(statusCodes.OK).json({
        safe: true,
        message: "OK. URL seems to be safe"
    });
});

export default apiRoutes;