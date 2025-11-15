import React, { createContext, useState, useEffect } from 'react';
import { loginUser as apiLogin, registerUser as apiRegister } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = async (payload) => {
    const res = await apiLogin(payload);
    setUser(res);
    return res;
  };

  const register = async (payload) => {
    const res = await apiRegister(payload);
    setUser(res);
    return res;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
