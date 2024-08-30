const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

const EAGLEVIEW_API_URL = 'https://api.eagleview.com';

app.use(express.json());

app.post('/api/roof-analysis', async (req, res) => {
    try {
        console.log("Received request data:", req.body); // Debug: Print incoming request data
        const response = await axios.post(`${EAGLEVIEW_API_URL}/roof`, req.body);
        console.log("API response data:", response.data); // Debug: Print API response data
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code outside of 2xx
            console.error('Error response:', error.response.data);
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            res.status(503).json({ error: 'Service unavailable. Please try again later.' });
        } else {
            // Something happened in setting up the request
            console.error('Error setting up request:', error.message);
            res.status(500).json({ error: 'Internal server error. Please contact support.' });
        }
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
