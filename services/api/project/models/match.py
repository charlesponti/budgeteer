from sqlalchemy import Boolean, Column, ForeignKey, Integer, String

from project import db
from project.models.user import User

from sqlalchemy.orm import relationship

class Match(db.Model):
    __tablename__ = "matches"
    id = Column(Integer, primary_key=True)
    user_1_id = Column(Integer, ForeignKey("user.id"))
    user_2_id = Column(Integer, ForeignKey("user.id"))
    user_1 = relationship("User", foreign_keys=[user_1_id])
    user_2 = relationship("User", foreign_keys=[user_2_id])

    def __init__(self, user1: User, user2: User):
        """
        When two users match with one another

        :param user1: First user to match
        :type user1: User
        :param user1: Second user to match
        :type user2: User
        """
        self.user1 = user1
        self.user2 = user2