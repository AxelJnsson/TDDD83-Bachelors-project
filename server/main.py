#!/usr/bin/env python3
from flask import Flask
from flask import jsonify
from flask import request
from sqlalchemy import null
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='../client', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Product(db.Model):
  id = db.Column(db.Integer, primary_key = True)
  brand = db.Column(db.String, nullable = False)
  model = db.Column(db.String, nullable = False)
  name = db.Column(db.String, nullable = False)
  price = db.Column(db.Integer, nullable = False)
  color = db.Column(db.String, nullable = False)
  year = db.Column(db.Integer, nullable = False)
  type = db.Column(db.String, nullable = False)

  def __repr__(self):
    return '<Product {}: {} {} {} {} {} {} {}>'.format(self.id, self.brand, self.model, self.name, self.price, self.color, self.year, self.type)

  def serialize(self):
    return dict(id=self.id, brand=self.brand, model=self.model, name=self.name, price=self.price, color=self.color, year=self.year, type=self.type)

class User(db.Model):
  id = db.Column(db.Integer, primary_key = True)
  email = db.Column(db.String, nullable = False)
  name = db.Column (db.String, nullable = False)
  isAdmin =db.Column(db.Boolean, nullable = False)



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

if __name__ == "__main__":
  app.run(debug=True)