from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()  

# Connection string (from MongoDB Atlas dashboard)
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["todolist"]  # database name
todos_collection = db["todos"]  # collection name
