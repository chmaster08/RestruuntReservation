class ReservationItem:
    def __init__(self,id:int, name:str, date:str, time:str, customer_num:int, tableid:int, table_type:int, done:bool):
        self.id = id
        self.name = name
        self.date = date
        self.time = time
        self.customer_num = customer_num
        self.table_type = table_type
        self.table_id = tableid
        self.done = done
        
    def __str__(self):
        return f'{self.name} {self.date} {self.time} {self.customer_num} {self.table_id} {self.table_type} {self.done}' 

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'date': self.date,
            'time': self.time,
            'customer_num': self.customer_num,
            'table_id': self.table_id,
            'table_type': self.table_type,
            'done': self.done
        }