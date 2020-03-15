from pytest import fixture

from project.models.user import User


@fixture
def user():
    return User(email="foo@bar.com")


def test_user_creation(user):
    assert user.email == "foo@bar.com"


def test_deactive(user):
    assert user.active == True
    user.deactivate()
    assert user.active == False
