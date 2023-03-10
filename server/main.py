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
import shippo


app = Flask(__name__, static_folder='../client', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = "svargissadstrang"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

#Nedan finns attribut och definitioner för produkter
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

#Attribut och definitioner för användare
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
    return '<Order_history {}: {} >'.format(self.id, self.user_id)

class Orders(db.Model):
  order_nr = db.Column(db.Integer, primary_key = True)
  amount = db.Column(db.Integer)
  order_history_id = db.Column(db.Integer, db.ForeignKey('order_history.id'))
  

  def __repr__(self):
    return '<Orders {}: {} {}>'.format(self.order_nr, self.amount, self.order_history_id)

  def serialize(self):
    return dict(id=self.order_nr, amount=self.amount, order_history_id=self.order_history_id)

class Order_item (db.Model):
  id = db.Column(db.Integer, primary_key = True )
  product_id = db.Column(db.Integer, db.ForeignKey('product.product_id'))
  quantity = db.Column(db.Integer)
  order_nr = db.Column(db.Integer, db.ForeignKey('orders.order_nr'))
  

  def __repr__(self):
    return '<Order_item {}: {} {} {}  >'.format(self.id, self.product_id, self.quantity, self.order_nr)

  def serialize(self):
    return dict(id=self.id, product_id=self.product_id, quantity=self.quantity, order_nr = self.order_nr)


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




stripe.api_key = 'sk_test_51KmeJFGTjasXI1q99HgReiS1UmSZmF3a2dZSnyq7dtYnoHUw8HPyoLwqCIM6Sckrhgw1bwtixC8BXpZQgyExtnzQ00q350DBtl'



 


shippo.api_key = "<shippo_test_4539126ef7ee2c56604e453728c9feb81c8e1494>"
shippo.config.api_key= "shippo_test_4539126ef7ee2c56604e453728c9feb81c8e1494"
@app.route('/createShipment', methods=['POST'])

def shipment():
  address_from = {
  "name": "ToneHub",
    "street1": "965 Mission St",
    "street2": "",
    "city": "San Francisco",
    "state": "CA",
    "zip": "94103",
    "country": "US",
    "phone": "+1 555 341 9393",
  }

# Example address_to object dict
# The complete reference for the address object is available here: https://goshippo.com/docs/reference#addresses
  data = request.get_json(); 

  address_to = {
       "name": data["name"],
    "street1": data["address"],
    "street2": "",
    "city": data["city"],
    "state": "",
    "zip": data["zip"],
    "country": "SE",
    "phone": data["phone"],
    "email": data["email"],
    
  }


# parcel object dict
# The complete reference for parcel object is here: https://goshippo.com/docs/reference#parcels
  parcel = {
    "length": "5",
    "width": "5",
    "height": "5",
    "distance_unit": "cm",
    "weight": "2",
    "mass_unit": "kg",
  }

  customs_item = {
    "description": "T-Shirt",
    "quantity": 2,
    "net_weight": "400",
    "mass_unit": "g",
    "value_amount": "20",
    "value_currency": "USD",
    "origin_country": "US",
    "tariff_number": "",
  }

# Creating the CustomsDeclaration
# The details on creating the CustomsDeclaration is here: https://goshippo.com/docs/reference#customsdeclarations
  customs_declaration = shippo.CustomsDeclaration.create(
    contents_type='MERCHANDISE',
    contents_explanation='T-Shirt purchase',
    non_delivery_option='RETURN',
    certify=True,
    certify_signer='Mr Hippo',
    items=[customs_item])


# Example shipment object
# For complete reference to the shipment object: https://goshippo.com/docs/reference#shipments
# This object has asynchronous=False, indicating that the function will wait until all rates are generated before it returns.
# By default, Shippo handles responses asynchronously. However this will be depreciated soon. Learn more: https://goshippo.com/docs/async
  shipment_international = shippo.Shipment.create(
    address_from=address_from,
    address_to=address_to,
    parcels=[parcel],
    customs_declaration=customs_declaration.object_id,
    asynchronous=False
  )


# Rates are stored in the `rates` array
# The details on the returned object are here: https://goshippo.com/docs/reference#rates
# Get the first rate in the rates results for demo purposes.
  
  rate_international = shipment_international.rates[0]

# Purchase the desired rate.
# The complete information about purchasing the label: https://goshippo.com/docs/reference#transaction-create
  transaction_international = shippo.Transaction.create(
    rate=rate_international.object_id, asynchronous=False)

# print label_url and tracking_number
  if transaction_international.status == "SUCCESS":
    print("Purchased label with tracking number %s" %
          transaction_international.tracking_number)
    print("The label can be downloaded at %s" %
          transaction_international.label_url)
    return  transaction_international.label_url
  else:   
    print("Failed purchasing the label due to:")
    for message in transaction_international.messages:
        print("- %s" % message['text'])
    return "200"




  
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
    print(new_user["first_name"])  
    x = User(first_name = new_user["first_name"], last_name = new_user["last_name"], email = new_user["email"])
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


#Route för att hämta user adds samt radera user adds
@app.route('/useradd/<int:user_id>', methods = ['GET', 'DELETE'] )
def useradd(user_id):
    if request.method == 'GET':
      
      temp = Product.query.filter_by(seller = user_id)
      user_add =[]
    
      for x in temp:
        
        user_add.append(x.serialize())
 
      return jsonify(user_add)
   
    elif request.method == 'DELETE':
      add = request.get_json()
      products = Product.query.filter_by(seller = user_id)
      #print(add.namn)
      for x in products:
        if x.name == add["namn"]:
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
    print(x)
    db.session.add(x)
    db.session.commit()
    return 20

#Supposed to create and get orders, can create orders  but does not insert an amount yet. 
# Might need to make a PUT function for that. Also GET haven't been figured out yet.
@app.route('/order/<int:user_id>', methods = ['POST', 'GET'])
def createorders(user_id):
  if request.method == 'POST':
    print(user_id)
    orderhist = Order_history.query.filter_by(user_id=user_id).first()
    print("kommer vi hit")
    #print(orderhist)
    x = Orders(order_history_id = orderhist.id)
    print("orderhist.id=")
    print(orderhist.id)
    db.session.add(x)
    db.session.commit()

    orders = Orders.query.filter_by(order_history_id = orderhist.id).all()
    print(len(orders))
    order = orders[len(orders)-1]
    print("Order: ")
    print(order.order_nr)
    #return order.order_nr
    # order_id = Orders.query.get_or_404(order.order_nr)
    # print("order id:")
    # print(order_id)

    print("vad är detta?")
    user_session = Shopping_Session.query.filter_by(user_id = user_id).first()
    print(user_session.id)
    order_items = Cart_Item.query.filter_by(session_id = user_session.id).all() #lades till
    print(len(order_items))
    
    for x in order_items:
      item = Order_item(product_id = x.product_id)
      item.quantity = x.quantity
      item.order_nr = order.order_nr
      db.session.add(item)
    #orderhist = Order_history.query.filter_by(user_id = user_id)
    #x = Orders(order_history_id = orderhist.id)
    db.session.commit()

    prod_hist_id = Order_item.query.filter_by(order_nr = order.order_nr).all()
    sum = 0
    for x in prod_hist_id:
      prod_item = Product.query.filter_by(product_id = x.product_id).first()
      sum += prod_item.price * x.quantity
      print(sum)
    order.amount = sum
    db.session.commit()
    return jsonify(order.order_nr) #skicka tbx ordr_id
  elif request.method == 'GET': 
    #DENNA FUNGERAR INTE ÄN
   

    orderhistory = Order_history.query.filter_by(user_id=user_id).first()
    order = Orders.query.filter_by(order_history_id = orderhistory.id).all()

    bought_products = []

    for x in order:

      bought_products.append(x.serialize())

    
    
    # p = Product.query.filter_by(product_id = something)
    # order_list =[]

    #print(bought_products)

    # for x in order:
    #   order_list.append(x.serialize())
    return jsonify(bought_products)
  return "401"

#Ska lägga till orderItems som har samma order_nr som foreign key. 
@app.route('/orderitems/<int:order_no>', methods =['GET'])
def getorderitems(order_no): #user_id innan
  if request.method == 'GET':
    print(order_no)
    orders = Order_item.query.filter_by(order_nr = order_no)
    #print(orders)
    product_list =[]

    for x in orders:
      product_list.append(x.serialize())
    #print(product_list)
    return jsonify(product_list)
  else:
    return "401"

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
    if Shopping_Session.query.filter_by(user_id = user_id).first() is not None:
      temp_Session = Shopping_Session.query.filter_by(user_id = user_id).first_or_404()
      temp_Item = Cart_Item.query.filter_by(session_id = temp_Session.id)
      item_list = []
      for x in temp_Item:
        item_list.append(x.serialize())
      
      return jsonify(temp.serialize(), temp_Session.serialize(), item_list)

    return jsonify(temp.serialize())

  elif request.method == 'PUT':
    user = request.get_json()
    x = User.query.filter_by(user_id = user_id).first_or_404()
    if "password_hash" in user != None:
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

#Route för att lägga till produkter i varukorgen
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


#Route för att ta bort produkter från varukorgen
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


#Route för att ta bort alla produkter från varukorgen
@app.route('/clear-cart', methods= ['POST'])
@jwt_required()
def clearCart():
  if request.method == 'POST':
    user = get_jwt_identity().get('user_id')
    z = Shopping_Session.query.filter_by(user_id = user).first_or_404()
    
    temp_Item = Cart_Item.query.filter_by(session_id = z.id)
    for item in temp_Item:
      print("kvant"+str(item.quantity))
      print("id"+str(item.product_id))
      product = Product.query.filter_by(product_id = item.product_id).first_or_404()
      x = product.quantity
      x = x + item.quantity
      data_to_updateProduct = {"quantity" : x}
      Product.query.filter_by(product_id = item.product_id).update(data_to_updateProduct)
      db.session.commit()
      
    temp_Item.delete()
    db.session.commit()
    # Cart_Item.query.filter_by(session_id = z.id, product_id = product.product_id).update(data_to_updateCartItem)
    # data_to_updateProduct = {"quantity" : x}
    # Product.query.filter_by(product_id = product_id).update(data_to_updateProduct)
    # db.session.commit()

    return "Tog bort alla produkter"
  else:
    return "Produkten finns inte i din varukorg"


if __name__ == "__main__":
  app.run(debug=True)