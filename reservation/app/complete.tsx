import { Button, Stack, Typography } from "@mui/material";

interface CompleteProps {
    orderNumber:number
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
          <Typography>予約が完了しました。</Typography>
            <Typography>受付番号:{props.orderNumber}</Typography>
          <Button variant="contained" color="primary" onClick={handleClicked}>戻る</Button>
        </Stack>
      </>
    );
}