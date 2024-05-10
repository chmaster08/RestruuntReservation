from datetime import datetime, timedelta

from backend.libs.tableList import TableList

class DailyReservationTable:
    def __init__(self):
        self.table = {}
        for table in TableList.data:
            self.table[table.id] = {}
            for i in self.getTimeList():
                self.table[table.id][i] = False

    def add(self, time, table_id):
        self.table[table_id][time] = True
    
    def getAvailableTableList(self, table_id):
        available_table_list = []
        for time, is_reserved in self.table[table_id].items():
            if not is_reserved:
                available_table_list.append(time)
        return available_table_list


    
    def getTimeList(self):
        start_time = datetime.strptime("10:00", "%H:%M")
        end_time = datetime.strptime("22:00", "%H:%M")
        time_list = []
        while start_time < end_time:
            time_list.append(start_time.strftime("%H:%M"))
            start_time += timedelta(hours=1)
        return time_list
