from flask import Flask, Response, request, session, jsonify
from flask_cors import CORS
import json
import logging
from SQLiteRepository.SQLiteReservationRepository import SQLiteReservatonRepository
from stub.ReservationRepositoryStub import ReservationRepositoryStub
from usecase.cancelReservationUsecase import CancelReservationUsecase
from usecase.getAvailableReservationListUsecase import GetAvailableReservationListUsecase
from usecase.getReservationTableUsecase import GetReservationTableUsecase
from entity.ReservationItem import ReservationItem
from usecase.registerReservationUsecase import RegisterReservationUsecase
from entity.IReservationRepository import IReservationRepository
db_path = "./reservation.db"
app = Flask(__name__)
log = logging.getLogger('werkzeug')
log.setLevel(logging.INFO)
CORS(app)

@app.route("/register", methods=["POST"])
def register():
    date = request.form.get("date")
    time  = request.form.get("time")
    num = request.form.get("member")
    tableType = request.form.get("tableType")
    table_id = request.form.get("table_id")
    name = request.form.get("name")
    repository  = SQLiteReservatonRepository(db_file=db_path)
    app.logger.info(f"date: {date}, time: {time}, num: {num}, tableType: {tableType}, name: {name}, table_id: {table_id}")
    registerUsecase = RegisterReservationUsecase(repository)
    reservationItem = ReservationItem(name, date, time, num, table_id)
    registerUsecase.registerReservation(reservationItem)
    return {"result": "success"}

@app.route("/get_table", methods=["GET"])
def get_table():
    date = request.args["date"]
    repository  = SQLiteReservatonRepository(db_file=db_path)
    usecase = GetReservationTableUsecase(repository)
    result = usecase.execute(date)
    return Response(json.dumps(result), mimetype='application/json')

@app.route("/get_availabletable", methods=["GET"])
def get_availabletable():
    date = request.args["date"]
    member = request.args["member"]
    tableType = request.args["tableType"]
    repository  = SQLiteReservatonRepository(db_file=db_path)
    usecase = GetAvailableReservationListUsecase(repository)
    app.logger.info(f"date: {date}, member: {member}, tableType: {tableType}")
    result = usecase.getAvailableReservationList(date, int(member), int(tableType))
    
    resultjson = [ r.to_dict() for r in result]
    app.logger.info(resultjson)

    return Response(json.dumps(resultjson), mimetype='application/json')

@app.route("/cancel", methods=["POST"])
def cancel():
    id = request.args["id"]
    repository  = SQLiteReservatonRepository(db_file=db_path)
    usecase = CancelReservationUsecase(repository)
    usecase.cancel(id)
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