"use client";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";



export default function Complete() {
  const param = useSearchParams();
  const orderId = param.get("orderId");
  const member = param.get("member");
  const time = param.get("time");

  const router = useRouter();
  const handleClicked = () => {
    console.log("戻る");
    router.push("/");
  }
    return (
      <>
        <Stack spacing={2} direction="column" alignItems="center">
          <Typography variant="h4">予約完了</Typography>
          <Typography>お待ちしております。</Typography>
            <Typography>受付番号:{orderId}</Typography>
            <Typography>人数:{member}</Typography>
            <Typography>時間:{time}</Typography>
          <Button variant="contained" color="primary" onClick={handleClicked}>戻る</Button>
        </Stack>
      </>
    );
}