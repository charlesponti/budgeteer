import graphene
from flask import Blueprint, jsonify

from project import app
from project.models.activity import Activity
from project.models.match import Match
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
    data: [User] = User.query.all()
    return jsonify(data=[i.serialize for i in data])


@app_routes.route("/activities")
def activities():
    data: [Activity] = Activity.query.all()
    return jsonify(data=[i.serialize for i in data])


@app_routes.route("/matches")
def matches():
    data: [User] = Match.query.all()
    return jsonify(data=[i.serialize for i in data])
