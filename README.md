# QR-Safe-Website
#### A really basic backend and frontend website for our hackathon project. Currently it can check for malicious URL.
#### Frontend is made by my other teammates.

# Frontend
### Uses React + Vite. Axios for sending requests to backend.

# Backend
## - Request Rate Limited
#### Added a simple rate limiter for no reason. Max 30 requests within a 5 min frame.

## - Routes
#### 1) POST - /api/check-url
- Payload: { url: "some_url" }
- Response:
    - On Success: { isCompleted: boolean, isSafe: boolean, details: json }
    - On Failure: { error: "error_msg" }
