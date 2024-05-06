import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";


const rows = [
    { date: "2021/10/10", time: "16:00~17:30", name: "山田太郎", people: 2, tableType: "屋内", tableNum: 1 },
]

export default function ReservationList() {
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.date}
                            </TableCell>
                            <TableCell>{row.time}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">{row.people}</TableCell>
                            <TableCell align="right">{row.tableType}</TableCell>
                            <TableCell align="right">{row.tableNum}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}