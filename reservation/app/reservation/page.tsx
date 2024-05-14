import { Button, Stack, Typography } from "@mui/material";
import Preinput from "../components/preinput";
import AvailableTableList from "../components/availableTableList";
import { TableType } from '../libs/tabletype';
import { useEffect, useState } from "react";
import AvailableReservationItem from "../libs/reservationItem";
import ReservationInfo from "../libs/reservationInfo";
import { inflate } from "zlib";
import { get } from "http";
import { Dayjs } from "dayjs";
import { useRouter, useSearchParams, usePathname } from "next/navigation";



export default function ReservationPage(){
  const [availableTableList,setAvailableTableList] = useState<AvailableReservationItem[]>([]);
  const [canSearch, setCanSearch] = useState(false);
  const [canregister, setCanRegister] = useState(false);
  const [selecteditem, setSelectedInfo] = useState<ReservationInfo | null>(null);
  const [selectedTable, setSelectedTable] = useState<AvailableReservationItem | null>(null);
  const router = useRouter();

  const handlePreInputCompleted = (date:Dayjs, num:number, tabletype:TableType, name:string) => {
    console.log(tabletype);
        setSelectedInfo({date:date.format("YYYY-MM-DD"),member:num,tableType:tabletype,name:name});
        setCanSearch(true);
        try
        {
          getAvailableTableList(date.format("YYYY-MM-DD"),num.toString(),tabletype.toString());
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

  const handleClickReserve = async () => {
    try
    {
      if (selecteditem && selectedTable)
        {
          let result = await registerReservation(selecteditem.date,selectedTable.time,selecteditem.member.toString(),selecteditem.tableType.toString(),selecteditem.name,selectedTable.id.toString());

          let useSearchParams = new URLSearchParams();
          useSearchParams.append("orderId",result.toString());
          useSearchParams.append("time",selectedTable.time);
          useSearchParams.append("name",selecteditem.name);
          useSearchParams.append("member",selecteditem.member.toString());
          useSearchParams.append("tableType",selecteditem.tableType.toString());
          useSearchParams.append("tableId",selectedTable.id.toString());
          let url = `/complete?${useSearchParams}`;
          console.log(url);
          router.push(url);
        }
    }
    catch(e)
    {
      console.log(e);
    }

  }

  const getAvailableTableList = async (datestr:string, num:string, tableType:string) => {
        const param = new URLSearchParams({date:datestr,member:num,tableType:tableType});
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL+`get_availabletable?${param.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

        if (response.ok) {
            const data = await response.json();
            let datalist:AvailableReservationItem[] = [];
            for (let i = 0; i < data.length; i++) {
                console.log(data[i]);
                datalist.push({time:data[i].time,tableType:data[i].table_type,timespan:data[i].timespan,capacity:data[i].capacity,id:data[i].table_id});
            }
            setAvailableTableList(datalist);
        } else {
            console.log("検索失敗");
        }
  }

  const registerReservation = async (datestr:string,timestr:string,num:string,tableType:string,name:string,tableid:string):Promise<number> =>{
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL+'register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({date:datestr,time:timestr,member:num,tableType:tableType,name:name,table_id:tableid})});

        if (response.ok) {
            console.log("予約完了");
          let json = await response.json();
          return json["id"];
        } else {
            console.log("予約失敗");
            return -1;
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