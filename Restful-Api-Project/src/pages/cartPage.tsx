// src/pages/cartPage.tsx

import React from 'react';
import Header from '../components/header/header'; 
import Footer from '../components/footer/footer';
import Cart from '../components/carts/cart'; // Componente Carrello da creare
import { useShopContext } from '../context/shopContext'; 

interface CartPageProps {
    onNavigateToHome: () => void; 
    onNavigateToCart: () => void; 
    onNavigateToLogin: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ onNavigateToHome, onNavigateToCart, onNavigateToLogin }) => {
    const { cart } = useShopContext(); 
    
    const totalItems = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <>
            <Header 
                totalItems={totalItems} 
                onNavigateToHome={onNavigateToHome}
                onNavigateToCart={onNavigateToCart} 
                onNavigateToLogin={onNavigateToLogin}
                isCartPage={true} // Indica che siamo sul carrello
            />
            
            <main style={{ padding: '20px', minHeight: '80vh' }}>
                {/* Il componente Cart usa direttamente useShopContext */}
                <Cart /> 
            </main>
            <Footer />
        </>
    );
};

export default CartPage;