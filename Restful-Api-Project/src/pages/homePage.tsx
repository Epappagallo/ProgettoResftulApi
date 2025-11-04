import React from 'react'; // Corretto: React con la R maiuscola
import type { HomePageProps } from '../types/pageProps';
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
                {/* Mantenuta la classe button della HEAD per coerenza */}
                <button className={styles.button} onClick={onNavigateToLogin}>
                    Vai al Login
                </button>
            </div>
        </div>
    );
}; // Corretto: sintassi finale pulita

export default HomePage;
