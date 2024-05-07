from entity.ReservationItem import ReservationItem
from entity.IReservationRepository import IReservationRepository


class ReservationRepositoryStub(IReservationRepository):
    def __init__(self) -> None:
        super().__init__()
        self.datalist = [ReservationItem(1, "2021-01-01", "10:00", 2, 1), ReservationItem(2, "2021-01-01", "10:30", 2, 1), ReservationItem(3, "2021-01-01", "11:00", 2, 0), ReservationItem(4, "2021-01-01", "11:30", 2, 1), ReservationItem(5, "2021-01-01", "12:00", 2, 1), ReservationItem(6, "2021-01-01", "12:30", 2, 0), ReservationItem(7, "2021-01-01", "13:00", 2, 1), ReservationItem(8, "2021-01-01", "13:30", 2, 2), ReservationItem(9, "2021-01-01", "14:00", 2, 0), ReservationItem(10, "2021-01-01", "14:30", 2, 0)]
    def get_available_table(self, customerNum: int, tableType: int, datetime: str):
        if tableType == 0:
            return filter(lambda x: x.table_type == 0, self.datalist)
        elif tableType == 1:
            return filter(lambda x: x.table_type == 1, self.datalist)
        else:
            return self.datalist


    def register_reservation(self, reservationitem:ReservationItem):
        self.datalist.append(reservationitem)

    def cancel_reservation(self, id: int):
        for i in range(len(self.datalist)):
            if self.datalist[i].id == id:
                self.datalist.pop(i)
                break
    
    def getReservationList(self, date:str):
        return self.datalist