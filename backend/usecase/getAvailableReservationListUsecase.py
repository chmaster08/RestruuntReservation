from typing import List
from entity.ReservationItem import ReservationItem
from entity.IReservationRepository import IReservationRepository


class GetAvailableReservationListUsecase:
    def __init__(self, reservationRepository: IReservationRepository):
        self.reservationRepository = reservationRepository

    def getAvailableReservationList(self, date: str, num:int, tableType : int) -> List[ReservationItem]:
        return self.reservationRepository.get_available_table(num, tableType, date)