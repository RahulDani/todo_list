from flask import Blueprint, request, jsonify
import services.todo_service as service
from flask_jwt_extended import jwt_required, get_jwt_identity

todo_bp = Blueprint("todo", __name__)

@todo_bp.route("/", methods=["GET"])
@jwt_required()
def get_todos():
    user_id = get_jwt_identity()
    return jsonify(service.list_todos(user_id))

@todo_bp.route("/", methods=["POST"])
@jwt_required()
def add_todo():
    user_id = get_jwt_identity()
    data = request.json
    todo = service.create_todo(data["text"], user_id)
    return jsonify(todo), 201

@todo_bp.route("/toggle/<todo_id>", methods=["PUT"])
@jwt_required()
def toggle(todo_id):
    user_id = get_jwt_identity()
    todo = service.toggle_todo(todo_id, user_id)
    if todo:
        return jsonify(todo)
    return jsonify({"error": "Not found"}), 404

@todo_bp.route("/modify/<todo_id>", methods=["PUT"])
@jwt_required()
def modify(todo_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    todo = service.update_todo_text(todo_id, data["text"], user_id)
    if todo:
        return jsonify(todo)
    return jsonify({"error": "Not found"}), 404

@todo_bp.route("/<todo_id>", methods=["DELETE"])
@jwt_required()
def delete(todo_id):
    user_id = get_jwt_identity()
    service.delete_todo(todo_id, user_id)
    return jsonify({"message": "Todo deleted"})
