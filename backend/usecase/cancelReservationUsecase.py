from entity.IReservationRepository import IReservationRepository


class CancelReservationUsecase:
    def __init__(self, reservationRepository: IReservationRepository):
        self.reservationRepository = reservationRepository

    def cancel(self, reservationId: int):
        reservation = self.reservationRepository.findById(reservationId)