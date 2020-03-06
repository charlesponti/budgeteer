import json

from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from project.config import Config
from project.schemas import Query

app = Flask(__name__)
app.config.from_object(Config)

# Initiate SQLAlchemy instance
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Import views after app instantiation
from project import models, routes  # isort:skip

app.register_blueprint(routes.app_routes)
# @app.route("/cats")
# def cats():
#     return json.dumps({"cats": "cats"})


if __name__ == "__main__":
    app.run()
