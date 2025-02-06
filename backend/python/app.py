from flask import Flask
from flask_cors import CORS
from src.router.useRouter import use_router

app = Flask(__name__)
CORS(app)

app.register_blueprint(use_router)

if __name__ == '__main__':
    app.run(debug=True, port=3000)
