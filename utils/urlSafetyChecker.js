import axios from "axios";

//A simple asynchronous function to check for URL safety via Virus Total API
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
                response: false,
                safe: false,
                details: "No response body from API"
            };

        //Get the Analysis ID from the response
        const analysisID = postResponse.data.data.id;

        //STEP 2: Poll the analysis endpoint for the URL analysis
        const getResponse = await axios.get(`https://www.virustotal.com/api/v3/analyses/${analysisID}`, {
            headers: { "x-apikey": virusTotalAPIKey }
        });
        
        if(!getResponse || !getResponse.data)
            return {
                response: false,
                safe: false,
                details: "No analysis report from API"
            };

        //Otherwise, URL maybe safe, still need to check for the malicious / suspicious flags
        return {
            response: true,
            safe: true,
            details: `Details: ${JSON.stringify(getResponse.data.data.attributes.stats)}`
        };
    }
    catch(error)
    {
        throw error.message;
    }
}

export default checkURLSafety;
