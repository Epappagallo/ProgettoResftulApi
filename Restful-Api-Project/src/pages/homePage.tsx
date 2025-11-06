// src/pages/homePage.tsx (CORRETTO E AGGIORNATO)

import React from 'react';
// Corretto il percorso dell'Header (era '../components/header/header')
import Header from '../components/header/header'; 
import Footer from '../components/footer/footer'; 
import styles from './homePage.module.css';
// Corretto il percorso di ProductGrid (era '../components/productGrid/productGrid')
import ProductGrid from '../components/productGrid/productGrid';
import { useShopContext } from '../context/shopContext';

// Interfaccia Props corretta per il routing
interface HomePageProps {
    onNavigateToLogin: () => void;
    onNavigateToCart: () => void; // Aggiunto
    onNavigateToHome: () => void; // Aggiunto (per il logo)
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToLogin, onNavigateToCart, onNavigateToHome }) => {
    // Ottiene lo stato globale (prodotti, carrello, ecc.) tramite il context
    const shopState = useShopContext();

    return (
        <>
            {/* 2. Inseriamo l'Header in cima e passiamo le props di navigazione e lo stato dello shop */}
            <Header 
                shopState={shopState}
                onNavigateToCart={onNavigateToCart}
                onNavigateToHome={onNavigateToHome}
                onNavigateToLogin={onNavigateToLogin} // Passiamo anche la navigazione al login
                isCartPage={false}
            />

            {/* 3. Contenuto principale della Home Page */}
            <main className={styles.mainContent}>
                {/* 🛍️ Inseriamo la griglia sotto l'Header */}
                <ProductGrid />
                
                {/* La sezione placeholder è stata mantenuta, ma ProductGrid dovrebbe essere il contenuto principale */}
                <div className={styles.placeholderSection}>
                    <h2>Contenuto Principale Aggiuntivo</h2>
                    <p>Qui verranno visualizzati i componenti modulari (Categorie, Banner, etc.).</p>
                </div>
            </main>

            {/* 4. Inseriamo il Footer */}
            <Footer /> 
        </>
    );
};

export default HomePage;