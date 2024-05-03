"use client";
import Image from "next/image";
import Login from "./login";
import { useState } from "react";
import { Container, Typography } from "@mui/material";
import ManagementMain from "./main";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const handleLoginCompleted = () => {
    console.log("ログイン完了");
    setIsLogin(true);
  }
  return (
    <>
      <Container>
        <Typography align="center" variant="h1">
          予約管理画面
        </Typography>
        {isLogin ? 
        <ManagementMain></ManagementMain>
         : 
          <Login loginCompleted={handleLoginCompleted}></Login>
        }
      </Container>
    </>
  );
}
