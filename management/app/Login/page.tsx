"use client";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
interface LoginProps {
  loginCompleted:Function;
}

export default function Login(props:LoginProps) {
  const [password, setPassword] = useState("");
  const [errorOccurred, setErrorOccurred] = useState(false);
  const router = useRouter();
  const {setToken} = useAuth();
    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
      try
      {
            event.preventDefault();
            const param = new URLSearchParams({password: password});
             const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL+`login_management?${param.toString()}`);
            const data = await response.json();
            console.log(data);
            if (data.status_code == 200)
              {
                console.log("ログイン成功");
                setToken(data.body);
                router.push("/Main");
              }
              else
              {
                console.log("ログイン失敗");
                setErrorOccurred(true);
              }

      }
      catch(e)
      {
        console.log(e);
        setErrorOccurred(true);
      }
            //console.log(response);
  };
  return (
    <>
      <Container component="h1">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" component="h1">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 , minWidth:300}}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {errorOccurred && <Typography color="error" sx={{width:"100%"}}>パスワードが異なります</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button onClick={()=>router.push("/changepass")}>パスワード変更</Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}