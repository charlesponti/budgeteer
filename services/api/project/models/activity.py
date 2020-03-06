from sqlalchemy import Boolean, Column, Integer, String

from enumn import Enum
from project import db


class ActivityType(Enum):
    DAILY = "DAILY"
    WEEKLY = "WEEKLY"
    MONTHLY = "MONTHLY"


class Activity(db.Model):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    name = Column(String(128), unique=True, nullable=False)
    type = Column(String(50), default=ActivityType.DAILY, nullable=False)
    cadence = Column(String(50), nullable=False)

    def __init__(self, email):
        self.email = email
