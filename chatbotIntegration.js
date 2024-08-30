const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());

app.post('/api/chatbot', async (req, res) => {
    const { prompt } = req.body;
    console.log("Chatbot received prompt:", prompt); // Debug: Print incoming prompt

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 150,
        });
        console.log("Chatbot response:", response.data.choices[0].text); // Debug: Print chatbot response
        res.json({ response: response.data.choices[0].text });
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            console.error('No response received:', error.request);
            res.status(503).json({ error: 'Service unavailable. Please try again later.' });
        } else {
            console.error('Error setting up request:', error.message);
            res.status(500).json({ error: 'Internal server error. Please contact support.' });
        }
    }
});

app.listen(PORT, () => console.log(`Chatbot server running on port ${PORT}`));
