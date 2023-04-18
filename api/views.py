from flask import Blueprint, jsonify, request, redirect, url_for, flash
from . import db
from .models import Movie
from .models import User
from .models import Reviews
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager, verify_jwt_in_request
import json
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import verify_jwt_in_request
from flask_jwt_extended import create_refresh_token

main = Blueprint('main', __name__)
CORS(main, supports_credentials=True)


@main.route('/add_movie', methods=['POST'])
def add_movie():
	movie_data = request.get_json()

	new_movie = Movie(title=movie_data['title'], rating=movie_data['rating'], route=movie_data['route'], year=movie_data['year'], genre=movie_data['genre'], author=movie_data['author'], synopsis=movie_data['synopsis'])

	db.session.add(new_movie)
	db.session.commit()

	return('Done', 201) 


@main.route('/movies', methods=['GET'])

def movies():
      movies = []
      movie_list = Movie.query.all()
         
         
      for movie in movie_list:
         movies.append({'id': movie.id, 'title' : movie.title, 'rating' : movie.rating, 'route': movie.route, 'year': movie.year, 'genre': movie.genre, 'author': movie.author, 'synopsis': movie.synopsis})

      res = {'movies': movies }
      return jsonify(res)

@main.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
   current_user = get_jwt_identity()
   query = User.query.filter_by(email=current_user).first()
   user = [current_user, query.role, len(query.password)]
   
   return jsonify(user), 200
      
@main.route('/reviews', methods=['GET'])
@jwt_required()
def reviews():
      current_user = get_jwt_identity()
      user_data = User.query.filter_by(email=current_user).first()
      review_data = Reviews.query.filter_by(user_email=current_user).all()
      reviews = []

      for review in review_data:
         current_movie = Movie.query.filter_by(id=review.movie_id).first()
         reviews.append({'id': review.review_id, 'route': current_movie.route, 'rating': review.star_rating, 'title': current_movie.title, 'comment': review.comments})
      
      return jsonify(reviews)

@main.route('/sign_up', methods=['POST'])
def sign_up():

   userData = request.get_json()
   user = User.query.filter_by(email=userData['email']).first()
   if user:
      flash('Email address already exists in our database')
      return 'Email address already exists'
   else:
      create_user = User(email=userData['email'], password=userData['password'], role='user')
      db.session.add(create_user)
      db.session.commit() 
         

   

   return 'Done', 201

@main.route('/manage', methods=['POST'])
def manage():
   movie_data = request.get_json()
   query = Movie.query.filter_by(title=movie_data).first()
   db.session.delete(query)
   db.session.commit()
   return jsonify('Done')


@main.route('/movies/search/', methods=['POST'])
def movie_page():
   reviewData = request.get_json()
   review = Reviews.query.filter_by(user_email=reviewData['user_email'], movie_id=reviewData['movie_id']).first()
   if review:
      return 'You have already published a review for this movie.'
   else:
      create_review = Reviews(user_email=reviewData['user_email'], movie_id=reviewData['movie_id'], star_rating=reviewData['rating'], comments=reviewData['comment'] )
      db.session.add(create_review)
      db.session.commit()
      return 'Review Published.'

# @main.after_request
# def refresh_expiring_jwts(response):
#    try:
#       exp_timestamp = get_jwt()["exp"]
#       now = datetime.now(timezone.utc)
#       target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
#       if target_timestamp > exp_timestamp:
#          access_token = create_access_token(identity=get_jwt_identity())
#          data = response.get_json()
#          if type(data) is dict:
#             data["access_token"] = access_token 
#             response.data = json.dumps(data)
#          return response
#    except (RuntimeError, KeyError):
#       # Case where there is not a valid JWT. Just return the original respone
#       return response

@main.route('/sign_in', methods=['POST'])

def sign_in():
   userData = request.get_json()
   email = userData['email']
   user = User.query.filter_by(email=email).first()

   def check_password(correct_password, entered_password):
      if (correct_password == entered_password):
         return True
      else: 
         return False

   if not user or not check_password(user.password, userData['password']):
      return ('Please check your login details and try again.')
   else:

      access_token = create_access_token(identity=userData['email'])
      refresh_token = create_refresh_token(identity=userData['email'])
      response = {"access_token": access_token, "refresh_token": refresh_token}
      return jsonify(response)


# @main.route("/refresh", methods=["POST"])
# @jwt_required(refresh=True)
# def refresh():
#     identity = request.get_json()
#     access_token = create_access_token(identity=identity['email'])
#     return jsonify(access_token=access_token)

@main.route('/logout', methods=['POST'])

def logout():
   response = jsonify({"msg": "logout successful"})
   unset_jwt_cookies(response)
   return response 