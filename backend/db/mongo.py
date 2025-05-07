# db/mongo.py

from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")  # Get MongoDB Atlas URI from .env

client = MongoClient(MONGO_URL)

db = client["legal_navigator"]

# Existing collections
cases_collection = db["cases"]
parsed_queries_collection = db["parsed_queries"]

# NEW collection
graphs_collection = db["graphs"]
