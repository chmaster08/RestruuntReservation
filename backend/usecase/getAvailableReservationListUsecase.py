from typing import List
from entity.ReservationItem import ReservationItem
from entity.IReservationRepository import IReservationRepository


class GetAvailableReservationListUsecase:
    def __init__(self, reservationRepository: IReservationRepository):
        self.reservationRepository = reservationRepository

    def getAvailableReservationList(self, date: str) -> List[ReservationItem]:
        return self.reservationRepository.getAvailableReservationList(date)