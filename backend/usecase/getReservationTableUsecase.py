from typing import List

from entity.IReservationRepository import IReservationRepository
from entity.ReservationItem import ReservationItem


class GetReservationTableUsecase:
    def __init__(self, reservationRepository: IReservationRepository):
        self.reservationRepository = reservationRepository

    def execute(self, date:str) -> List[ReservationItem]:
        return self.reservationRepository.getReservationList(date)