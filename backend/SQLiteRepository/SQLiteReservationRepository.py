import sqlite3
from sqlite3 import Error
from backend.entity.IReservationRepository import IReservationRepository
sql_create_table_list_table = """ CREATE TABLE IF NOT EXISTS TableList (
                                        id integer PRIMARY KEY,
                                        name text NOT NULL,
                                        capacity integer
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
        except Error as e:
            print(e)