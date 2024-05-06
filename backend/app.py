from flask import Flask, request, session, jsonify
from flask_cors import CORS
import logging
from SQLiteRepository.SQLiteReservationRepository import SQLiteReservatonRepository
from entity.IReservationRepository import IReservationRepository
repository : IReservationRepository = SQLiteReservatonRepository("reservation.db")
app = Flask(__name__)
log = logging.getLogger('werkzeug')
log.setLevel(logging.INFO)
CORS(app, origins=["http://localhost:3001"], allow_unsafe_werkzeug_debugger=True)

@app.route("/register", methods=["POST"])
def register():
    date = request.form.get("date")
    time  = request.form.get("time")
    num = request.form.get("member")
    tableType = request.form.get("tableType")
    name = request.form.get("name")
    app.logger.info(f"date: {date}, time: {time}, num: {num}, tableType: {tableType}, name: {name}")
    return {"result": "success"}

@app.route("/get_table", methods=["GET"])
def get_table():
    return {"result": "success"}

@app.route("/get_availabletable", methods=["GET"])
def get_availabletable():
    member = request.args["member"]
    tableType = request.args["tableType"]
    result =  repository.get_available_table(member, tableType)
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