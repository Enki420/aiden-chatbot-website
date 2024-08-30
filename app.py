# app.py

import os
from flask import Flask, request, jsonify
from together import Together

app = Flask(__name__)
client = Together(api_key=os.environ.get('TOGETHER_API_KEY'))

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message', '')
    
    response = client.chat.completions.create(
        model="Open-Orca/Mistral-7B-OpenOrca",
        messages=[
            {
                "role": "system",
                "content": "You are AIDEN, a sophisticated Tactical AI designed to support decision-making and operational efficiency for government contracting tasks..."
            },
            {
                "role": "user",
                "content": user_input
            }
        ],
        max_tokens=1051,
        temperature=0.7,
        top_p=0.7,
        top_k=50,
        repetition_penalty=1,
        stop=[""],
        stream=False
    )
    
    assistant_message = response.choices[0].message['content']
    return jsonify({'response': assistant_message})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
