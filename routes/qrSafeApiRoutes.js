//Node imports
import { Router } from "express"; 
//My imports
import statusCodes from "../constants/statusCodes.js";
import checkURLSafety from "../utils/urlSafetyChecker.js";

//Create routes for our api
const apiRoutes = Router();

//--------------------ROUTES--------------------
/*
 * POST - /check-url
 * Request: { url: "some_url" }
 * Response:
 *  - On Success: { isCompleted: boolean, isSafe: boolean, details: json }
 *  - On Failure: { error: "error_msg" }
 */
apiRoutes.post("/check-url", async (req, res) => {
    const { url } = req.body;

    if(!url)
        return res.status(statusCodes.BAD_REQUEST).json({
            error: "BAD_REQUEST. Request format: { url: 'some_url' }"
        });

    //We got the URL, the result just send it as the response
    const result = await checkURLSafety(url);
    
    //Decide on which status code to use
    const statusCode = result.error ? statusCodes.INTERNAL_SERVER_ERROR
                                    : result.isCompleted ? statusCodes.OK
                                                         : statusCodes.ACCEPTED;

    return res.status(statusCode).json(result);
});

export default apiRoutes;