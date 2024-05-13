import { Button, Stack, Typography } from "@mui/material";
import ReservationRecord from "./libs/reservationRecord";

interface CompleteProps {
    orderInfo:ReservationRecord | null,
    backToHome:Function
}


export default function Complete(props:CompleteProps) {

  const handleClicked = () => {
    console.log("戻る");
    props.backToHome();
  }
    return (
      <>
        <Stack spacing={2} direction="column" alignItems="center">
          <Typography variant="h4">予約完了</Typography>
          <Typography>お待ちしております。</Typography>
            <Typography>受付番号:{props.orderInfo?.orderId}</Typography>
            <Typography>人数:{props.orderInfo?.member}</Typography>
            <Typography>時間:{props.orderInfo?.time}</Typography>
          <Button variant="contained" color="primary" onClick={handleClicked}>戻る</Button>
        </Stack>
      </>
    );
}