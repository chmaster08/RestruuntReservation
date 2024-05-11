import sqlite3
from sqlite3 import Error
from entity.ReservationItem import ReservationItem
from entity.IReservationRepository import IReservationRepository
sql_create_table_list_table = """ CREATE TABLE IF NOT EXISTS TableList (
                                        id integer PRIMARY KEY AUTOINCREMENT,
                                        date text NOT NULL,
                                        starttime text NOT NULL,
                                        name text NOT NULL,
                                        member integer NOT NULL,
                                        table_id integer NOT NULL
                                    ); """

class SQLiteReservatonRepository(IReservationRepository):

    def __init__(self, db_file):
        self.conn = self.create_connection(db_file)
        self.create_table()

    def create_connection(self, db_file):
        """ create a database connection to a SQLite database """
        conn = None
        try:
            conn = sqlite3.connect(db_file)
            print(sqlite3.version)
        except Error as e:
            print(e)
        return conn

    def create_table(self):
        """ create a table from the create_table_sql statement """
        try:
            c = self.conn.cursor()
            c.execute(sql_create_table_list_table)
            c.close()
        except Error as e:
            print(e)

    def getReservationList(self, date:str):
        c = self.conn.cursor()
        c.execute("SELECT * FROM TableList WHERE date = ?", (date,))
        rows = c.fetchall()
        c.close()
        reservation_list = []
        for row in rows:
            reservation_list.append(ReservationItem(row[3], row[1], row[2], int(row[4]), int(row[5])))
        return reservation_list

    def register_reservation(self, reservationitem:ReservationItem):
        c = self.conn.cursor()
        c.execute("INSERT INTO TableList (date, starttime, name, member, table_id) VALUES (?, ?, ?, ?, ?)", (reservationitem.date, reservationitem.time, reservationitem.name, reservationitem.customer_num, reservationitem.table_id))
        result = c.fetchall()
        self.conn.commit()
        return result

    def cancel_reservation(self, id:int):
        try:
            c = self.conn.cursor()
            c.execute("DELETE FROM TableList WHERE id = ?", (id))
            self.conn.commit()
        except Error as e:
            print(e)