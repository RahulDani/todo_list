from flask import Blueprint, request, jsonify
from repositories.user_repository import create_user, find_by_username
import bcrypt
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if find_by_username(username):
        return jsonify({"error": "User already exists"}), 400

    user_id = create_user(username, password)
    return jsonify({"message": "User created", "user_id": user_id}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = find_by_username(username)
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    if bcrypt.checkpw(password.encode('utf-8'), user["password"]):
        token = create_access_token(identity=str(user["_id"]))
        return jsonify({"token": token}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401
