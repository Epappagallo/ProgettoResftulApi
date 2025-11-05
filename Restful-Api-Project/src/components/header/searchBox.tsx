// src/components/Common/SearchBox/SearchBox.tsx (Percorso suggerito)
import React from 'react';
import styles from './SearchBox.module.css'; // Nuovo file CSS per la search box

const SearchBox: React.FC = () => {
    // Qui andrebbe la logica di gestione dello stato e dell'invio (handleSubmit)
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Logica per eseguire la ricerca (es. navigare alla pagina /search?q=query)
        console.log("Ricerca eseguita!");
    };

    return (
        <form className={styles.searchContainer} onSubmit={handleSearch}>
            <input 
                type="text"
                placeholder="Cerca qualsiasi cosa"
                className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton} aria-label="Cerca">
                Cerca
            </button>
        </form>
    );
};

export default SearchBox;