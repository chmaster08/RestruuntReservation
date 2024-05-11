import AvailableReservationItem from "./reservationItem";
import { TableType } from "./tabletype";

export function getUniqueReservationList(reservations:AvailableReservationItem[]) : AvailableReservationItem[]
{
    return reservations.filter((x,i,self) => self.findIndex(y => y.time === x.time && y.tableType == x.tableType) === i);
}

export function getSuitableAvailableReservationItemByTime(reservations:AvailableReservationItem[], time:string, tabletype:TableType) : AvailableReservationItem | undefined
{
    var candidates = reservations.filter((x) => x.time === time && x.tableType === tabletype);
    return candidates.reduce((prev, current) => (prev.capacity < current.capacity) ? prev : current);
}