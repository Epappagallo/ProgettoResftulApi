// src/components/Layout/Header/Header.tsx (VERSIONE DEFINITIVA E PULITA)

import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import MiniHeader from './miniHeader';
import SearchBox from './searchBox';
import SearchButton from '../buttons/searchButton';
import { IoIosArrowDown } from 'react-icons/io';

interface HeaderProps {
    totalItems: number;
    onNavigateToCart: () => void;
    onNavigateToHome: () => void;
    onNavigateToLogin: () => void;
    isCartPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
    totalItems,
    onNavigateToCart, 
    onNavigateToHome, 
    onNavigateToLogin, 
    isCartPage 
}) => {
    const logoSrc = "/ebayLogo.png";
    const handleSearchClick = (e: React.MouseEvent) => { e.preventDefault(); console.log("Azione di ricerca avviata!"); };
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 700);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 700);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const cartCount = totalItems; 


    return (
        <header className={styles.header}>
            {/* MiniHeader riceve le props per carrello e login */}
            <MiniHeader 
                cartCount={cartCount} 
                onViewCart={onNavigateToCart}
                onNavigateToLogin={onNavigateToLogin}
            /> 

            <div className={styles.mainHeaderRow}>
                <div className={styles.logoContainer}>
                    {/* Il logo ora usa la funzione onNavigateToHome */}
                    <a 
                        href="/" 
                        onClick={(e) => { e.preventDefault(); onNavigateToHome(); }} 
                        className={styles.logoLink}
                    >
                        {/*  */}
                        <img 
                            src={logoSrc} 
                            alt="Logo Simulatore eBay" 
                            className={styles.logoImage} 
                        />
                    </a>
                </div>

                {/* Scritta "Scegli la tua categoria" tra logo e search */}
                {isLargeScreen && !isCartPage && ( 
                    <div className={styles.chooseCategoryText}>
                        <span>Scegli la tua categoria</span>
                        <IoIosArrowDown className={styles.chooseCategoryArrow} />
                    </div>
                )}

                {/* Contenitore flessibile che affianca la SearchBox */}
                <div className={styles.searchWrapper}> 
                    {!isCartPage && <SearchBox />} 
                </div>

                {/* Contenitore per Cerca e Avanzata all'estrema destra */}
                {window.innerWidth > 700 && !isCartPage && ( 
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