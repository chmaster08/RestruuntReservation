"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Contextの型
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

// デフォルト値
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// プロバイダーの型
interface AuthProviderProps {
  children: ReactNode;
}

// プロバイダーコンポーネント
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // 初回レンダリング時にローカルストレージからトークンを読み込む
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSetToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken: handleSetToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// フックを作成してコンテキストを利用しやすくする
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
