import react from 'react';
import { HomePageProps } from '../types/pageProps';
import styles from './homePage.module.css';

const HomePage: React.FC<HomePagePros> = ({ onNavigateToLogin }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Benvenuto nella Home Page</h1>
            <p className={styles.description}>
                Questa è la Home Page temporanea...
            </p>
        <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={onNavigateToLogin}>
                Vai al Login//
            </button>
        </div>
        </div>
    );
}