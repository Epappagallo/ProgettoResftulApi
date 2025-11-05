// src/components/Layout/Header/MiniHeader.tsx (Nuovo file)
import React, { useState } from 'react';
import styles from './MiniHeader.module.css';
// Importiamo le icone di base (Assumo l'uso di react-icons per semplicità)
import { IoIosArrowDown, IoMdNotificationsOutline, IoMdCart } from 'react-icons/io';
import { Link } from 'react-router-dom'; // Assumiamo l'uso di React Router DOM

const MiniHeader: React.FC = () => {
    // Stato per gestire l'apertura dei menu a tendina
    const [isWatchingOpen, setIsWatchingOpen] = useState(false);
    const [isMyEbayOpen, setIsMyEbayOpen] = useState(false);

    // Dati per il menu "Il mio eBay"
    const myEbayItems = [
        'Riepilogo', 'Visti di recente', 'Offerte/Proposte', 'Oggetti che osservi',
        'Cronologia acquisti', 'Vendite', 'Feed salvato', 'Ricerche salvate',
        'Venditori salvati', 'Il mio garage', 'Messaggi'
    ];

    // Funzioni per l'apertura e chiusura, gestendo anche ilmouseleave
    const handleMouseEnter = (setter: React.Dispatch<React.SetStateAction<boolean>>) => setter(true);
    const handleMouseLeave = (setter: React.Dispatch<React.SetStateAction<boolean>>) => setter(false);

    // Utilizziamo un div per il link Accedi/Registrati che punta al login (Route: /login)
    // Nel contesto di un simulatore, i link che non portano da nessuna parte avranno solo un onClick vuoto
    const handleNoNavClick = (e: React.MouseEvent) => {
        e.preventDefault(); 
        // console.log("Azione non implementata in questo simulatore.");
    };

    return (
        <div className={styles.miniHeaderContainer}>
            <div className={styles.contentWrapper}>
                <ul className={styles.linkList}>
                    {/* ACCEDI O REGISTRATI - Cliccabile e di colore blu */}
                    <li className={styles.navItem}>
                        Ciao! <Link to="/login" className={styles.blueLink}>Accedi</Link> o <Link to="/login" className={styles.blueLink}>registrati</Link>
                    </li>

                    {/* Altri Link, hoverabili ma non navigabili */}
                    <li className={styles.navItem} onClick={handleNoNavClick}>eBay Extra</li>
                    <li className={styles.navItem} onClick={handleNoNavClick}>eBay Imperdibili</li>
                    <li className={styles.navItem} onClick={handleNoNavClick}>Aiuto e contatti</li>
                    <li className={styles.navItem} onClick={handleNoNavClick}>Vendi</li>

                    {/* OGGETTI CHE OSSERVI - Menu a Tendina */}
                    <li 
                        className={`${styles.navItem} ${styles.dropdownContainer}`}
                        onMouseEnter={() => handleMouseEnter(setIsWatchingOpen)}
                        onMouseLeave={() => handleMouseLeave(setIsWatchingOpen)}
                    >
                        Oggetti che osservi <IoIosArrowDown className={styles.arrowIcon} />
                        
                        {isWatchingOpen && (
                            <div className={styles.dropdownMenu}>
                                <p className={styles.dropdownText}>
                                    <Link to="/login" className={styles.blueLink}>Accedi</Link> per vedere tutti gli oggetti che stai osservando.
                                </p>
                            </div>
                        )}
                    </li>

                    {/* IL MIO EBAY - Menu a Tendina */}
                    <li 
                        className={`${styles.navItem} ${styles.dropdownContainer}`}
                        onMouseEnter={() => handleMouseEnter(setIsMyEbayOpen)}
                        onMouseLeave={() => handleMouseLeave(setIsMyEbayOpen)}
                    >
                        Il mio eBay <IoIosArrowDown className={styles.arrowIcon} />

                        {isMyEbayOpen && (
                            <div className={styles.dropdownMenu}>
                                <ul>
                                    {myEbayItems.map((item) => (
                                        <li key={item} className={styles.dropdownItem} onClick={handleNoNavClick}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                </ul>

                {/* Sezione Icone a Destra */}
                <div className={styles.iconContainer}>
                    {/* Campanella (Notifiche) */}
                    <div className={styles.iconWrapper} onClick={handleNoNavClick}>
                        <IoMdNotificationsOutline size={20} className={styles.serviceIcon} />
                    </div>

                    {/* Carrello */}
                    <div className={styles.iconWrapper} onClick={handleNoNavClick}>
                        <IoMdCart size={20} className={styles.serviceIcon} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiniHeader;