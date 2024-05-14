import configparser
from datetime import datetime, timedelta
from flask import Flask, Response, request, session, jsonify
from flask_cors import CORS
import hashlib
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
g_TIMEOUT_MINUTES = 10
app = Flask(__name__)
log = logging.getLogger('werkzeug')
log.setLevel(logging.INFO)
CORS(app)

def saveTokenAndExpiration(token,expiration):
    config = configparser.ConfigParser()
    config.add_section('Token')
    config.set('Token','adminToken', token)
    config.set('Token','adminExpire', expiration)
    with open('token.config','w') as f:
        config.write(f)

def readTokenAndExpiration():
    config = configparser.ConfigParser()
    config.read('./token.config')
    token = config.get('Token','adminToken')
    expstr = config.get('Token','adminExpire')
    exp = datetime.strptime(expstr,'%Y-%m-%d-%H-%M-%S')
    return (token, exp)

def IsValidToken(clientToken):
    token , exp = readTokenAndExpiration()
    if clientToken != token:
        return False
    if datetime.now() > exp:
        return False
    return True

def generateNewToken():
    ct = datetime.now()
    exp = ct + timedelta(minutes=g_TIMEOUT_MINUTES)
    expstr = exp.strftime('%Y-%m-%d-%H-%M-%S')
    hash = hashlib.sha1(expstr.encode()).hexdigest()
    return (hash, expstr)

def getToken():
    hash, exp = generateNewToken()
    saveTokenAndExpiration(hash, exp)
    #TODO Tokenを発行する機能
    return hash

def generateHash(rowpass):
    return hashlib.sha256(rowpass.encode()).hexdigest()

def getCurrentPassHash():
    return readPassHash()

def IsCorrectPass(rowpass):
    passhash = generateHash(rowpass)
    return passhash == getCurrentPassHash()

def getCurrentHash():
    return readPassHash()

def readPassHash():
    config = configparser.ConfigParser()
    config.read('./hash.config')
    return config.get('PassHash','hash')

def generate_hash(password):
    return hashlib.sha256(password.encode()).hexdigest()

def check_login(password):
    return password == "admin"

def RegisterNewPassword(rowpass):
    passhash = generateHash(rowpass)
    config = configparser.ConfigParser()
    config['PassHash'] = {'hash':passhash}
    with open('hash.config','w') as configfile:
        config.write(configfile)

def CreateResponse(status_code , body = None):
    response = jsonify(
    {
            "status_code": status_code,
            "body": "" if body == None else body
        }
    )
    response.headers["Content-Type"] = "application/json; charset=UTF-8"
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response ,status_code



#----------------------------------API----------------------------------
@app.route("/", methods=["GET"])
def index():
    return "Hello World"

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
    reservationItem = ReservationItem(-1,name, date, time, num, table_id, tableType,False)
    result =  registerUsecase.registerReservation(reservationItem)
    return {"result": "success", "id": result.id}

@app.route("/get_table", methods=["GET"])
def get_table():
    date = request.args["date"]
    token = request.args["token"]
    if not IsValidToken(token):
        return CreateResponse(403)
    repository  = SQLiteReservatonRepository(db_file=db_path)
    usecase = GetReservationTableUsecase(repository)
    app.logger.info(f"date: {date}")
    result = usecase.execute(date)
    dict_result = [ r.to_dict() for r in result]
    return CreateResponse(200,dict_result)

@app.route("/change_done", methods=["GET"])
def change_done():
    id = request.args["id"]
    repository  = SQLiteReservatonRepository(db_file=db_path)
    repository.change_DoneStatus(id)
    return {"result": "success"}

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

    return Response(json.dumps(resultjson), mimetype='application/json')

@app.route("/cancel", methods=["GET"])
def cancel():
    id = request.args["id"]
    repository  = SQLiteReservatonRepository(db_file=db_path)
    usecase = CancelReservationUsecase(repository)
    usecase.cancel(id)
    return {"result": "success"}

@app.route("/login_management", methods=["GET"])
def login():
    password = request.args["password"]
    app.logger.info(password)
    passhash = generateHash(password)
    app.logger.info(passhash)
    currenthash = getCurrentPassHash()
    app.logger.info(currenthash)
    if passhash == currenthash:
        token = getToken()
        return CreateResponse(200,token)
    else:
        return CreateResponse(403)

@app.route("/logout", methods=["POST"])
def logout():
    session.pop("login", None)
    return {"result": "success"}

@app.route("/changepassword",methods=["GET"])
def changepassword():
    if not IsValidToken(request.args['token']):
        return CreateResponse(403)

    req=request.args
    oldpass = req["oldpass"]
    newpass = req["newpass"]
    if IsCorrectPass(oldpass):
        RegisterNewPassword(newpass)
        return CreateResponse(200)

    else:
        return CreateResponse(400)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=334, debug=True, ssl_context=('./openssl/server.crt', './openssl/server.key'))

