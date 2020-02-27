from flask import jsonify

from project import app, db
from project.models.user import User


@app.route("/users")
def users():
    users = db.Query()
    return jsonify({"data": users})
