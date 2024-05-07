import { Button, Stack, Typography } from "@mui/material";
import Preinput from "./components/preinput";
import AvailableTableList from "./components/availableTableList";
import { TableType } from './libs/tabletype';
import { useEffect, useState } from "react";
import AvailableReservationItem from "./libs/reservationItem";
import ReservationInfo from "./libs/reservationInfo";
import { inflate } from "zlib";
import { get } from "http";

interface ReservationPageProps {
    reservationCompleted:Function
}



export default function ReservationPage(props:ReservationPageProps){
  const [availableTableList,setAvailableTableList] = useState<AvailableReservationItem[]>([]);
  const [canSearch, setCanSearch] = useState(false);
  const [canregister, setCanRegister] = useState(false);
  const [selecteditem, setSelectedInfo] = useState<ReservationInfo | null>(null);
  const [selectedTable, setSelectedTable] = useState<AvailableReservationItem | null>(null);

  const handlePreInputCompleted = (date:Date, num:number, tabletype:TableType, name:string) => {
    console.log(tabletype);
        setSelectedInfo({date:date.toISOString(),member:num,tableType:tabletype,name:name});
        setCanSearch(true);
        try
        {
          getAvailableTableList(date.toISOString(),num.toString(),tabletype.toString());
        }
        catch(e)
        {
          console.log(e);
        }
  }

  const handleSelectedTable = (table:AvailableReservationItem) => {
    if (table)
      {
        console.log(table);
        setSelectedTable(table);
        setCanRegister(true);
      }
      else
      {
        console.log(table);
        setCanRegister(false);
      }
  }

  const handleClickReserve = () => {
    try
    {
      if (selecteditem && selectedTable)
        {
          registerReservation(selecteditem.date,selectedTable.time,selecteditem.member.toString(),selecteditem.tableType.toString(),selecteditem.name);
        }
      props.reservationCompleted();
    }
    catch(e)
    {
      console.log(e);
    }

  }

  const getAvailableTableList = async (datestr:string, num:string, tableType:string) => {
        const param = new URLSearchParams({date:datestr,member:num,tableType:tableType});
        const response = await fetch(`http://localhost:5000/get_availabletable?${param.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

        if (response.ok) {
            const data = await response.json();
            let datalist:AvailableReservationItem[] = [];
            for (let i = 0; i < data.length; i++) {
                datalist.push({time:data[i].time,tableType:data[i].table_type});
            }
            setAvailableTableList(datalist);
        } else {
            console.log("検索失敗");
        }
  }

  const registerReservation = async (datestr:string,timestr:string,num:string,tableType:string,name:string) => {
        const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({date:datestr,time:timestr,member:num,tableType:tableType,name:name})});

        if (response.ok) {
            console.log("予約完了");
        } else {
            console.log("予約失敗");
        }
    }

    return (
        <>
    <Stack spacing={2} direction="column" alignItems="center" >
      <Preinput inputCompleted={handlePreInputCompleted}></Preinput>
      <AvailableTableList availableTables={availableTableList} tableSelected={handleSelectedTable} ></AvailableTableList>
      {canregister &&
      <Button variant="contained" color="primary" onClick={handleClickReserve}>予約する</Button>
      }
    </Stack>
        </>
    );
}