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
 * Payload: {url: "some_url"}
 * Response: {safe: boolean, message: "diagnostics_message"}
 */
apiRoutes.post("/check-url", async (req, res) => {
    const { url } = req.body;

    if(!url)
    {
        return res.status(statusCodes.BAD_REQUEST).json({
            safe: false,
            message: "BAD_REQUEST. Request format: { url: 'some_url' }"
        });
    }

    //We got the URL, check how safe it is
    try
    {
        const result = await checkURLSafety(url);

        return res.status(
            result.response ? 
            statusCodes.OK : 
            statusCodes.INTERNAL_SERVER_ERROR
        ).json({
            safe: result.safe,
            message: result.safe ? 
                    `OK. URL seems to be safe to use. ${result.details}` :
                    `ERROR. URL seems to be unsafe to use. Details: ${result.details}`
        });
    }
    catch(error)
    {
        return res.status(statusCodes.BAD_REQUEST).json({
            safe: false,
            message: `Fetching data error. Error details: ${error}`
        });
    }
});

export default apiRoutes;