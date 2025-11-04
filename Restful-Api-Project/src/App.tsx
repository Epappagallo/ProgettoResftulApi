import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage onNavigateToLogin={handleNavigateToLogin} />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;