"use client";
import { useState } from 'react';
import { NextPage } from 'next';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const PasswordChange: NextPage = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const router = useRouter();
  const {token} = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    if (token === null || currentPassword === '' || newPassword === '') {
        setError('Invalid input');
        return;
    }


    try {
        let param = new URLSearchParams({token: token, oldpass: encodeURIComponent(currentPassword), newpass: encodeURIComponent(newPassword)});
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL+`changepassword?${param.toString()}`);
      
      if (response.status === 200) {
        router.push('/Login');
        return;
      } else if (response.status === 400) {
        setError('Current password is incorrect');
      } else if (response.status === 403) {
        setError('Invalid token');
      } else {
        setError('Failed to change password');
      }
    } catch (error) {
      setError('Failed to change password');
    }

    setSuccess('Password successfully changed');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
        パスワード変更
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="現在のパスワード"
            type="password"
            fullWidth
            margin="normal"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="新しいパスワード"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="新しいパスワード（確認）"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">{success}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            変更
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default PasswordChange;
