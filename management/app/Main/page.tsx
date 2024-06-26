"use client";
import { Stack, Table, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import ReservationList from "../component/ReservationList";
import {ReservationRecord} from "../libs/reservationRecord";
import { TableType } from "../libs/tableType";
import TableController from "../component/TableController";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function ManagementMain() {

    const maxDate = dayjs().add(1, 'month');
    const [recordList, setRecordList] = useState<ReservationRecord[]>([]); // ReservationRecord[
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedRecord, setSelectedRecord] = useState<ReservationRecord | null>(null); // ReservationRecord | null
    const [checked, setChecked] = useState(false); // boolean
    const {token} = useAuth();
    const router = useRouter();
    const handleSelectedDateChange = async (date:Dayjs | null) => {
        if (date) {
            setSelectedDate(date);
        }
    }

    const handleCancelReservation = async () => {
        if (selectedRecord)
        {
            await cancelReservation(selectedRecord.id);
        }
    }

    const cancelReservation = async (id:number) => {
        try
        {
            const param = new URLSearchParams({id: id.toString()});
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL+`cancel?${param.toString()}`);
            if (response.ok)
            {
                await getReservationRecords(selectedDate);
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }

    const handleUpdateReservation = async () => {
        await getReservationRecords(selectedDate);
    }

    const handleCompleteReservation = async () => {
        if (selectedRecord)
        {
            await completeReservation(selectedRecord.id);
        }
    }

    const handleDoneCheckChanged = async (checked:boolean) => {
        console.log(checked);
        setChecked(checked);
    }

    const completeReservation = async (id:number) => {
        try
        {
            const param = new URLSearchParams({id: id.toString()});
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL+`change_done?${param.toString()}`);
            if (response.ok)
            {
                await getReservationRecords(selectedDate);
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }

    const getReservationRecords = async (date:Dayjs) => {
        try
        {
        const param = new URLSearchParams({
          date: date.format("YYYY-MM-DD"),
          token :token? token : ""
        });
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL +`get_table?${param.toString()}`);
            let data =  await response.json();
            if (data.status_code == 200)
            {
                setRecordList([]);
                console.log(data);
                if (data.body.length == 0) {
                    return;
                }
                let datalist:ReservationRecord[] = [];
                for (let i = 0; i < data.body.length; i++) {
                    const record = data.body[i];
                    let rec = 
                    {
                        id: record.id,
                        date: record.date,
                        time: record.time,
                        name: record.name,
                        member: record.customer_num,
                        tableType: record.table_type as TableType,
                        tableId: record.table_id,
                        done: record.done,
                    };
                    if (checked && rec.done)
                    {
                        continue;
                    }
                    datalist.push(rec);

                }
                let sortedlist = datalist.sort((a,b) => {return (a.time.localeCompare(b.time))})
                setRecordList(sortedlist);
            }
            else if (data.status_code == 403)
            {
                console.log("Invalid token");
                router.push('/Login');
            }
            else
            {
                console.log("Failed to get reservation records");
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }
    useEffect(() => {
        getReservationRecords(selectedDate);
    
    }, [checked, selectedDate])

    const handleSelectedRecordChanged = (record:ReservationRecord) => {
        setSelectedRecord(record);
    }
        return (
          <>
            <Stack spacing={2} direction="column" alignItems="center">
              <TableController
                selectedItem={selectedRecord}
                updateReservation={handleUpdateReservation}
                selectedDateChanged={handleSelectedDateChange}
                deleteReservation={handleCancelReservation}
                completeReservation={handleCompleteReservation}
                updateChecked={handleDoneCheckChanged}
              ></TableController>
              <ReservationList
                records={recordList}
                selectedRecordChanged={handleSelectedRecordChanged}
              ></ReservationList>
            </Stack>
          </>
        );
}