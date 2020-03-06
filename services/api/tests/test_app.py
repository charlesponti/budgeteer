import os

import requests
from dotenv import load_dotenv
from flask_testing import TestCase

from project import app

load_dotenv()


class App(TestCase):
    def create_app(self):
        app.config["TESTING"] = True
        return app

    def test_server_is_up_and_running(self):
        response = requests.get(f"http://localhost:5000/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), dict({"data": "Hello World"}))
