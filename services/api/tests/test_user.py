from project.models.user import User


def test_user_creation():
    user = User(email="foo@bar.com")
    assert user.email == "foo@bar.com"
