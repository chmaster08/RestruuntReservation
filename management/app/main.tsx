import { Stack, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import TimelineComponent from "./timeline";
import StatisticsComponent from "./statistics";

export default function ManagementMain() {

    const maxDate = dayjs().add(1, 'month');
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const handleSelectedDateChange = (date:Dayjs | null) => {
        if (date) {
            setSelectedDate(date);
        }
    }
        return (
            <>
                <Stack spacing={2} direction="column" alignItems="center">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker sx={{width:"100%"}} disablePast defaultValue={selectedDate} maxDate={maxDate} value={selectedDate} onChange={handleSelectedDateChange}></DatePicker>
                    </LocalizationProvider>
                    <StatisticsComponent></StatisticsComponent>
                    <TimelineComponent></TimelineComponent>
                </Stack>
            </>
        );
}