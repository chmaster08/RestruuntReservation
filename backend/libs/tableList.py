import json

class TableItem:
    def __init__(self, id:int, tableType:str, capacity:int) -> None:
        self.id = id
        self.tableType = tableType
        self.capacity = capacity

class TableKList:
    def __init__(self) -> None:
        self.data = []
        with open("../tabledata.jsonl") as f:
            for line in f.readlines():
                data = json.loads(line)
                self.data.append(TableItem(data["id"], data["tableType"], data["capacity"]))