import { TableType } from "./tabletype";

type AvailableReservationItem = {
    time: string,
    timespan: number,
    tableType: TableType,
}

export default AvailableReservationItem;