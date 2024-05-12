from entity.ReservationItem import ReservationItem
from entity.IReservationRepository import IReservationRepository


class ReservationRepositoryStub(IReservationRepository):
    def __init__(self) -> None:
        super().__init__()
        self.datalist = [ReservationItem(1, "2021-01-01", "10:00", 2, 1), ReservationItem(2, "2021-01-01", "10:30", 2, 1), ReservationItem(3, "2021-01-01", "11:00", 2, 0), ReservationItem(4, "2021-01-01", "11:30", 2, 1), ReservationItem(5, "2021-01-01", "12:00", 2, 1), ReservationItem(6, "2021-01-01", "12:30", 2, 0), ReservationItem(7, "2021-01-01", "13:00", 2, 1), ReservationItem(8, "2021-01-01", "13:30", 2, 2), ReservationItem(9, "2021-01-01", "14:00", 2, 0), ReservationItem(10, "2021-01-01", "14:30", 2, 0)]

    def register_reservation(self, reservationitem:ReservationItem)->None:
        self.datalist.append(reservationitem)

    def cancel_reservation(self, id: int)->None:
        for i in range(len(self.datalist)):
            if self.datalist[i].id == id:
                self.datalist.pop(i)
                break
    
    def getReservationList(self, date:str)->list[ReservationItem]:
        return self.datalist

    def change_DoneStatus(self, id:int):
        for i in range(len(self.datalist)):
            if self.datalist[i].id == id:
                self.datalist[i].done = 1
                break