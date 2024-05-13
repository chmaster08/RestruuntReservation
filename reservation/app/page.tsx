"use client";
import { Button, Container, Stack, Typography } from "@mui/material";
import Complete from "./complete";
import ReservationPage from "./reservation";
import { useState } from "react";
import ReservationInfo from "./libs/reservationInfo";
import ReservationRecord from "./libs/reservationRecord";

export default function Home() {
  const[isReservationCompleted, setIsReservationCompleted] = useState(false);
  const [orderinfo, setOrderInfo] = useState<ReservationRecord | null>(null);

  const handleReservationCompleted = (orderInfo:ReservationRecord,) => {
    console.log(orderInfo);
    console.log("予約完了");
    setOrderInfo(orderInfo);
    setIsReservationCompleted(true);
  }

  const handlebackToHome = () => {
    console.log("戻る");
    setIsReservationCompleted(false);
  }
  return (
    <>
      <Container>
        <Typography align="center" variant="h1">予約サイト</Typography>
        {isReservationCompleted ? 
          <Complete orderInfo={orderinfo} backToHome={handlebackToHome}></Complete>
         : 
          <ReservationPage reservationCompleted={handleReservationCompleted}></ReservationPage>
        }
      </Container>
    </>
  );
}
