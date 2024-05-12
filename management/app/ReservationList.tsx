import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Select, Checkbox, SelectChangeEvent } from '@mui/material';
import ReservationRecord from "./libs/reservationRecord";
import { convertToString } from "./libs/tableType";
import React, { MouseEvent, useState } from 'react';


interface ReservationListProps {
    records: ReservationRecord[]
    selectedRecordChanged: Function
}

export default function ReservationList(props: ReservationListProps) {

    const [selected, setSelected] = useState<number>(5);
    const handleClick = (id:number) => {
        console.log(id);
        setSelected(id);
        props.selectedRecordChanged(props.records.find((record) => record.id == id));
  };
    const isSelected = (id: number) => selected == id;

    const getDoneStatusString = (done:boolean) => {
        if (done)
        {
            return "済";
        }
        else
        {
            return "未";
        }
    }

    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>日時</TableCell>
                        <TableCell>時間</TableCell>
                        <TableCell>名前</TableCell>
                        <TableCell align="right">人数</TableCell>
                        <TableCell align="right">テーブルタイプ</TableCell>
                        <TableCell align="right">テーブル番号</TableCell>
                        <TableCell align="right">案内済み</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.records.map((row, index) =>{
                        const isItemSelected = isSelected(row.id);

                        return(
                        <TableRow
                            hover
                            onClick={() => handleClick(row.id)}
                            key={row.id}
                            selected={row.id == selected}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor:"pointer" }}
                        >
                            <TableCell component="th" scope="row">
                                {row.date}
                            </TableCell>
                            <TableCell>{row.time}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">{row.member}</TableCell>
                            <TableCell align="right">{convertToString(row.tableType)}</TableCell>
                            <TableCell align="right">{row.tableId}</TableCell>
                            <TableCell align='right'>{getDoneStatusString(row.done)}</TableCell>
                        </TableRow>
                    )})}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}