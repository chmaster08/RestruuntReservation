import abc

from entity.ReservationItem import ReservationItem

class IReservationRepository(abc.ABC):
    @abc.abstractmethod
    def register_reservation(self, reservationitem:ReservationItem)->None:
        pass

    @abc.abstractmethod
    def cancel_reservation(self, id:int)->None:
        pass

    @abc.abstractmethod
    def getReservationList(self, date:str)->list[ReservationItem]:
        pass

    @abc.abstractmethod
    def change_DoneStatus(self, id:int):
        pass

    @abc.abstractmethod
    def getLatestReservation(self)->ReservationItem:
        pass