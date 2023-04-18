from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from datetime import timedelta



db = SQLAlchemy()

def create_app():
	app = Flask(__name__)
	app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
	db.init_app(app)
	app.config['SECRET_KEY'] = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2NzIyOTMyNywiaWF0IjoxNjY3MjI5MzI3fQ.HH3Qn943a73tvqmZfQNLm45L1kdv5Dw4c9DlyOvUDa8'
	app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
	app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(hours=1)
	jwt = JWTManager(app)
	app.config['CORS_HEADERS'] = 'Content-Type'
	from .views import main
	app.register_blueprint(main)
	return app
