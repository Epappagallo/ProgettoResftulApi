// src/components/Layout/Header/Header.tsx (AGGIORNATO)

import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import MiniHeader from './miniHeader';
import SearchBox from './searchBox';
import SearchButton from '../buttons/searchButton';
import { IoIosArrowDown } from 'react-icons/io';

const Header: React.FC = () => {
    const logoSrc = "/ebayLogo.png";
    const handleSearchClick = (e: React.MouseEvent) => { e.preventDefault(); console.log("Azione di ricerca avviata!"); };
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 700);

    // LOGICA RESPONSIVE: Aggiorna lo stato dello schermo
    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 700);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className={styles.header}>
            <MiniHeader /> 

            <div className={styles.mainHeaderRow}>
                <div className={styles.logoContainer}>
                    <a href="/" className={styles.logoLink}>
                        <img 
                            src={logoSrc} 
                            alt="Logo Simulatore eBay" 
                            className={styles.logoImage} 
                        />
                    </a>
                </div>

                {/* Scritta "Scegli la tua categoria" tra logo e search */}
                {isLargeScreen && (
                    <div className={styles.chooseCategoryText}>
                        <span>Scegli la tua categoria</span>
                        <IoIosArrowDown className={styles.chooseCategoryArrow} />
                    </div>
                )}

                {/* Contenitore flessibile che affianca la SearchBox */}
                <div className={styles.searchWrapper}> 
                    <SearchBox /> 
                </div>

                {/* Contenitore per Cerca e Avanzata all'estrema destra */}
                {window.innerWidth > 700 && (
                    <div className={styles.buttonsWrapper}>
                        <SearchButton label="Cerca" onClick={handleSearchClick} />
                        <span className={styles.advancedText}>Avanzata</span>
                    </div>
                )}
            </div>
            
            <nav className={styles.categoryNav}>
                {/* ... */}
            </nav>
        </header>
    );
};

export default Header;