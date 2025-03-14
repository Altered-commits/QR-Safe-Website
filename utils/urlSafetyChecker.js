import axios from "axios";

/** A simple asynchronous function to check for URL safety via Virus Total API.
 *  - Returns:
 *     - On Exception -> { error: error.message }
 *     - On Success   -> { isCompleted: boolean, isSafe: boolean, details: string | json }
 *     - On Failure   -> { error: "error_msg" }
 */
async function checkURLSafety(url)
{
    //API used to check for URL safety
    const virusTotalAPIKey = process.env.VIRUS_TOTAL_URL_SAFETY_CHECKER_API_KEY;
    const virusTotalAPIURL = "https://www.virustotal.com/api/v3/urls";

    const formData = new URLSearchParams();
    formData.append("url", url);

    //Try sending a POST request to the apiURL with the above payload via axios
    try
    {
        //STEP 1: Submit your URL to the virus total endpoint
        const postResponse = await axios.post(virusTotalAPIURL, formData, {
            headers: {
                "x-apikey": virusTotalAPIKey,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        //Check if response exists and has a body
        if(!postResponse || !postResponse.data)
            return {
                error: "No response body from API"
            };

        //Get the Analysis ID from the response
        const analysisID = postResponse.data.data.id;

        //STEP 2: Poll the analysis endpoint for the URL analysis
        const getResponse = await axios.get(`https://www.virustotal.com/api/v3/analyses/${analysisID}`, {
            headers: { "x-apikey": virusTotalAPIKey }
        });
        
        if(!getResponse || !getResponse.data)
            return {
                error: "No analysis report from API"
            };

        //But before we even try to get the response, check what the current status is.
        //Chances are, if its queued, ask the user to wait like few seconds before requerying again
        const urlStatus = getResponse.data.data.attributes.status;
        
        if(urlStatus === "queued")
            return {
                isCompleted: false,
                isSafe: false,
                details: "Your current request is queued at the server. Wait for few seconds before requerying."
            };

        //We got what we needed, get the stats and check if URL was flagged for being malicious or suspicious
        //Even if we get one of this flags, we ask user to be cautious and send the details of the analysis to frontend
        const urlStats = getResponse.data.data.attributes.stats;

        //Found some malicious content, send the entire url analysis to frontend
        if(urlStats.malicious > 0 || urlStats.suspicious > 0)
            return {
                isCompleted: true,
                isSafe: false,
                details: getResponse.data.data.attributes.results
            };
        
        //Otherwise, URL maybe safe, still send the stats so user has some amount of idea
        return {
            isCompleted: true,
            isSafe: true,
            details: urlStats
        };
    }
    catch(error)
    {
        return {
            error: error.message
        };
    }
}

export default checkURLSafety;
