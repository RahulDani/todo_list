from bson.objectid import ObjectId
from repositories.db import todos_collection

def get_all(user_id):
    todos = []
    for todo in todos_collection.find({"user_id": ObjectId(user_id)}):
        todos.append({
            "id": str(todo["_id"]),
            "text": todo["text"],
            "done": todo["done"]
        })
    return todos

def add(text, user_id):
    todo = {"text": text, "done": False, "user_id": ObjectId(user_id)}
    result = todos_collection.insert_one(todo)
    return {"id": str(result.inserted_id), "text": text, "done": False}

def toggle(todo_id, user_id):
    todo = todos_collection.find_one({"_id": ObjectId(todo_id), "user_id": ObjectId(user_id)})
    if not todo:
        return None
    new_done = not todo["done"]
    todos_collection.update_one(
        {"_id": ObjectId(todo_id), "user_id": ObjectId(user_id)},
        {"$set": {"done": new_done}}
    )
    todo["done"] = new_done
    return {"id": str(todo["_id"]), "text": todo["text"], "done": new_done}

def modify(todo_id, text, user_id):
    result = todos_collection.update_one(
        {"_id": ObjectId(todo_id), "user_id": ObjectId(user_id)},
        {"$set": {"text": text}}
    )
    if result.matched_count == 0:
        return None
    todo = todos_collection.find_one({"_id": ObjectId(todo_id), "user_id": ObjectId(user_id)})
    return {"id": str(todo["_id"]), "text": todo["text"], "done": todo["done"]}

def delete(todo_id, user_id):
    todos_collection.delete_one({"_id": ObjectId(todo_id), "user_id": ObjectId(user_id)})
    return True
