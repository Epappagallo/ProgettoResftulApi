

import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer'; 
import styles from './homePage.module.css';

const HomePage: React.FC = () => {
    return (
        // Usiamo un frammento o un div che racchiuda l'intera pagina
        <>
            {/* 2. Inseriamo l'Header in cima */}
            <Header />

            {/* 3. Contenuto principale della Home Page (ex body) */}
            <main className={styles.mainContent}>
                {/* Qui andranno tutte le sezioni modulari (componenti):
                    - Banner principale
                    - Categorie in evidenza (FeaturedCategories)
                    - Offerte del giorno (DailyDealsSection)
                    - Lista di ProductCard, ecc.
                */}
                <div className={styles.placeholderSection}>
                    <h2>Contenuto Principale della Homepage</h2>
                    <p>Qui verranno visualizzati i componenti modulari (Categorie, Prodotti, Banner).</p>
                </div>
            </main>

            {/* 4. Inseriamo il Footer */}
            <Footer /> 
        </>
    );
};

export default HomePage;