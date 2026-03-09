import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { EditorPage } from './pages/EditorPage';
import { useAuthStore } from './store/authStore';

const App: React.FC = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/editor" element={token ? <EditorPage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/editor" />} />
      </Routes>
    </Router>
  );
};

export default App;
