"use client";
import { Button, Container, Stack, Typography } from "@mui/material";
import Complete from "./complete/page";
import ReservationPage from "./reservation/page";
import { useState } from "react";
import ReservationInfo from "./libs/reservationInfo";
import ReservationRecord from "./libs/reservationRecord";

export default function Home() {
  return (
    <>
      <Container>
        <Typography align="center" variant="h1">予約サイト</Typography>
          <ReservationPage></ReservationPage>
      </Container>
    </>
  );
}
