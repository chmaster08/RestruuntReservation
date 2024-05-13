
from entity.ReservationItem import ReservationItem
from entity.IReservationRepository import IReservationRepository


class RegisterReservationUsecase:
    def __init__(self, reservationRepository: IReservationRepository):
        self.reservationRepository = reservationRepository

    def registerReservation(self, reservation) -> ReservationItem:
        self.reservationRepository.register_reservation(reservation)
        return self.reservationRepository.getLatestReservation()