import abc

class IReservationRepository(abc.ABC):
    @abc.abstractmethod
    def get_available_table(self, customerNum:int ,tableType:int ,datetime:str):
        pass

    @abc.abstractmethod
    def register_reservation(self, datetime:str, starttime:str, customerNum:int, tableNumber:str):
        pass

    @abc.abstractmethod
    def cancel_reservation(self, id:int):
        pass
