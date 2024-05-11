from enum import IntEnum
import json

class TableType(IntEnum):
    NoType = 0
    Indoor = 1
    Terrace = 2

    def ConvertFromInt(value:int):
        if value == 0:
            return TableType.NoType
        elif value == 1:
            return TableType.Indoor
        elif value == 2:
            return TableType.Terrace


class TableItem:
    def __init__(self, id:int, tableType:TableType, capacity:int) -> None:
        self.id = id
        self.tableType = tableType
        self.capacity = capacity

class TableList:
    def __init__(self) -> None:
        self.data :list[TableItem]= []
        with open("tabledata.jsonl") as f:
            for line in f.readlines():
                data = json.loads(line)
                self.data.append(TableItem(data["id"], TableType(data["type"]), data["capacity"]))
    
    def getAvailableTable(self, capacity:int, tableType:TableType)->list[TableItem]:
        retValue = []
        for table in self.data:
            if table.capacity >= capacity and table.tableType == tableType:
                retValue.append(table)
        return retValue