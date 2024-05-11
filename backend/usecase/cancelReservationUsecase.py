from entity.IReservationRepository import IReservationRepository


class CancelReservationUsecase:
    def __init__(self, reservationRepository: IReservationRepository):
        self.reservationRepository = reservationRepository

    def cancel(self, reservationId: int):
        self.reservationRepository.cancel_reservation(reservationId)