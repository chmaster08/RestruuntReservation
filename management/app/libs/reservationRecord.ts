import { TableType } from "./tableType";

export type ReservationRecord = {
    id: number,
    date: string,
    time: string,
    name: string,
    member: number,
    tableType: TableType,
    tableId: number,
    done: boolean
}

