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
import json
from flask import render_template, render_template_string
#import cv2
#from PIL import Image
from pathlib import Path



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
  image = db.Column(db.String, nullable = False)
  year = db.Column(db.Integer, nullable = False)
  type = db.Column(db.String, nullable = False)
  new_or_not = db.Column(db.Integer, nullable = False)
  quantity = db.Column(db.Integer, nullable = True)
  seller = db.Column(db.Integer, nullable = False)

  def __repr__(self):
    return '<Product {}: {} {} {} {} {} {} {} {} {} {} {}>'.format(self.product_id, self.brand, self.model, self.name, self.price, self.color, self.image, self.year, self.type, self.new_or_not, self.quantity, self.seller)

  def serialize(self):
    return dict(product_id=self.product_id, brand=self.brand, model=self.model, name=self.name, price=self.price, color=self.color, image=self.image, year=self.year, type=self.type, new_or_not = self.new_or_not, quantity = self.quantity, seller = self.seller)

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
class Order_history(db.Model):
  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column (db.Integer, db.ForeignKey('user.user_id'))

  def __repr__(self):
    return '<Order_history {}: {} {}>'.format(self.id, self.user_id)

class Orders(db.Model):
  order_nr = db.Column(db.Integer, primary_key = True)
  amount = db.Column(db.Integer)
  order_history_id = db.Column(db.Integer, db.ForeignKey('order_history.id'))
  

  def __repr__(self):
    return '<Orders {}: {} {} {} >'.format(self.order_nr, self.amount, self.order_history_id)

class Order_item (db.Model):
  id = db.Column(db.Integer, db.ForeignKey('product.product_id'), primary_key = True )
  quantity = db.Column(db.Integer)
  order_nr = db.Column(db.Integer, db.ForeignKey('orders.order_nr'))
  

  def __repr__(self):
    return '<Order_item {}: {} {} {} >'.format(self.id, self.quantity, self.order_nr)


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




#stripe.api_key = 'sk_test_51KiDHOFa9gwuZdKJw6ouVqm5m6mUYok8kEYg3BYtOH1kqnAFvH9YiOe7IGd7sMGm0zTvR4XYwTxI66u0TVYdiOjN00AeMRr3Nz'
stripe.api_key = 'sk_test_51KmeJFGTjasXI1q99HgReiS1UmSZmF3a2dZSnyq7dtYnoHUw8HPyoLwqCIM6Sckrhgw1bwtixC8BXpZQgyExtnzQ00q350DBtl'

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
  if request.method == 'POST':
    info = request.get_json()
    print("haksjdnaksjdnjkasndkjnaskjdnkasndnaksjndjknaskjndkjasndkjnaskjndkanskdnajksndknjas")
    total = info["price"]
    session = stripe.checkout.Session.create(
      line_items=[{
        'price_data': {
          'currency': 'SEK',
          'product_data': {
            'name': 'GItarr',
          
          },
          'unit_amount': total,
        },
        'quantity': 1,
      }],
      mode='payment',
      success_url='http://localhost:5000/',
      cancel_url='http://localhost:5000/',

  )

  return session.url


  
def calculate_order_amount(items):
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    return 1400

#kanske behöver göras om för att göra beräkning på server
@app.route('/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)
        
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            #amount=calculate_order_amount(data['items']),            
            amount=data,
            currency='sek',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403

@app.route('/order/success', methods=['GET'])
def order_success():
  session = stripe.checkout.Session.retrieve(request.args.get('session_id'))
  customer = stripe.Customer.retrieve(session.customer)

  return render_template_string('<html><body><h1>Thanks for your order, {{customer.name}}!</h1></body></html>')



  
#Route for login-method
# Vet inte om for loopen i denna metod är optimal, känns långsamt att loopa igenom alla användare
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


#Route för att hämta user adds samt radera user adds -ej klar
@app.route('/useradd/<int:user_id>', methods = ['GET', 'DELETE'] )
def useradd(user_id):
    if request.method == 'GET':
      
      temp = Product.query.filter_by(seller = user_id)
      user_add =[]
    
      for x in temp:
        print("!")
        user_add.append(x.serialize())
 
      return jsonify(user_add)
   
    elif request.method == 'DELETE':
      add = request.get_json()
      products = Product.query.filter_by(seller = user_id)

      for x in products:
        if x.name == add.name:
         db.session.delete(x)
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
    x = Product(brand = new_product["brand"], model = new_product["model"], name = new_product["name"], price = new_product["price"], color = new_product["color"], image = new_product["image"], year = new_product["year"], type = new_product["type"], new_or_not = new_product["new_or_not"], seller = new_product["seller"], quantity = 1)
    db.session.add(x)
    db.session.commit()
    product_id = x.product_id
    i = Product.serialize(Product.query.get_or_404(product_id))
    InsertNewAndOldSQL('database_alternative_insert.sqlite')
    return i

  return "401"

  #Route för att lägga till bilder i filsystem
@app.route('/saveImg', methods = ['POST'])
def saveImg():
  if request.method == 'POST':
    img = request.files.get('file')   
    url = request.values.get('url')
   
    cwd = Path.cwd()
    mod_path = str(Path(__file__).parent.parent)
    path =  mod_path + '/client/images'   
    #filename = os.path.join(dirname, 'relative/path/to/file/you/want')   
    #img = img.save('savedimage.jpg')    
    img = img.save(f"{path}/"+url+".jpg")
    #cv2.imwrite('savedimage.jpg', img)    
   
  return "200"

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

#Route for adding order history
@app.route('/createorderhistory/<int:user_id>', methods =['POST'])
def createorderhistory(user_id):
  if request.method == 'POST':
    print("tries to create")
    x = Order_history( user_id= user_id)
    db.session.add(x)
    db.session.commit()
    return 20

#INTEKLAR
@app.route('/order/<int:user_id>', methods = ['POST', 'GET'])
def createorders(user_id):
  if request.method == 'POST':
    
    orderhist = Order_history.query.filter_by(user_id)
    x = Orders(order_history_id = orderhist.id)
    db.session.add(x)
    db.session.commit()
    return 200
  elif request.method == 'GET':
    order = Product.query.filter_by(order_nr = Order_history.query.filter_by(user_id).user_id)
    order_list =[]

    for x in order:
      order_list.append(x.serialize())
    return jsonify(order_list)
  return "401"

#Route for adding orderitems
@app.route('/orderitem/<int:user_id>', methods =['POST'])
def createorderitem(user_id):
  if request.method == 'POST':
    orderhist = Order_history.query.filter_by(user_id)
    x = Orders(order_history_id = orderhist.id)
    db.session.add(x)
    db.session.commit()
    return 200

#Route for getting orderitems



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
    x = User.query.filter_by(user_id = user_id).first_or_404()
    user["password_hash"] = bcrypt.generate_password_hash(user["password_hash"]).decode('utf8')
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