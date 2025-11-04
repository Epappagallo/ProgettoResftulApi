// src/App.tsx
import React, { useState } from 'react';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css'; 

// Definisco uno stato di accesso globale, lo terremo qui per ora
type AuthState = {
  isLoggedIn: boolean;
  username: string | null;
}

const App: React.FC = () => {
  // 💾 Stato per l'autenticazione
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    username: null,
  });

  const navigate = useNavigate();

  // Gestione del successo del Login
  const handleLoginSuccess = (userEmail: string) => {
    setAuthState({
      isLoggedIn: true,
      username: userEmail,
    });
    // ✅ Reindirizza alla Home dopo il successo del login
    navigate('/'); 
  };

  // Funzione per il Logout (se vuoi implementarla)
  const handleLogout = () => {
    setAuthState({
      isLoggedIn: false,
      username: null,
    });
    navigate('/login'); // Torna alla pagina di Login
  };


  return (
    <div className="App">
      {/* 🧭 Definiamo qui tutte le nostre rotte */}
      <Routes>
        
        {/* Rotta della Home (Pagina principale) */}
        <Route 
          path="/" 
          element={<HomePage onNavigateToLogin={() => navigate('/login')} />} 
        />
        
        {/* Rotta di Login */}
        <Route 
          path="/login" 
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />} 
        />
        
        {/* Rotta di fallback per URL inesistenti */}
        <Route 
          path="*" 
          element={<h1>404 | Pagina Non Trovata</h1>} 
        />
        
      </Routes>
      
      {/* Nota: L'header/Footer comune andrebbe messo qui, fuori dalle Routes */}
    </div>
  );
};

export default App;