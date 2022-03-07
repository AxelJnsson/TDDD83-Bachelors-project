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

  def serialize(self):
    return dict(id=self.id, brand=self.brand, model=self.model, name=self.name, price=self.price, color=self.color, year=self.year)

class User(db.Model):
  id = db.Column(db.Integer, primary_key = True)
  email = db.Column(db.String, nullable = False)
  name = db.Column (db.String, nullable = False)
  isAdmin =db.Column(db.Boolean, nullable = False)



@app.route('/product/<int:id>', methods = ['GET', 'DELETE', 'PUT'] )
def product(product_id):
    if request.method == 'GET':
      print("hello")

if __name__ == "__main__":
    app.run(port=5000)


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
    x = Product(id = new_product["id"], brand = new_product["brand"], model = new_product["model"], name = new_product["name"], price = new_product["price"], color = new_product["color"], year = new_product["year"])
    db.session.add(x)
    db.session.commit()
    product_id = x.id
    i = Product.serialize(Product.query.get_or_404(product_id))
    return i