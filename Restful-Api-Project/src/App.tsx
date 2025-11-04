import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';

import './App.css'; 

// [TEMPORANEA] Interfaccia semplificata, in attesa di definire pageProps.ts
interface HomePageProps {
  onNavigateToLogin: () => void;
}


const App: React.FC = () => {
  // L'hook useNavigate è sufficiente per il routing
  const navigate = useNavigate();

  // Funzione per la navigazione al login, passata alla HomePage
  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="App">
      {/* 🧭 Definiamo qui tutte le nostre rotte */}
      <Routes>
        
        {/* Rotta della Home (Pagina principale) */}
        <Route 
          path="/" 
          // Uso la funzione di navigazione definita sopra
          element={<HomePage onNavigateToLogin={handleNavigateToLogin} />} 
        />
        
        {/* Rotta di Login */}
        <Route 
          path="/login" 
          // Il componente LoginPage gestirà il proprio stato (username) e navigazione.
          element={<LoginPage />} 
        />
        
        {/* Rotta di fallback per URL inesistenti */}
        <Route 
          path="*" 
          element={<h1>404 | Pagina Non Trovata</h1>} 
        />
        
      </Routes>
      
    </div>
  );
};

export default App;
