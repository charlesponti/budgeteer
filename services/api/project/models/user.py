from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType
from sqlalchemy import Boolean, Column, Integer, String

from project import db


class User(db.Model):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    email = Column(String(128), unique=True, nullable=False)
    active = Column(Boolean(), default=True, nullable=False)

    def __init__(self, email):
        self.email = email

    def deactivate(self):
        self.active = False

    @property
    def serialize(self):
        return {"id": self.id, "email": self.email, "active": self.active}


class UserSchema(SQLAlchemyObjectType):
    class Meta:
        model = User
        interfaces = (relay.node,)
