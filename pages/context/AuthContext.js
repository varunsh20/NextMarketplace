"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        });
    }
  }, []);

  const register = async (name, phone, address, email, password) => {
    try {
      const { data } = await axios.post('/api/auth/register', { name, phone, address, email, password });
      console.log(data);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      toast.success('User Registered Successfully',{
        position: "top-center",
      });
      router.push('/');
    } catch (error) {
      toast.error(error.response.data.error,{
        position: "top-center",
      });
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      router.push('/');
      toast.success('Login successful');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
    toast.success('Logout successful');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
      <ToastContainer/>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);