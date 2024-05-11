class ReservationItem:
    def __init__(self, name:str, date:str, time:str, customer_num:int, tableid:int):
        self.name = name
        self.date = date
        self.time = time
        self.customer_num = customer_num
        self.table_id = tableid
        
    def __str__(self):
        return f'{self.name} {self.date} {self.time} {self.customer_num} {self.table_id}'

    def to_dict(self):
        return {
            'name': self.name,
            'date': self.date,
            'time': self.time,
            'customer_num': self.customer_num,
            'table_id': self.table_id
        }