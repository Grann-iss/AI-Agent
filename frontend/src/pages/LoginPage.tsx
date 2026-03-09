import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { username, password });
      setToken(response.data.token);
      navigate('/editor');
    } catch (error) {
      alert('登录失败');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input type="text" placeholder="用户名" onChange={(e) => setUsername(e.target.value)} className="border p-2 mb-2" />
      <input type="password" placeholder="密码" onChange={(e) => setPassword(e.target.value)} className="border p-2 mb-2" />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2">登录</button>
    </div>
  );
};
