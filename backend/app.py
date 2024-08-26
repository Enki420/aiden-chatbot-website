from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample documents
documents = [
    "Agile Defense Systems focuses on advanced AI solutions.",
    "Government contracting requires adherence to strict standards.",
    "AI-driven risk assessment is crucial for modern defense projects.",
    "Seamless data integration enhances project efficiency.",
    "Scalable solutions are necessary for large government contracts."
]

@app.route('/')
def home():
    return "Welcome to the AIDEN Chatbot API. Use the /search endpoint to perform searches."

@app.route('/search', methods=['POST'])
def search_api():
    query = request.json.get('query')
    results = search(query, documents)
    return jsonify(results)

@app.route('/favicon.ico')
def favicon():
    return '', 204

# Search function to filter documents based on query
def search(query, documents):
    return [doc for doc in documents if query.lower() in doc.lower()]

if __name__ == '__main__':
    app.run(debug=True)
