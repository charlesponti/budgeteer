from enum import Enum, unique

from sqlalchemy import Boolean, Column, Integer, String

from project import db


@unique
class ActivityType(Enum):
    GENERAL = "GENERAL"


@unique
class ActivityCadence(Enum):
    DAILY = "DAILY"
    WEEKLY = "WEEKLY"
    MONTHLY = "MONTHLY"


class Activity(db.Model):
    __tablename__ = "activity"
    id = Column(Integer, primary_key=True)
    name = Column(String(128), unique=True, nullable=False)
    activity_type = Column(
        String(50), default=ActivityType.GENERAL.name, nullable=False
    )
    cadence = Column(String(50), default=ActivityCadence.DAILY.name, nullable=False)

    def __init__(
        self,
        name,
        activity_type=ActivityType.GENERAL.name,
        cadence=ActivityCadence.DAILY.name,
    ):
        """
        An activity that the user does on a repeated basis (daily, weekly,
        monthly, etc)

        :param name: what is the name of the activity
        :type name: str
        :param activity_type: what type of activity is it
        :type activity_type: str
        :param cadence: how often does user do this activity
        :type cadence: str
        """
        self.name = name
        self.activity_type = activity_type
        self.cadence = cadence
