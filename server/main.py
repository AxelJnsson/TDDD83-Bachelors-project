#!/usr/bin/env python3
from email.policy import default
from faulthandler import dump_traceback_later
#from msilib import Table
from sqlite3 import OperationalError
#!from tkinter.tix import Select
from flask import Flask
from flask import jsonify
from flask import request
from flask import redirect
from flask_bcrypt import Bcrypt
import sqlite3
#from sqlite3 import OperationalError
from sqlalchemy import null
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from sqlalchemy import Column, Integer, table
from sqlalchemy import engine_from_config
import stripe
import os

#stripe_keys = {
 #   "secret_key": os.environ["STRIPE_SECRET_KEY"],
 #   "publishable_key": os.environ["STRIPE_PUBLISHABLE_KEY"],
#}

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
  quantity = db.Column(db.Integer, nullable = True)
  seller = db.Column(db.Integer, nullable = False)

  def __repr__(self):
    return '<Product {}: {} {} {} {} {} {} {} {} {} {}>'.format(self.product_id, self.brand, self.model, self.name, self.price, self.color, self.year, self.type, self.new_or_not, self.quantity, self.seller)

  def serialize(self):
    return dict(product_id=self.product_id, brand=self.brand, model=self.model, name=self.name, price=self.price, color=self.color, year=self.year, type=self.type, new_or_not = self.new_or_not, quantity = self.quantity, seller = self.seller)

class User(db.Model):
  user_id = db.Column(db.Integer, primary_key = True)
  email = db.Column(db.String, nullable = False)
  first_name = db.Column (db.String, nullable = False)
  last_name = db.Column (db.String, nullable = False)
  is_admin =db.Column(db.Integer, default = 0, nullable = False)
  password_hash = db.Column(db.String, nullable = False)
 # cart = db.relationship('Cart', backref='user', lazy = True) #https://fabric.inc/blog/shopping-cart-database-design/

  def __repr__(self):
    return '<User {}: {} {}>'.format(self.user_id, self.email, self.first_name, self.last_name)

  def serialize(self):
    return dict(user_id=self.user_id, email=self.email, first_name=self.first_name, last_name= self.last_name, is_admin=self.is_admin)

  #def serialize2(self, session):
   # return dict(user_id=self.user_id, email=self.email, first_name=self.first_name, last_name= self.last_name, is_admin=self.is_admin, shopping_session = session)

  def set_password(self, password):
    self.password_hash= bcrypt.generate_password_hash(password).decode('utf8')

class Shopping_Session(db.Model):
  __tablename__ = 'shopping_session'
  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=True)
  total = db.Column(db.Integer, nullable = True, default = 0)
  cart_item = db.relationship('Cart_Item', backref='shopping_session', lazy = True)
  
  def __repr__(self):
    return '<Shopping Session {}: {} {} {}>'.format(self.id, self.user_id, self.total, self.cart_item)

  def serialize(self):
    return dict(id=self.id, user_id=self.user_id, total=self.total)

class Cart_Item(db.Model):
  id = db.Column(db.Integer, primary_key = True)
  product_id = db.Column(db.Integer, db.ForeignKey('product.product_id'), nullable = True)
  quantity = db.Column(db.Integer, nullable = True, default = 0)
  session_id = db.Column(db.Integer, db.ForeignKey('shopping_session.id'), nullable = True)
  #session = db.relationship('Shopping_Session', back_populates='cart_item', lazy = True)

  def __repr__(self):
    return '<Product {}: {} {} {} {}>'.format(self.id, self.product_id, self.quantity, self.session_id)

  def serialize(self):
    return dict(id=self.id, product_id=self.product_id, quantity=self.quantity)
#tror inte denna kommer behövas eftersom produkterna skriver ut sig själva
#Behövs inte den så att man får datan på rätt format?
  # def serialize(self):
  #   return dict(id=self.id, product_id=self.product_id, quantity=self.quantity, session_id= self.session_id)
  

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




stripe.api_key = 'sk_test_51KiDHOFa9gwuZdKJw6ouVqm5m6mUYok8kEYg3BYtOH1kqnAFvH9YiOe7IGd7sMGm0zTvR4XYwTxI66u0TVYdiOjN00AeMRr3Nz'

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
  session = stripe.checkout.Session.create(
    line_items=[{
      'price_data': {
        'currency': 'SEK',
        'product_data': {
          'name': 'Total',
         
        },
        'unit_amount': 112100,
      },
      'quantity': 1,
    }],
    mode='payment',
    success_url='http://localhost:5000/',
    cancel_url='http://localhost:5000/',

  )

  return redirect(session.url, code=303)
  
#Route for login-method
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
          session = Shopping_Session(user_id = x.user_id) #skapar en ny session när någon loggar in
          db.session.add(session)
          db.session.commit()
          return jsonify(dict), 200
        else:
          return "wrong password", 401
    
    return "no such user", 401

@app.route('/')
def client():  
  return app.send_static_file("home.html")
  
#Route allowing the user to sign up
@app.route('/sign-up', methods= ['POST'])
def signup():

  if request.method == 'POST':
    new_user = request.get_json()    
    x = User(last_name = new_user["last_name"], first_name = new_user["firstname"],  email = new_user["email"])
    x.set_password(new_user["password"])
    db.session.add(x)
    db.session.commit()
    user_id = x.user_id
    i = User.serialize(User.query.get_or_404(user_id))
    return i

#Route for get, delete and put a specific product
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

#Route for getting all products och posting a product
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

#Route for getting only new products
@app.route('/newproduct', methods = ['GET'] )
def newproducts():
  if request.method == 'GET':
    
    product = Product.query.filter_by(new_or_not = 1)
    product_list =[]

    for x in product:
      product_list.append(x.serialize())
    return jsonify(product_list)
  return "401"

#Route for getting only old products
@app.route('/oldproduct', methods = ['GET'] )
def oldproducts():
  if request.method == 'GET':
    product = Product.query.filter_by(new_or_not = 0)
    product_list =[]

    for x in product:
      product_list.append(x.serialize())
    return jsonify(product_list)
  return "401"

#Route for getting, changing or deleting specific users
@app.route('/user/<int:user_id>', methods = ['GET', 'PUT', 'DELETE'])
def users(user_id):
  if request.method == 'GET':
    temp = User.query.filter_by(user_id = user_id).first_or_404()
    temp_Session = Shopping_Session.query.filter_by(user_id = user_id).first_or_404()
    temp_Item = Cart_Item.query.filter_by(session_id = temp_Session.id)
    item_list = []
    for x in temp_Item:
      item_list.append(x.serialize())

    return jsonify(temp.serialize(), temp_Session.serialize(), item_list)

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

#Route for getting all users or adding a user
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


@app.route('/product/<int:product_id>/adding', methods= ['POST'])
@jwt_required()
def productadd(product_id):

  if request.method == 'POST':
    user = get_jwt_identity().get('user_id')
    product = Product.query.filter_by(product_id = product_id).first_or_404()
    if product.quantity > 0:
      x = product.quantity
      x = x - 1
      data_to_updateProduct = {"quantity" : x}
      Product.query.filter_by(product_id = product_id).update(data_to_updateProduct)

      z = Shopping_Session.query.filter_by(user_id = user).first_or_404()
      items = Cart_Item.query.filter_by(session_id = z.id).all()
    
      if not items:
        cart_item = Cart_Item(product_id = product.product_id, session_id = z.id) #skapar en ny cart_item
        db.session.add(cart_item)
        db.session.commit()
        print("bla")  

      items = Cart_Item.query.filter_by(session_id = z.id).all()
      sum = 0
      for x in items:
        if x.product_id == product_id:
          sum = sum + 1

      if sum == 0:
        cart_item = Cart_Item(product_id = product.product_id, session_id = z.id) #skapar en ny cart_item
        db.session.add(cart_item)
        db.session.commit()
      
      item = Cart_Item.query.filter_by(session_id = z.id, product_id = product.product_id).first_or_404()
      y = item.quantity + 1
      data_to_updateCartItem = {"quantity" : y}
      Cart_Item.query.filter_by(session_id = z.id, product_id = product.product_id).update(data_to_updateCartItem)
      db.session.commit()
     

    return "success : true"
  else:
    return "success : false"



@app.route('/product/<int:product_id>/unadding', methods= ['POST'])
@jwt_required()
def carsub(product_id):

  
  if request.method == 'POST':
    user = get_jwt_identity().get('user_id')
    product = Product.query.filter_by(product_id = product_id).first_or_404()
    

    z = Shopping_Session.query.filter_by(user_id = user).first_or_404()
    print("hej")
    item = Cart_Item.query.filter_by(session_id = z.id, product_id = product.product_id).first_or_404()

    if item.quantity == 1:
      db.session.delete(item)
    else:
      y = item.quantity - 1
      data_to_updateCartItem = {"quantity" : y}
      Cart_Item.query.filter_by(session_id = z.id, product_id = product.product_id).update(data_to_updateCartItem)
    
    x = product.quantity
    x = x + 1
    data_to_updateProduct = {"quantity" : x}
    Product.query.filter_by(product_id = product_id).update(data_to_updateProduct)
    db.session.commit()

    return "Tog bort produkt"
  else:
    return "Produkten finns inte i din varukorg"

if __name__ == "__main__":
  app.run(debug=True)