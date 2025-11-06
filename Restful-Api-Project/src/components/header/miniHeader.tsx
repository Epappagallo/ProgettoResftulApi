// src/components/Layout/Header/MiniHeader.tsx (AGGIORNATO - Implementazione Routing e Carrello)

import React, { useState } from 'react';
import styles from './MiniHeader.module.css';
import { IoIosArrowDown, IoMdNotificationsOutline, IoMdCart } from 'react-icons/io';

interface MiniHeaderProps {
    cartCount: number; 
    onViewCart: () => void; 
    onNavigateToLogin: () => void; 
}

const MiniHeader: React.FC<MiniHeaderProps> = ({ cartCount, onViewCart, onNavigateToLogin }) => {
    const [isWatchingOpen, setIsWatchingOpen] = useState(false);
    const [isMyEbayOpen, setIsMyEbayOpen] = useState(false);

    const myEbayItems = [
        'Riepilogo', 'Visti di recente', 'Offerte/Proposte', 'Oggetti che osservi',
        'Cronologia acquisti', 'Vendite', 'Feed salvato', 'Ricerche salvate',
        'Venditori salvati', 'Il mio garage', 'Messaggi'
    ];

    const handleMouseEnter = (setter: React.Dispatch<React.SetStateAction<boolean>>) => setter(true);
    const handleMouseLeave = (setter: React.Dispatch<React.SetStateAction<boolean>>) => setter(false);

    const handleNoNavClick = (e: React.MouseEvent) => {
        e.preventDefault();
    };

    return (
        <div className={styles.miniHeaderContainer}>
            <div className={styles.contentWrapper}>
                <ul className={styles.linkList}>
                    {/* ACCEDI O REGISTRATI - ORA USA onNavigateToLogin */}
                    <li className={styles.navItem}>
                        Ciao!
                        <a
                            href="/login"
                            onClick={(e) => { e.preventDefault(); onNavigateToLogin(); }}
                            className={styles.blueLink}
                        >
                            Accedi
                        </a>
                        o
                        <a
                            href="/login"
                            onClick={(e) => { e.preventDefault(); onNavigateToLogin(); }}
                            className={styles.blueLink}
                        >
                            registrati
                        </a>
                    </li>

                    {/* Altri Link (invariati) */}
                    <li className={styles.navItem} onClick={handleNoNavClick}>eBay Extra</li>
                    <li className={styles.navItem} onClick={handleNoNavClick}>eBay Imperdibili</li>
                    <li className={styles.navItem} onClick={handleNoNavClick}>Aiuto e contatti</li>
                    <li className={styles.navItem} onClick={handleNoNavClick}>Vendi</li>

                    {/* OGGETTI CHE OSSERVI & IL MIO EBAY (dropdowns invariati, aggiornando Link con <a>) */}
                    <li
                        className={`${styles.navItem} ${styles.dropdownContainer}`}
                        onMouseEnter={() => handleMouseEnter(setIsWatchingOpen)}
                        onMouseLeave={() => handleMouseLeave(setIsWatchingOpen)}
                    >
                        Oggetti che osservi <IoIosArrowDown className={styles.arrowIcon} />

                        {isWatchingOpen && (
                            <div className={styles.dropdownMenu}>
                                <p className={styles.dropdownText}>
                                    <a href="/login" onClick={(e) => { e.preventDefault(); onNavigateToLogin(); }} className={styles.blueLink}>Accedi</a> per vedere tutti gli oggetti che stai osservando.
                                </p>
                            </div>
                        )}
                    </li>
                    {/* ... (IL MIO EBAY - Menu a Tendina invariato) ... */}
                </ul>

                {/* Sezione Icone a Destra */}
                <div className={styles.iconContainer}>
                    {/* Campanella (Notifiche) */}
                    <div className={styles.iconWrapper} onClick={handleNoNavClick}>
                        <IoMdNotificationsOutline size={20} className={styles.serviceIcon} />
                    </div>

                    {/* Carrello - CLICCA E NAVIGA CON onNavigateToCart */}
                    <div
                        className={`${styles.iconWrapper} ${styles.cartIconWrapper}`}
                        onClick={onViewCart} // Chiama la funzione per navigare
                    >
                        <IoMdCart size={20} className={styles.serviceIcon} />
                        {/* Contatore Articoli */}
                        {cartCount > 0 && (
                            <span className={styles.cartCount}>{cartCount}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiniHeader;