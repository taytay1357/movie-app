from . import db
from sqlalchemy import Column, ForeignKey, Integer, Table


class Movie(db.Model):
    __tablename__ = "movie_table"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    rating = db.Column(db.Integer)
    route = db.Column(db.String(100))
    synopsis = db.Column(db.String(1000))
    author = db.Column(db.String(50))
    genre = db.Column(db.String(50))
    year = db.Column(db.String(20))

class User(db.Model):
    __tablename__ = "user_table"
    __table_args__ = {'extend_existing': True}
    email = db.Column(db.String(100), primary_key=True)
    password = db.Column(db.String(50))
    role = db.Column(db.String(20))
    

class Reviews(db.Model):
    __tablename__ = "review_table"
    __table_args__ = {'extend_existing': True}
    review_id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(100), ForeignKey("user_table.email"))
    movie_id = db.Column(db.Integer, ForeignKey("movie_table.id"))
    star_rating = db.Column(db.Integer)
    comments = db.Column(db.String(200))
