// src/App.tsx

import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ShopProvider } from './context/shopContext';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import CartPage from './pages/cartPage';

// NOTA: Devi avvolgere <App /> con <BrowserRouter> nel tuo index.tsx

const AppContent: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToLogin = React.useCallback(() => {
    navigate('/login');
  }, [navigate]);
  
  const handleNavigateToCart = React.useCallback(() => {
    navigate('/cart');
  }, [navigate]);
  
  const handleNavigateToHome = React.useCallback(() => {
    navigate('/');
  }, [navigate]);

  const navProps = {
    onNavigateToLogin: handleNavigateToLogin,
    onNavigateToCart: handleNavigateToCart,
    onNavigateToHome: handleNavigateToHome,
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage {...navProps} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage {...navProps} />} />
        <Route path="*" element={<h1>404 | Pagina Non Trovata</h1>} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
    return (
        // Lo ShopProvider avvolge tutta la logica di business
        <ShopProvider>
            <AppContent />
        </ShopProvider>
    );
};

export default App;