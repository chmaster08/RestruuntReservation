from flask import Flask, request, session

app = Flask(__name__)

@app.route("/register", methods=["POST"])
def register():
    time  = request.args["time"]
    member = request.args["member"]
    tableType = request.args["tableType"]
    return {"result": "success"}

@app.route("/get_table", methods=["GET"])
def get_table():
    return {"result": "success"}

@app.route("/get_availabletable", methods=["GET"])
def get_availabletable():
    member = request.args["member"]
    tableType = request.args["tableType"]
    return {"result": "success"}

@app.route("/login", methods=["POST"])
def login():
    id = request.args["id"]
    password = request.args["password"]
    if not check_login(id, password):
        session["login"] = True
        return {"result": "fail"}
    return {"result": "success"}

@app.route("/logout", methods=["POST"])
def logout():
    session.pop("login", None)
    return {"result": "success"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)


def check_login(id, password):
    return True