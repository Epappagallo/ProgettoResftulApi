// src/pages/homePage.tsx

import React from 'react';
import Header from '../components/header/header'; 
import Footer from '../components/footer/footer'; 
// import styles from './homePage.module.css';
import ProductGrid from '../components/productGrid/productGrid';
import { useShopContext } from '../context/shopContext'; 

interface HomePageProps {
    onNavigateToLogin: () => void;
    onNavigateToCart: () => void;
    onNavigateToHome: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToLogin, onNavigateToCart, onNavigateToHome }) => {
    const { cart } = useShopContext();

    const totalItems = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <>
            <Header 
                totalItems={totalItems} 
                onNavigateToCart={onNavigateToCart}
                onNavigateToHome={onNavigateToHome}
                onNavigateToLogin={onNavigateToLogin}
                isCartPage={false} 
            />
            <main style={{ padding: '20px' }}>
                <ProductGrid />
            </main>
            <Footer /> 
        </>
    );
};

export default HomePage;