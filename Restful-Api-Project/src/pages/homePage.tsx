// src/pages/HomePage.tsx
import React from 'react'; // React con la R maiuscola
import { HomePageProps } from '../types/pageProps';
import styles from './homePage.module.css';

// Correzione qui: HomePageProps
const HomePage: React.FC<HomePageProps> = ({ onNavigateToLogin }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Benvenuto nella Home Page</h1>
            <p className={styles.description}>
                Questa è la Home Page temporanea...
            </p>
            <div className={styles.buttonContainer}>
                {/* Rimosso il commento in più */}
                <button className={styles.button} onClick={onNavigateToLogin}>
                    Vai al Login
                </button>
            </div>
        </div>
    );
}

export default HomePage;