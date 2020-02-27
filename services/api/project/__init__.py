from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from project.config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Import views after app instantiation
from project import models, routes  # isort:skip
