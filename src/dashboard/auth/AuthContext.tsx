import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { authService } from './authService';

type AuthContextType = {
  user: { id: string; email: string; role: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const { access, refresh } = await authService.login(email, password);
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    setUser(jwtDecode(access));
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    navigate('/login');
  };

  const refreshAuthToken = async () => {
    try {
      const { access } = await authService.refreshToken();
      localStorage.setItem('access_token', access);
      setUser(jwtDecode(access));
    } catch (error) {
      handleLogout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp! * 1000 < Date.now()) {
          refreshAuthToken();
        } else {
          setUser(decoded);
        }
      } catch (error) {
        handleLogout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login: handleLogin, logout: handleLogout, refreshToken: refreshAuthToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);