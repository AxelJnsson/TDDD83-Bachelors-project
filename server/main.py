#!/usr/bin/env python3
from flask import Flask
from flask import jsonify
from flask import request
from flask_bcrypt import Bcrypt
#from sqlalchemy import null
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from sqlalchemy import Integer

app = Flask(__name__, static_folder='../client', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = "svargissadstrang"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

class Product(db.Model):
  id = db.Column(db.Integer, primary_key = True)
  brand = db.Column(db.String, nullable = False)
  model = db.Column(db.String, nullable = False)
  name = db.Column(db.String, nullable = False)
  price = db.Column(db.Integer, nullable = False)
  color = db.Column(db.String, nullable = False)
  year = db.Column(db.Integer, nullable = False)
  type = db.Column(db.String, nullable = False)
  added = db.Column(db.Boolean, nullable = False)


  def __repr__(self):
    return '<Product {}: {} {} {} {} {} {} {} {}>'.format(self.id, self.brand, self.model, self.name, self.price, self.color, self.year, self.type, self.added)

  def serialize(self):
    return dict(id=self.id, brand=self.brand, model=self.model, name=self.name, price=self.price, color=self.color, year=self.year, type=self.type, added=self.added)

class User(db.Model):
  id = db.Column(db.Integer, primary_key = True)
  email = db.Column(db.String, nullable = False)
  name = db.Column (db.String, nullable = False)
  is_admin =db.Column(db.Boolean, default = False, nullable =True)
  password_hash = db.Column(db.String, nullable = False)
  items = db.Column(db.ARRAY(Integer), nullable = True)


  def __repr__(self):
    return '<User {}: {} {} {}>'.format(self.id, self.email, self.name, self.items)

  def serialize(self):
    return dict(id=self.id, email=self.email, name=self.name, is_admin=self.is_admin, items = self.items)

  def set_password(self, password):
    self.password_hash= bcrypt.generate_password_hash(password).decode('utf8')








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

@app.route('/sign-up', methods= ['GET', 'POST'])
def signup():

  if request.method == 'POST':
    new_user = request.get_json()
    x = User(name = new_user["name"], email = new_user["email"])
    x.set_password(new_user["password"])
    db.session.add(x)
    db.session.commit()
    user_id = x.id
    i = User.serialize(User.query.get_or_404(user_id))
    return i

@app.route('/product/<int:product_id>', methods = ['GET', 'DELETE', 'PUT'] )
def product(product_id):
    if request.method == 'GET':
      temp = Product.query.filter_by(id = product_id).first_or_404()
    # if temp.user is not None:
    #   return jsonify(temp.serialize2())
    # else:
      return jsonify(temp.serialize())
    elif request.method == 'PUT':
     product = request.get_json()
     product["id"]= product_id
     Product.query.filter_by(id = product_id).update(product)     
     temp = Product.query.filter_by(id = product_id).first_or_404()
    
     
     db.session.commit()
     
     return jsonify(temp.serialize())
    elif request.method == 'DELETE':
      new_product = Product.query.get_or_404(product_id)
      db.session.delete(new_product)
      db.session.commit()
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
    x = Product(brand = new_product["brand"], model = new_product["model"], name = new_product["name"], price = new_product["price"], color = new_product["color"], year = new_product["year"], type = new_product["type"])
    db.session.add(x)
    db.session.commit()
    product_id = x.id
    i = Product.serialize(Product.query.get_or_404(product_id))
    return i

  return "401"

@app.route('/user/<int:user_id>', methods = ['GET', 'PUT', 'DELETE'])
def users(user_id):
  if request.method == 'GET':
    temp = User.query.filter_by(id = user_id).first_or_404()
    return jsonify(temp.serialize())
  elif request.method == 'PUT':
    user = request.get_json()
    user["id"] = user_id
    User.query.filter_by(id = user_id).update(user)
    temp = User.query.filter_by(id = user_id).first_or_404()
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

@app.route('/product/<int:product_id>/adding', methods= ['POST'])
@jwt_required()
def productadd(product_id):

  if request.method == 'POST':
    temp = Product.query.filter_by(id = product_id).first_or_404()
    x = int(get_jwt_identity().get('id'))
    temp_user = User.query.filter_by(id = x.id).first_or_404()
    if temp.added is False:
      setattr(temp, "added", True)
      setattr(temp_user, "items", product_id)
      db.session.commit()       
    return "success : true"
  else:
    return "success : false"

# @app.route('/produect/<int:product_id>/unadding', methods= ['POST'])
# @jwt_required()
# def carsub(product_id):

#   if request.method == 'POST':
#     temp = Product.query.filter_by(id = product_id).first_or_404()
#     x = int(get_jwt_identity().get('id'))
#     if temp.user_id == x:
#       setattr(temp, "user_id", None)
#       db.session.commit()       
#       return "Avbokad"
#     else:
#       return "Inte din bokning"

if __name__ == "__main__":
  app.run(debug=True)