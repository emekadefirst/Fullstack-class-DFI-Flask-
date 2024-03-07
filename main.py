from flask import Flask # imports

apk = Flask(__name__) # initializing WSGI

#views(i.e the function and route on top of the function)
@apk.route("/") 
def hello_world():
    return "<p>Hello, World!</p>"


@apk.route("/home")
def home():
    return "<p>Welcom Home!</p>"
