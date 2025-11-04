import react from 'react';
import type { HomePageProps } from '../types/pageProps';
import styles from './homePage.module.css';

const HomePage: React.FC<HomePageProps> = ({ onNavigateToLogin }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Benvenuto nella Home Page</h1>
            <p className={styles.description}>
                Questa è la Home Page temporanea...
            </p>
            <div className={styles.buttonContainer}>
                <button className={styles.loginButton} onClick={onNavigateToLogin}>
                    Vai al Login
                </button>
            </div>
        </div>
    );
};

export default HomePage;