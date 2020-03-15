import graphene_sqlalchemy
from graphene import relasy
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType

from project.models import Activity as ActivityModel


class Activity(graphene.ObjectType):
    pass
