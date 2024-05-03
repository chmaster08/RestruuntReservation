import abc

class IReservationRepository(abc.ABC):
    @abc.abstractmethod
    def get_reservation(self, datetime:str):
        pass

    @abc.abstractmethod
    def get_available_table(self, customerNum:int ,tableType:int ,datetime:str):
        pass

    @abc.abstractmethod
    def register_reservation(self, datetime:str, customerNum:int, tableType:int):
        pass

    @abc.abstractmethod
    def cancel_reservation(self, id:int):
        pass
