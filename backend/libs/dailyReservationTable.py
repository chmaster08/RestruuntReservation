from datetime import datetime, timedelta

from entity.availableItem import AvailableItem
from libs.tableList import TableList, TableType

class DailyReservationTable:
    def __init__(self):
        self.tableList = TableList()
        self.table = {}
        for table in self.tableList.data:
            self.table[table.id] = {}
            for i in self.__getTimeList__():
                self.table[table.id][i] = False

    def add(self, time, table_id):
        self.table[table_id][time] = True
    
    def getAvailableTableList(self, number:int, table_type:TableType)->list[AvailableItem]:
        availableTableList = self.tableList.getAvailableTable(number, table_type)
        availableTable = []
        for table in availableTableList:
            for time in self.__getTimeList__():
                if not self.table[table.id][time]:
                    availableTable.append(AvailableItem(table.id, time, table.tableType,table.capacity))
        return availableTable
    
    def __getTimeList__(self)->list[str]:
        start_time = datetime.strptime("10:00", "%H:%M")
        end_time = datetime.strptime("20:00", "%H:%M")
        time_list = []
        while start_time < end_time:
            time_list.append(start_time.strftime("%H:%M"))
            start_time += timedelta(hours=1)
        return time_list
    