#!/usr/bin/env python3
from flask import Flask
from flask import jsonify

app = Flask(__name__)

#Test ceomment

@app.route('/hello')
def hello():
    return jsonify("Hello, World!")

if __name__ == "__main__":
    app.run(port=5000)