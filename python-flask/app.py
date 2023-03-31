from flask import Flask
from flask import request
from flask_cors import CORS
import uuid
from mockdata import mock_data

app = Flask(__name__)
cors = CORS(app, origins=["http://localhost:2000"])

# Endpoint for user story 1
@app.route("/api/get_all_products", methods=["GET"])
def get_all_products():
    if request.method == "GET":
        return {
            "all_products" : mock_data
        }

# Endpoint for user story 2
@app.route("/api/add_product", methods=["POST"])
def add_product():
    data = request.get_json()
    if request.method == "POST":
        mock_data.append({
            "productId": uuid.uuid4(),
            "productName": data["name"],
            "productOwnerName": data["owner"],
            "developers": data["developers"],
            "scrumMasterName": data["scrum"],
            "startDate": data["date"],
            "methodology": data["methodology"]
        })
        return {
            "all_products" : mock_data
        }

# Endpoint for user story 3
@app.route("/api/edit_product", methods=["POST"])
def edit_product():
    data = request.get_json()

    if request.method == "POST":
        for i in range(len(mock_data)):
            if mock_data[i]["productId"] == data["productId"]:
                mock_data[i] = {
                    "productId": data["productId"],
                    "productName": data["name"],
                    "productOwnerName": data["owner"],
                    "developers": data["developers"],
                    "scrumMasterName": data["scrum"],
                    "startDate": data["date"],
                    "methodology": data["methodology"]
                }
                return {
                    "all_products" : mock_data
                }
