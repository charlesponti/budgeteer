from flask.cli import FlaskGroup

from project import app, db
from project.models.activity import Activity
from project.models.match import Match
from project.models.user import User

cli = FlaskGroup(app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_db")
def seed_db():
    db.session.add(User(email="foo@bar.com"))
    db.session.commit()


if __name__ == "__main__":
    cli()
