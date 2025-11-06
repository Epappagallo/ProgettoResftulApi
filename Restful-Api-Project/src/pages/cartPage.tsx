// src/pages/cartPage.tsx (NUOVO FILE)

import React from 'react';
import Header from '../components/header/header'; 
import Cart from '../components/carts/cart'; 
import { useShopContext } from '../context/shopContext'; 

interface CartPageProps {
    onNavigateToHome: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ onNavigateToHome }) => {
    // Il provider fornisce lo stato di navigazione all'Header
    const shopState = useShopContext(); 
    
    return (
        <>
            {/* Header: Riceve i dati del carrello e la navigazione */}
            <Header 
                shopState={shopState} 
                onNavigateToCart={onNavigateToHome} // Navigazione di fallback (non usata in realtà)
                onNavigateToHome={onNavigateToHome} // Usata dal Logo
                isCartPage={true} // Per gestire eventuali stili specifici
            />
            
            <main style={{ padding: '20px' }}>
                {/* 🛒 Il componente Cart gestisce le operazioni CRUD */}
                <Cart 
                    onViewChange={() => onNavigateToHome()} // Torna alla home
                />
            </main>
        </>
    );
};

export default CartPage;