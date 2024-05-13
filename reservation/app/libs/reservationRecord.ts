import { TableType } from "./tabletype";

type ReservationRecord = {
    time: string,
    name: string,
    member: number,
    tableType: TableType,
    orderId: number
}

export default ReservationRecord;