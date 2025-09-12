from bson.objectid import ObjectId
from repositories.db import db
import bcrypt

users_collection = db["users"]

def create_user(username, password):
    # Hash password
    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = {"username": username, "password": hashed_pw}
    result = users_collection.insert_one(user)
    return str(result.inserted_id)

def find_by_username(username):
    return users_collection.find_one({"username": username})
