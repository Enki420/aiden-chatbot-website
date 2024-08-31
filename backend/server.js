// backend/server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.post('/api/chatbot', async (req, res) => {
    // Chatbot logic will be implemented here
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
