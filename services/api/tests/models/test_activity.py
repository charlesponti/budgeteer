from project.models.activity import Activity


def test_activity_default():
    activity = Activity(name="read")
    assert activity.name == "read"
    assert activity.activity_type == "GENERAL"
    assert activity.cadence == "DAILY"


def test_activity_modified():
    activity = Activity(name="read", activity_type="ENTERTAINMENT", cadence="WEEKLY")
    assert activity.name == "read"
    assert activity.activity_type == "ENTERTAINMENT"
    assert activity.cadence == "WEEKLY"
