from libs.tableList import TableType


class AvailableItem:
    def __init__(self, table_id:int, time:str, table_type:TableType,capacity:int):
        self.id = table_id
        self.time = time
        self.table_type:TableType = table_type
        self.capacity = capacity
    def to_dict(self):
        return {
            'table_id': self.id,
            'time': self.time,
            'timespan' :1,
            'capacity': self.capacity,
            'table_type': self.table_type
        }