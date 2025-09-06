from flask import Blueprint, request, jsonify
import services.todo_service as service

todo_bp = Blueprint("todo", __name__)

@todo_bp.route("/", methods=["GET"])
def get_todos():
    return jsonify(service.list_todos())

@todo_bp.route("/", methods=["POST"])
def add_todo():
    data = request.json
    todo = service.create_todo(data["text"])
    return jsonify(todo), 201

@todo_bp.route("/toggle/<int:todo_id>", methods=["PUT"])
def toggle(todo_id):
    todo = service.toggle_todo(todo_id)
    if todo:
        return jsonify(todo)
    return jsonify({"error": "Not found"}), 404

@todo_bp.route("/modify/<int:todo_id>", methods=["PUT"])
def modify(todo_id):
    data = request.get_json()
    todo = service.update_todo_text(todo_id, data["text"])
    if todo:
        return jsonify(todo)
    return jsonify({"error": "Not found"}), 404

@todo_bp.route("/<int:todo_id>", methods=["DELETE"])
def delete(todo_id):
    service.delete_todo(todo_id)
    return jsonify({"message": "Todo deleted"})
