from flask import Blueprint, jsonify, request
from uuid import uuid4

use_router = Blueprint('use_router', __name__, url_prefix='/user')

items = []


@use_router.route('/', methods=['GET'], strict_slashes=False)
def getUsers():
    return jsonify(items)


@use_router.route('/<string:item_id>', methods=['GET'], strict_slashes=False)
def getUserById(item_id):
    item = next((item for item in items if item["id"] == item_id), None)
    if item:
        return jsonify(item)
    return jsonify({"error": "Item not found"}), 404


@use_router.route('/', methods=['POST'], strict_slashes=False)
def createUser():
    print("Recebendo requisição POST...")
    new_item = request.get_json()
    print("Dados recebidos:", new_item)
    new_item["id"] = str(uuid4())
    items.append(new_item)
    return jsonify(new_item), 201


@use_router.route('/<string:item_id>', methods=['PUT'], strict_slashes=False)
def update_item(item_id):
    item = next((item for item in items if item["id"] == item_id), None)
    if item:
        updated_data = request.get_json()
        item.update(updated_data)
        return jsonify(item)
    return jsonify({"error": "Item not found"}), 404


@use_router.route('/<string:item_id>', methods=['DELETE'], strict_slashes=False)
def delete_item(item_id):
    global items
    items = [item for item in items if item["id"] != item_id]
    return jsonify({"message": "Item deleted"}), 200
