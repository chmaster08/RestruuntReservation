"use client";
import { Grid, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { use, useEffect, useState } from "react";

interface PreinputProps {
    inputCompleted:Function
}


export default function Preinput(props:PreinputProps) {

    const tomorrow = dayjs().add(1, 'day');
    const maxDate = dayjs().add(1, 'month');
    const availableMembers = ["1","2","3","4","5","6"];
    const availableTableTypes = ["屋内","テラス","どちらでも"];
    const [selectedNum, setSelectedNum] = useState("2");
    const [selectedDate, setSelectedDate] = useState(tomorrow);
    const [selectedTableType, setSelectedTableType] = useState("屋内");


    const handleSelectedDateChange = (date:Dayjs | null) => {
        if (date) {
            setSelectedDate(date);
        }
    }
    const handleSelectedNumChange = (event:SelectChangeEvent) => {
        setSelectedNum(event.target.value);
    }
    const handleSelectedTableTypeChange = (event:SelectChangeEvent) => {
        setSelectedTableType(event.target.value);
    }

    useEffect(() => {
        if (selectedDate && selectedNum) {
            props.inputCompleted(selectedDate, selectedNum);
        }

    }, [selectedDate, selectedNum, selectedTableType]);



  return (
    <>
      <Grid container spacing={2} sx={{maxWidth:400}}>
        <Grid item xs={4}>
          <Typography variant="h6">日時</Typography>
        </Grid>
        <Grid item xs={8}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker sx={{width:"100%"}} disablePast defaultValue={selectedDate} maxDate={maxDate} value={selectedDate} onChange={handleSelectedDateChange}></DatePicker>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">人数</Typography>
        </Grid>
        <Grid item xs={8}>
            <Select sx={{width:"100%"}} value={selectedNum} onChange={handleSelectedNumChange}>
                {availableMembers.map((member) =>  <MenuItem key={member} value={member}>{member}</MenuItem>)}
            </Select>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">座席タイプ</Typography>
        </Grid>
        <Grid item xs={8}>
            <Select sx={{width:"100%"}} value={selectedTableType} onChange={handleSelectedTableTypeChange}>
                {availableTableTypes.map((table) =>  <MenuItem key={table} value={table}>{table}</MenuItem>)}
            </Select>
        </Grid>
      </Grid>
    </>
  );
}