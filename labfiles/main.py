#comment for forced change
from flask import Flask, abort
from flask import jsonify
from flask import request
from sqlalchemy import null
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

app = Flask(__name__, static_folder='../client', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = "svargissadstrang"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


class Car(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  make = db.Column(db.String, nullable=False)
  model = db.Column(db.String, nullable=False)
  owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

  def __repr__(self):
    return '<Car {}: {} {} {}>'.format(self.id, self.make, self.model)

  def serialize(self):
    return dict(id=self.id, make=self.make, model=self.model)

  def serialize2(self):
    return dict(id=self.id, make=self.make, model=self.model, owner=self.user.serialize())


class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  mail = db.Column(db.String, nullable=False)
  car_id = db.relationship('Car', backref='user', lazy=True)
  is_admin = db.Column(db.Boolean, default=False, nullable=False)
  password_hash = db.Column(db.String, nullable=False)

  def __repr__(self):
    return '<User {}: {} {}>'.format(self.id, self.name, self.mail)

  def serialize(self):
    return dict(id=self.id, name=self.name, isadmin = self.is_admin, mail=self.mail)

  def set_password(self, password):
    self.password_hash= bcrypt.generate_password_hash(password).decode('utf8')

   

@app.route("/login", methods= ['POST'])
def login():
  if request.method == 'POST':
    indata = request.get_json()
    users = User.query.all()
    for x in users:
      if x.mail == indata["mail"]:
       
        if bcrypt.check_password_hash(x.password_hash, indata['password']):         
          access_token = create_access_token(identity = x.serialize())
          dict = {"token" : access_token,
                  "user" : x.serialize()
                  }

          return jsonify(dict), 200
        else:
          return "wrong password", 401
    
    return "no such user", 401
  



@app.route("/")
def client():
  return app.send_static_file("client.html")

@app.route('/sign-up', methods= ['GET', 'POST'])
def signup():

  if request.method == 'POST':
    new_user = request.get_json()
    x = User(name = new_user["name"], mail = new_user["mail"])
    x.set_password(new_user["password"])
    db.session.add(x)
    db.session.commit()
    user_id = x.id
    i = User.serialize(User.query.get_or_404(user_id))
    return i

@app.route('/cars/<int:car_id>', methods= ['PUT', 'GET', 'DELETE'])
@jwt_required()
def cars(car_id):
  if request.method == 'GET':
    temp = Car.query.filter_by(id = car_id).first_or_404()
    if temp.user is not None:
      return jsonify(temp.serialize2())
    else:
      return jsonify(temp.serialize())
  elif request.method == 'PUT':
     car = request.get_json()
     car["id"]= car_id
     Car.query.filter_by(id = car_id).update(car)     
     temp = Car.query.filter_by(id = car_id).first_or_404()
    
     
     db.session.commit()
     
     return jsonify(temp.serialize())
  elif request.method == 'DELETE':
    new_car = Car.query.get_or_404(car_id)
    db.session.delete(new_car)
    db.session.commit()
    return "OK", 200

@app.route('/carsb/<int:car_id>/booking', methods= ['POST'])
@jwt_required()
def carsb(car_id):
  
  if request.method == 'POST':
    temp = Car.query.filter_by(id = car_id).first_or_404()
    x = int(get_jwt_identity().get('id'))
    if temp.user is None:
      setattr(temp, "owner_id", x)
      db.session.commit()       
      return "success : true"
    else:
      return "success : false"

@app.route('/carsb/<int:car_id>/unbook', methods= ['POST'])
@jwt_required()
def carsub(car_id):
  
  if request.method == 'POST':
    temp = Car.query.filter_by(id = car_id).first_or_404()
    x = int(get_jwt_identity().get('id'))
    if temp.owner_id == x:
      setattr(temp, "owner_id", None)
      db.session.commit()       
      return "Avbokad"
    else:
      return "Inte din bokning"




# @app.route('/user/<int:user_id>/cars', methods=['GET'])
# @jwt_required()
# def user_cars(user_id):
#   if request.method == 'GET':
#     temp = User.query.filter_by(id = user_id).first_or_404()
#     car_list = []
#     if temp.car_id is not None:
#       for x in temp.car_id:
#         car_list.append(x.serialize())
#     return jsonify(car_list)




@app.route('/user/<int:user_id>', methods= ['PUT', 'GET', 'DELETE'])
@jwt_required()
def users(user_id):
  if request.method == 'GET':
    temp = User.query.filter_by(id = user_id).first_or_404()
    return jsonify(temp.serialize())
  elif request.method == 'PUT':
     
     user = request.get_json()
     user["id"]= user_id
     User.query.filter_by(id = user_id).update(user)     
     temp = User.query.filter_by(id = user_id).first_or_404()
     
     db.session.commit()
     
     return jsonify(temp.serialize())
  elif request.method == 'DELETE':
    temp_user = User.query.get_or_404(user_id)
   

    db.session.delete(temp_user)
    db.session.commit()
    return "200 OK"





  

@app.route('/cars', methods=['GET','POST'])
@jwt_required()
def car():
  
  if request.method == 'GET':
    car = Car.query.all()
    car_list = []
    
    for x in car:
      
      if x.owner_id is not None:
        car_list.append(x.serialize2())
      elif x.owner_id is None:
        car_list.append(x.serialize())    
    return jsonify(car_list)

  elif request.method == 'POST': 
    new_car = request.get_json()
    x = Car(make = new_car["make"], model = new_car["model"], owner_id = new_car["owner_id"])
    db.session.add(x)
    db.session.commit()
    car_id = x.id
    i = Car.serialize(Car.query.get_or_404(car_id))
    return i
  

  return "401"


@app.route('/users', methods=['GET','POST'])
@jwt_required()
def user():
  if request.method == 'GET':
    user = User.query.all()
    user_list = []
    for x in user:
      user_list.append(x.serialize())

    return jsonify(user_list)
  elif request.method == 'POST': 
    new_user = request.get_json()
    x = User(name = new_user["name"], mail = new_user["mail"])
    db.session.add(x)
    db.session.commit()
    user_id = x.id
    i = User.serialize(User.query.get_or_404(user_id))
    return i 
    


if __name__ == "__main__":
    app.run(debug=True)