// src/components/Common/SearchButton/SearchButton.tsx (Nuovo file)
import React from 'react';
import styles from './SearchButton.module.css';

interface SearchButtonProps {
  label: string;
  onClick: (event: React.MouseEvent) => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ label, onClick }) => {
  return (
    <button 
      type="submit" 
      className={styles.searchButton} 
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SearchButton;