import graphene
from flask import Blueprint, jsonify

from project import app
from project.models.user import User
from project.schemas import Query

app_routes = Blueprint("backpack.routes", __name__)


@app_routes.route("/")
def index():
    scheme = graphene.Schema(query=Query)
    result = scheme.execute("{ hello }")
    return jsonify({"data": result.data["hello"]})


@app_routes.route("/users")
def users():
    users: User = User.query.all()
    return jsonify(data=[i.serialize for i in users])
