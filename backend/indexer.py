# backend/indexer.py
import faiss
import numpy as np
from embeddings import generate_embeddings

def create_index(documents):
    embeddings = generate_embeddings(documents)
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(np.array(embeddings))
    return index
