import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ShopProvider } from './context/shopContext';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import CartPage from './pages/cartPage';

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
  
  // Funzione per la navigazione al carrello
  const handleNavigateToCart = () => {
    navigate('/cart');
  };
  
  // Funzione per la navigazione alla home
  const handleNavigateToHome = () => {
    navigate('/');
  };

  return (
    <div className="App">
      {/* 🌟 Avvolgiamo tutto nello ShopProvider per l'accesso globale allo stato */}
      <ShopProvider>
        
        <Routes>
          
          {/* Rotta della Home (Pagina principale) */}
          <Route 
            path="/" 
            element={
              <HomePage 
                onNavigateToLogin={handleNavigateToLogin} 
                onNavigateToCart={handleNavigateToCart} // Passiamo la funzione al MiniHeader
                onNavigateToHome={handleNavigateToHome} // Passiamo la funzione al Logo
              />
            } 
          />
          
          {/* Rotta di Login */}
          <Route 
            path="/login" 
            element={<LoginPage />} 
          />
          
          {/* 🛒 Rotta del Carrello */}
          <Route 
            path="/cart" 
            element={
              <CartPage 
                onNavigateToHome={handleNavigateToHome} // Passiamo la funzione per tornare allo shop
              />
            } 
          />
          
          {/* Rotta di fallback per URL inesistenti */}
          <Route 
            path="*" 
            element={<h1>404 | Pagina Non Trovata</h1>} 
          />
          
        </Routes>
        
      </ShopProvider>
    </div>
  );
};

export default App;