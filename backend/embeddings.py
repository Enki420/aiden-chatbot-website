# backend/embeddings.py
from sentence_transformers import SentenceTransformer

def generate_embeddings(documents):
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embeddings = model.encode(documents)
    return embeddings
