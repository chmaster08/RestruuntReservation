import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
interface LoginProps {
    loginCompleted:Function
}
export default function Login(props:LoginProps) {
    const handleSubmit = () => {
    console.log("ログイン完了");
    props.loginCompleted();
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
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              onClick={handleSubmit}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}