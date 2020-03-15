from pytest import fixture

from project import db
from project.models.match import Match
from project.models.user import User


@fixture
def user_male():
    return User(email="john.doe@gmail.com")


@fixture
def user_female():
    return User(email="jane.doe@gmail.com")


def test_match(user_male, user_female):
    match = Match(user1=user_male, user2=user_female)

    assert match.user1 == user_male
    assert match.user2 == user_female
