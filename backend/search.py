# backend/search.py
import numpy as np
from indexer import create_index
from embeddings import generate_embeddings

def search(query, documents):
    index = create_index(documents)
    query_embedding = generate_embeddings([query])
    distances, indices = index.search(np.array(query_embedding), k=5)
    return [documents[i] for i in indices[0]]
