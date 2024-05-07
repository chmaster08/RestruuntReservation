import abc

from entity.ReservationItem import ReservationItem

class IReservationRepository(abc.ABC):
    @abc.abstractmethod
    def get_available_table(self, customerNum:int ,tableType:int ,datetime:str):
        pass

    @abc.abstractmethod
    def register_reservation(self, reservationitem:ReservationItem):
        pass

    @abc.abstractmethod
    def cancel_reservation(self, id:int):
        pass

    @abc.abstractmethod
    def getReservationList(self, date:str):
        pass
