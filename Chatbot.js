import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [prompt, setPrompt] = useState('');
    const [history, setHistory] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHistory([...history, { type: 'user', text: prompt }]);
        setPrompt('');
        try {
            setHistory([...history, { type: 'user', text: prompt }, { type: 'bot', text: 'Typing...' }]);
            const res = await axios.post('/api/chatbot', { prompt });
            setHistory([...history, { type: 'user', text: prompt }, { type: 'bot', text: res.data.response }]);
        } catch (error) {
            console.error('Error during chatbot request:', error);
        }
    };

    return (
        <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">Chat with our AI</h2>
            <div className="chat-history">
                {history.map((msg, index) => (
                    <div key={index} className={`message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    className="border rounded p-2 w-full"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask a question..."
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">Send</button>
            </form>
        </section>
    );
};

export default Chatbot;
