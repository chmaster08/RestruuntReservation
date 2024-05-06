import { TableType } from "./tabletype"

type ReservationInfo = {
    date: string,
    name: string,
    member: number,
    tableType: TableType,
}

export default ReservationInfo;