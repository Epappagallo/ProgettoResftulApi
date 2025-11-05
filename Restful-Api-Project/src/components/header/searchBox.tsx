// src/components/Common/SearchBox/SearchBox.tsx

import React, { useState, useEffect } from 'react';
import styles from './SearchBox.module.css';
import { IoIosSearch, IoIosArrowDown } from 'react-icons/io'; 

const ebayCategories = [
    "Tutte le categorie", "Arte e antiquariato", "Auto e moto: ricambi e accessori", 
    "Bellezza e salute", "Casa, arredamento e bricolage", "Collezionismo", 
    "Elettronica", "Film e DVD", "Fotografia e video", "Giocattoli e modellismo", 
    "Informatica", "Libri e riviste", "Monete e banconote", "Musica, CD e vinili", 
    "Orologi e gioielli", "Sport", "Strumenti musicali", "Videogiochi e console", 
    "Altro", "Antiquariato", "Articoli per la casa", "Borse e borsellini",
    "Bulloni e dadi", "Cavi e adattatori", "Cellulari e smartphone", "Componenti per PC",
    "Consumabili", "Costumi e travestimenti", "DVD, film e TV", "Forniture per ufficio",
    "Libri d'arte", "Motori: auto e furgoni", "Motori: parti e accessori",
    "Strumenti di misura", "Videocamere" 
];

const SearchBox: React.FC = () => {
    // Mantengo lo stato dello schermo per la visualizzazione del dropdown delle categorie
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 700);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Tutte le categorie"); 

    // LOGICA RESPONSIVE: Aggiorna lo stato dello schermo
    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 700);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Gestione Menu a Tendina: apre/chiude al click (solo su schermi grandi)
    const handleCategoryToggle = (e: React.MouseEvent) => {
        if (isLargeScreen) {
            e.preventDefault(); 
            setIsCategoryOpen(prev => !prev);
        }
    };
    
    // Funzione per selezionare una categoria
    const handleCategorySelect = (e: React.MouseEvent, category: string) => {
        e.preventDefault();
        setSelectedCategory(category);
        setIsCategoryOpen(false); // Chiude il menu dopo la selezione
    };

    // Funzioni stub per l'azione non implementata
    const handleNoClick = (e: React.MouseEvent) => { e.preventDefault(); /* Nessuna azione */ };

    return (
        <form className={styles.searchForm} onSubmit={handleNoClick}>
            <div className={styles.searchContainer}>
                
                {/* 1. Icona Lente Nera e Input */}
                <IoIosSearch className={styles.searchIconLeft} size={20} />
                
                <input 
                    type="text"
                    placeholder="Cerca su eBay"
                    className={styles.searchInput}
                    aria-label="Cerca su eBay"
                />

                {/* 2. Menu a Tendina Categorie (visibile solo se schermo > 700px) */}
                {isLargeScreen && (
                    <div className={styles.categoryDropdownWrapper}>
                        <div 
                            className={styles.categoryDropdown} 
                            onClick={handleCategoryToggle}
                        >
                            <span className={styles.categoryText}>{selectedCategory}</span>
                            <IoIosArrowDown className={styles.categoryArrow} />
                        </div>
                        
                        {isCategoryOpen && (
                            <div className={styles.dropdownMenu}>
                                <ul>
                                    {ebayCategories.map((category) => (
                                        <li 
                                            key={category} 
                                            className={styles.dropdownItem}
                                            onClick={(e) => handleCategorySelect(e, category)}
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </form>
    );
};

export default SearchBox;