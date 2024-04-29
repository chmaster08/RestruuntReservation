"use client";
import { Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Preinput from "./components/preinput";

export default function Home() {

  const handlePreInputCompleted = (date:Date, num:number) => {
    console.log(date);
    console.log(num);
  }
  return (
    <>
    <Stack spacing={2} direction="column" alignItems="center">
      <Typography variant="h1">予約サイト</Typography>
      <Preinput inputCompleted={handlePreInputCompleted}></Preinput>
    </Stack>
    </>
  );
}
