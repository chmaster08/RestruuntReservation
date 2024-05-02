import { Button, Stack, Typography } from "@mui/material";
import Preinput from "./components/preinput";
import AvailableTableList from "./components/availableTableList";
import TableType from "./libs/tabletype";
import { useEffect, useState } from "react";
import ReservationItem from "./libs/reservationItem";

interface ReservationPageProps {
    reservationCompleted:Function
}


export default function ReservationPage(props:ReservationPageProps){
  const [availableTableList,setAvailableTableList] = useState<ReservationItem[]>([]);
  const [canSearch, setCanSearch] = useState(false);

  const handlePreInputCompleted = (date:Date, num:number, tabletype:string) => {
    console.log(date);
    console.log(num);
    setCanSearch(true);
  }

  const handleSelectedTable = (tableType:TableType) => {
    console.log(tableType);
  }

  const handleClickReserve = () => {
    props.reservationCompleted();

  }
    useEffect(() => {
      if (canSearch)
        {
          setAvailableTableList([{time:"16:00~17:30", tableType:TableType.Terrace},{time:"16:00~17:30", tableType:TableType.Terrace},{time:"17:00~18:30", tableType:TableType.Terrace}])
        }
    },[canSearch])
    return (
        <>
    <Stack spacing={2} direction="column" alignItems="center" >
      <Preinput inputCompleted={handlePreInputCompleted}></Preinput>
      <AvailableTableList availableTables={availableTableList} tableSelected={handleSelectedTable} ></AvailableTableList>
      <Button variant="contained" color="primary" onClick={handleClickReserve}>予約する</Button>
    </Stack>
        </>
    );
}