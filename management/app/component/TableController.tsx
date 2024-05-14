"use client";
import { Button, IconButton, Stack , Checkbox, FormControlLabel} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Update,Sync } from "@mui/icons-material";
import {ReservationRecord} from "../libs/reservationRecord";
import { cp } from "fs";
import 'dayjs/locale/ja';

interface TableControllerProps {
    selectedItem:ReservationRecord | null
    selectedDateChanged:Function
    deleteReservation:Function
    completeReservation:Function
    updateReservation:Function
    updateChecked:Function

}

export default function TableController(porps:TableControllerProps) {
    const maxDate = dayjs().add(1, 'month');
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [isChecked, setIsChecked] = useState(false);
    const handleSelectedDateChange = async (date:Dayjs | null) => {
        if (date) {
            setSelectedDate(date);
            porps.selectedDateChanged(date);
        }
    }

    const handleComplete = () => {
        porps.completeReservation();
    }
    const handleDelete = () => {
        porps.deleteReservation();
    }

    const handleUpdate = () => {
        porps.updateReservation();
    }

    const handleCheck = () => {
        setIsChecked(!isChecked);
        porps.updateChecked(isChecked);
    }

    return (
      <Stack spacing={2} direction="row" sx={{width:"100%"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
          <DatePicker
            sx={{ width: "100%" }}
            disablePast
            defaultValue={selectedDate}
            maxDate={maxDate}
            value={selectedDate}
            onChange={handleSelectedDateChange}
          ></DatePicker>
        </LocalizationProvider>
        <FormControlLabel sx={{width:250}} control={<Checkbox checked={isChecked} onChange={handleCheck}/>} label="未完了のみ"></FormControlLabel>
        <IconButton size="large" onClick={handleUpdate} aria-label="更新"><Sync fontSize="inherit"></Sync></IconButton>
        <Button variant="contained" sx={{minWidth:100}} onClick={handleComplete} disabled={porps.selectedItem == null}>案内済みにする</Button>
        <Button variant="contained" sx={{minWidth:100}} onClick={handleDelete} disabled={porps.selectedItem == null} color="warning">削除</Button>
      </Stack>
    );
}