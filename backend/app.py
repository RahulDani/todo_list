from flask import Flask, request, jsonify, send_from_directory # type: ignore
from flask_cors import CORS # type: ignore
from flask_jwt_extended import JWTManager
from controllers.todo_controller import todo_bp
from controllers.auth_controller import auth_bp
import logging
import os
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__, static_folder="../frontend/build", static_url_path="/")
CORS(app)
app.config["JWT_SECRET_KEY"] = "super-secret-key"  # change in production

jwt = JWTManager(app)
    
# Register blueprints (controllers)
app.register_blueprint(todo_bp, url_prefix="/todos")
app.register_blueprint(auth_bp, url_prefix="/auth")

# This serves the frontend (React)
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
