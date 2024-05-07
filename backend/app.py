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
repository : IReservationRepository = ReservationRepositoryStub()
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
    name = request.form.get("name")
    app.logger.info(f"date: {date}, time: {time}, num: {num}, tableType: {tableType}, name: {name}")
    registerUsecase = RegisterReservationUsecase(repository)
    reservationItem = ReservationItem(name, date, time, num, tableType)
    registerUsecase.registerReservation(reservationItem)
    return {"result": "success"}

@app.route("/get_table", methods=["GET"])
def get_table():
    date = request.args["date"]
    usecase = GetReservationTableUsecase(repository)
    result = usecase.execute(date)
    return Response(json.dumps(result), mimetype='application/json')

@app.route("/get_availabletable", methods=["GET"])
def get_availabletable():
    app.logger.info(request.args["date"])
    date = request.args["date"]
    member = request.args["member"]
    tableType = request.args["tableType"]
    usecase = GetAvailableReservationListUsecase(repository)
    app.logger.info(f"date: {date}, member: {member}, tableType: {tableType}")
    result = usecase.getAvailableReservationList(date, int(member), int(tableType))
    resultjson = [ r.to_dict() for r in result]

    return Response(json.dumps(resultjson), mimetype='application/json')

@app.route("/cancel", methods=["POST"])
def cancel():
    id = request.args["id"]
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