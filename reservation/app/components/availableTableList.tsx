import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Container } from "postcss";
import { useState } from "react";
import { TableType, convertToString } from '../libs/tabletype';
import AvailableReservationItem from "../libs/reservationItem";
import { getSuitableAvailableReservationItemByTime, getUniqueReservationList } from "../libs/reservationMediator";

interface AvailableTableListProps {
    availableTables:AvailableReservationItem[]
    tableSelected:Function
}


export default function AvailableTableList(props:AvailableTableListProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleSelectedTable = (index:number, item : AvailableReservationItem) => {
        setSelectedIndex(index)
        props.tableSelected(getSuitableAvailableReservationItemByTime(props.availableTables, item.time, item.tableType));
    }
    const getTimeRangeStringFromStart = (start:string, span:number) => {
        return `${start}~${getEndTimeStr(start, span)}`;
    }
    const getEndTimeStr = (time: string, span:number): string => {
    // Dateオブジェクトを作成
    let date = new Date(`1970-01-01T${time}Z`);

    // 2時間（7200000ミリ秒）を追加
    date.setTime(date.getTime() + span * 60 * 60 * 1000);

    // 時間と分を取得
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();

    // 時間と分を2桁の文字列に変換
    let hoursString = hours < 10 ? "0" + hours : "" + hours;
    let minutesString = minutes < 10 ? "0" + minutes : "" + minutes;

    // 新しい時間の文字列を返す
    return `${hoursString}:${minutesString}`;
    }


    return (
      <>
        <List sx={{ width: "100%", maxWidth:500, bgcolor:"Background.paper" }}>
            {getUniqueReservationList(props.availableTables).map((item, index) => {
                return (
                  <ListItemButton
                    key={index}
                    selected={selectedIndex === index}
                    onClick={(event) => handleSelectedTable(index, item)}
                  >
                    <ListItemText
                      primary={getTimeRangeStringFromStart(item.time, item.timespan)}
                      secondary={
                        convertToString(item.tableType)
                      }
                    ></ListItemText>
                  </ListItemButton>
                );
            
            })}
        </List>
      </>
    );
}