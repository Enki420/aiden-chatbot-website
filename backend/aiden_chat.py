import os
import logging
from together import Together
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize logging
logging.basicConfig(level=logging.DEBUG, filename='aiden_chat_debug.log', filemode='w', format='%(asctime)s - %(levelname)s - %(message)s')

# Initialize the Together client
client = Together(api_key=os.environ.get('TOGETHER_API_KEY'))

def get_ai_response(prompt):
    try:
        # Call the Together API to get a response
        response = client.chat_completions.create(
            model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
            messages=[
                {"role": "system", "content": "You are AIDEN - an AI assistant specialized in AI-driven government contracting projects."},
                {"role": "user", "content": prompt}
            ]
        )
        logging.info("AI Response: %s", response['choices'][0]['message']['content'])
        return response['choices'][0]['message']['content']
    except Exception as e:
        logging.error("Error fetching AI response: %s", str(e))
        return "An error occurred while fetching the AI response."

if __name__ == "__main__":
    while True:
        user_input = input("You: ")
        if user_input.lower() in ['exit', 'quit']:
            break
        ai_response = get_ai_response(user_input)
        print(f"AIDEN: {ai_response}")


export default App;
