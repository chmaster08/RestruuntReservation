"use client";
import Login from "./Login/page";
import { Button, Container, Typography, Link } from '@mui/material';
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const handleLoginCompleted = () => {
    console.log("ログイン完了");
    router.push("/Main");

  }
  return (
    <>
      <Container>
        <Typography align="center" variant="h1">
          予約管理画面
        </Typography>
        <Login loginCompleted={handleLoginCompleted}></Login>
      </Container>
    </>
  );
}
