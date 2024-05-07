class ReservationItem:
    def __init__(self, name, date, time, customer_num, table_type):
        self.name = name
        self.date = date
        self.time = time
        self.customer_num = customer_num
        self.table_type = table_type
        
    def __str__(self):
        return f'{self.name} {self.date} {self.time} {self.customer_num} {self.table_type}'

    def to_dict(self):
        return {
            'name': self.name,
            'date': self.date,
            'time': self.time,
            'customer_num': self.customer_num,
            'table_type': self.table_type
        }