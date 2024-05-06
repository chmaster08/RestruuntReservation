"use client";
import { Grid, MenuItem, Select, SelectChangeEvent, Tab, TextField, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { use, useEffect, useState } from "react";
import { TableType, convertToType, convertToString } from "../libs/tabletype";

interface PreinputProps {
    inputCompleted:Function
}


export default function Preinput(props:PreinputProps) {

    const maxDate = dayjs().add(1, 'month');
    const availableMembers = ["1","2","3","4","5","6"];
    const availableTableTypes = Object.values(TableType)
    const [selectedNum, setSelectedNum] = useState("2");
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedTableType, setSelectedTableType] = useState(0);
    const [name, setName] = useState("");


    const handleSelectedDateChange = (date:Dayjs | null) => {
        if (date) {
            setSelectedDate(date);
        }
    }
    const handleSelectedNumChange = (event:SelectChangeEvent) => {
        setSelectedNum(event.target.value);
    }
    const handleSelectedTableTypeChange = (event:SelectChangeEvent) => {
      let num = Number(event.target.value);
      setSelectedTableType(num);
    }

    const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    
    }

    useEffect(() => {
            props.inputCompleted(
              selectedDate,
              selectedNum,
              selectedTableType,
              name
            );

    }, [selectedDate, selectedNum, selectedTableType]);



  return (
    <>
      <Grid container spacing={2} sx={{maxWidth:400}}>
        <Grid item xs={4}>
          <Typography variant="h6" sx={{mt:2}}>お名前</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField sx={{width:"100%"}} label="名前" variant="outlined" value={name} onChange={handleNameChange}/>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" sx={{mt:2}}>日時</Typography>
        </Grid>
        <Grid item xs={8}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker sx={{width:"100%"}} disablePast defaultValue={selectedDate} maxDate={maxDate} value={selectedDate} onChange={handleSelectedDateChange}></DatePicker>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" sx={{mt:2}}>人数</Typography>
        </Grid>
        <Grid item xs={8}>
            <Select sx={{width:"100%"}} value={selectedNum} onChange={handleSelectedNumChange}>
                {availableMembers.map((member) =>  <MenuItem key={member} value={member}>{member}</MenuItem>)}
            </Select>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" sx={{mt:2}}>座席タイプ</Typography>
        </Grid>
        <Grid item xs={8}>
            <Select sx={{width:"100%"}} onChange={handleSelectedTableTypeChange}>
                {availableTableTypes.map((table) =>  <MenuItem key={table} value={table}>{convertToString(table)}</MenuItem>)}
            </Select>
        </Grid>
      </Grid>
    </>
  );
}