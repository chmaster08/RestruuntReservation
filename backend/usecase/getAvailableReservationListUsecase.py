from libs.tableList import TableType
from entity.availableItem import AvailableItem
from libs.dailyReservationTable import DailyReservationTable
from entity.IReservationRepository import IReservationRepository


class GetAvailableReservationListUsecase:
    def __init__(self, reservationRepository: IReservationRepository):
        self.reservationRepository = reservationRepository

    def getAvailableReservationList(self, date: str, num:int, tableType : int) -> list[AvailableItem]:
        ReservationList = self.reservationRepository.getReservationList(date)
        table = DailyReservationTable()
        for reservation in ReservationList:
            table.add(reservation.time, reservation.table_id)
        
        if tableType == 3:
            return table.getAvailableTableList(num, TableType(1)) + table.getAvailableTableList(num, TableType(2))
        else:
            return table.getAvailableTableList(num, TableType(tableType))

        