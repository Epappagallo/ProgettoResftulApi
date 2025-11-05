// src/components/Layout/Header/Header.tsx (AGGIORNATO)

import React from 'react';
import styles from './Header.module.css';
import MiniHeader from './miniHeader';
import SearchBox from './searchBox';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            {/* 1. Inseriamo il MiniHeader (la prima riga) */}
            <MiniHeader /> 

            {/* 2. La riga principale (seconda riga) con Logo, Search e Carrello (rimosso) */}
            <div className={styles.mainHeaderRow}>
                <div className={styles.logoContainer}>
                    <a href="/" className={styles.logoLink}>
                        <span className={styles.logoText}>Simulatore eBay</span>
                    </a>
                </div>

                {/* Barra di Ricerca Centralizzata */}
                <SearchBox /> 

                {/* Lo spazio Utente / Carrello è ora nel MiniHeader, 
                    quindi qui possiamo mettere una navigazione secondaria, se richiesta
                    o lasciare questo spazio vuoto/semplificato. */}
                <div className={styles.userSpaceFiller}>
                    {/* Placeholder o altri link rapidi se necessari */}
                </div>
            </div>
            
            {/* Barra di Navigazione Secondaria per Categorie */}
            <nav className={styles.categoryNav}>
                {/* ... (Lasciamo il contenuto invariato per ora) ... */}
            </nav>
        </header>
    );
};

export default Header;