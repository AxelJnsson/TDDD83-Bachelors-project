#!/usr/bin/env python3
from faulthandler import dump_traceback_later
from sqlite3 import OperationalError
from tkinter.tix import Select
from flask import Flask
from flask import jsonify
from flask import request
from flask_bcrypt import Bcrypt
import sqlite3
from sqlite3 import OperationalError
#from sqlalchemy import null
#from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from sqlalchemy import engine_from_config


app = Flask(__name__, static_folder='../client', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = "svargissadstrang"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)






class Product(db.Model):
  product_id = db.Column(db.Integer, primary_key = True)
  brand = db.Column(db.String, nullable = False)
  model = db.Column(db.String, nullable = False)
  name = db.Column(db.String, nullable = False)
  price = db.Column(db.Integer, nullable = False)
  color = db.Column(db.String, nullable = False)
  year = db.Column(db.Integer, nullable = False)
  type = db.Column(db.String, nullable = False)
  new_or_not = db.Column(db.Integer, nullable = False)
  seller = db.Column(db.Integer, nullable = False)

  def __repr__(self):
    return '<Product {}: {} {} {} {} {} {} {} {} {}>'.format(self.product_id, self.brand, self.model, self.name, self.price, self.color, self.year, self.type, self.new_or_not, self.seller)

  def serialize(self):
    return dict(product_id=self.product_id, brand=self.brand, model=self.model, name=self.name, price=self.price, color=self.color, year=self.year, type=self.type, new_or_not = self.new_or_not, seller = self.seller)

class User(db.Model):
  user_id = db.Column(db.Integer, primary_key = True)
  email = db.Column(db.String, nullable = False)
  first_name = db.Column (db.String, nullable = False)
  last_name = db.Column (db.String, nullable = False)
  is_admin =db.Column(db.Boolean, default = False, nullable =True)
  password_hash = db.Column(db.String, nullable = False)

  def __repr__(self):
    return '<User {}: {} {}>'.format(self.id, self.email, self.first_name, self.last_name)

  def serialize(self):
    return dict(user_id=self.user_id, email=self.email, first_name=self.first_name, last_name= self.last_name, is_admin=self.is_admin)

  def set_password(self, password):
    self.password_hash= bcrypt.generate_password_hash(password).decode('utf8')

#Sets up database from database_schema
def executeTestSQL(filename):
  fd = open(filename, 'r')
  sqlFile = fd.read()
  fd.close()
  i=0

  sqlCommands = sqlFile.split(';')
  
  for command in sqlCommands:
    try:
      db.session.execute(command)
    except OperationalError as msg:
      print("Command skipped: ", msg)

#Inserts data from database_insert
def addTestSQL(filename):
  fd = open(filename, 'r')
  sqlFile = fd.read()
  fd.close()
  i=0

  sqlCommands = sqlFile.split(';')
  
  for command in sqlCommands:
    try:
      db.session.execute(command)
      db.session.commit()
    except OperationalError as msg:
      print("Command skipped: ", msg)

#Inserts data into new and old products
def InsertNewAndOldSQL(filename):
  fd = open(filename, 'r')
  sqlFile = fd.read()
  fd.close()
  i=0

  sqlCommands = sqlFile.split(';')
  
  for command in sqlCommands:
    try:
      db.session.execute(command)
      db.session.commit()
    except OperationalError as msg:
      print("Command skipped: ", msg)


#Does the setupdatabase routine
def setUpDatabase():
  #global connection 
  #connection = db.session.connection()
  executeTestSQL('database_schema.sqlite')
  addTestSQL('database_insert.sqlite')
  InsertNewAndOldSQL('database_alternative_insert.sqlite')
  #connection.close()
  print("Succesfully loaded database")
setUpDatabase()




@app.route("/login", methods = ['POST'])
def login():
  if request.method == 'POST':
    indata = request.get_json()
    users = User.query.all()
    for x in users:
      if x.email == indata["email"]:
        if bcrypt.check_password_hash(x.password_hash, indata['password']):
          access_token = create_access_token(identity = x.serialize())
          dict = {"token" : access_token,
                  "user" : x.serialize() 
                  }
          return jsonify(dict), 200
        else:
          return "wrong password", 401
    
    return "no such user", 401

@app.route('/')
def client():
  
  return app.send_static_file("home.html")
  

@app.route('/sign-up', methods= [ 'POST'])
def signup():

  if request.method == 'POST':
    new_user = request.get_json()
    x = User(first_name = new_user["first_name"], last_name = new_user["last_name"], email = new_user["email"])
    x.set_password(new_user["password"])
    db.session.add(x)
    db.session.commit()
    user_id = x.user_id
    i = User.serialize(User.query.get_or_404(user_id))
    return i

@app.route('/product/<int:product_id>', methods = ['GET', 'DELETE', 'PUT'] )
def product(product_id):
    if request.method == 'GET':
      temp = Product.query.filter_by(product_id = product_id).first_or_404()
 
      return jsonify(temp.serialize())
    elif request.method == 'PUT':
     product = request.get_json()
     product["product_id"]= product_id
     Product.query.filter_by(product_id = product_id).update(product)     
     temp = Product.query.filter_by(product_id = product_id).first_or_404()
    
     
     db.session.commit()
     InsertNewAndOldSQL('database_alternative_insert.sqlite')
     return jsonify(temp.serialize())
    elif request.method == 'DELETE':
      new_product = Product.query.get_or_404(product_id)
      db.session.delete(new_product)
      db.session.commit()
      InsertNewAndOldSQL('database_alternative_insert.sqlite')
      return "OK", 200


@app.route('/product', methods = ['GET', 'POST'] )
def products():
  if request.method == 'GET':
    product = Product.query.all()
    product_list =[]

    for x in product:
      product_list.append(x.serialize())
    return jsonify(product_list)

  elif request.method == 'POST':
    new_product = request.get_json()
    x = Product(brand = new_product["brand"], model = new_product["model"], name = new_product["name"], price = new_product["price"], color = new_product["color"], year = new_product["year"], type = new_product["type"], new_or_not = new_product["new_or_not"], seller = new_product["seller"])
    db.session.add(x)
    db.session.commit()
    product_id = x.product_id
    i = Product.serialize(Product.query.get_or_404(product_id))
    InsertNewAndOldSQL('database_alternative_insert.sqlite')
    return i

  return "401"

@app.route('/newproduct', methods = ['GET'] )
def newproducts():
  if request.method == 'GET':
    
    product = Product.query.filter_by(new_or_not = 1)
    product_list =[]

    for x in product:
      product_list.append(x.serialize())
    return jsonify(product_list)
  return "401"

@app.route('/oldproduct', methods = ['GET'] )
def oldproducts():
  if request.method == 'GET':
    product = Product.query.filter_by(new_or_not = 0)
    product_list =[]

    for x in product:
      product_list.append(x.serialize())
    return jsonify(product_list)
  return "401"


@app.route('/user/<int:user_id>', methods = ['GET', 'PUT', 'DELETE'])
def users(user_id):
  if request.method == 'GET':
    temp = User.query.filter_by(user_id = user_id).first_or_404()
    return jsonify(temp.serialize())
  elif request.method == 'PUT':
    user = request.get_json()
    user["user_id"] = user_id
    User.query.filter_by(user_id = user_id).update(user)
    temp = User.query.filter_by(user_id = user_id).first_or_404()
    db.session.commit()
    return jsonify(temp.serialize())
  elif request.method == 'DELETE':
    temp_user = User.query.get_or_404(user_id)
    db.session.delete(temp_user)
    db.session.commit()
    return "200 OK"

@app.route('/user', methods = ['GET', 'POST'])
def user():
  if request.method == 'GET':
    user = User.query.all()
    user_list = []

    for x in user:
      user_list.append(x.serialize())
    return jsonify(user_list)
  
  elif request.method == 'POST':
    new_user = request.get_json()
    x = User(email = new_user["email"], name = new_user["name"])
    db.session.add(x)
    db.session.commit()
    user_id = x.id
    i = User.serialize(User.query.get_or_404(user_id))
    return i

if __name__ == "__main__":
  app.run(debug=True)