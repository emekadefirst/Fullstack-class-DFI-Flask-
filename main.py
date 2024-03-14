from flask import Flask, render_template


apk = Flask(__name__) 


@apk.route("/home")
def home(name=None):
    return render_template('index.html', name=name)

if __name__ == "__main__":
    apk.run(debug=True)
