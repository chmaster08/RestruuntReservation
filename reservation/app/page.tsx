"use client";
import { Button, Container, Stack, Typography } from "@mui/material";
import Complete from "./complete";
import ReservationPage from "./reservation";
import { useState } from "react";

export default function Home() {
  const[isReservationCompleted, setIsReservationCompleted] = useState(false);

  const handleReservationCompleted = () => {
    console.log("予約完了");
    setIsReservationCompleted(true);
  }
  return (
    <>
      <Container>
        <Typography align="center" variant="h1">予約サイト</Typography>
        {isReservationCompleted ? 
          <Complete orderNumber={1}></Complete>
         : 
          <ReservationPage reservationCompleted={handleReservationCompleted}></ReservationPage>
        }
      </Container>
    </>
  );
}
