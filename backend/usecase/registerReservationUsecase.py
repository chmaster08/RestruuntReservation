
from entity.IReservationRepository import IReservationRepository


class RegisterReservationUsecase:
    def __init__(self, reservationRepository: IReservationRepository):
        self.reservationRepository = reservationRepository

    def registerReservation(self, reservation):
        return self.reservationRepository.register_reservation(reservation)