const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getChatbotResponse = async (prompt) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 150,
        });
        return response.data.choices[0].text;
    } catch (error) {
        throw new Error('Failed to generate chatbot response');
    }
};

module.exports = { getChatbotResponse };
