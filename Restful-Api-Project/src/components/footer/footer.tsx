// src/components/Footer/Footer.tsx
import React from 'react';

// Interfaccia opzionale, se il footer prendesse delle props (es. data copyright)
interface FooterProps {
  copyrightYear?: number;
}

const Footer: React.FC<FooterProps> = ({ copyrightYear = new Date().getFullYear() }) => {
  return (
    <footer style={{ 
        marginTop: '80px', 
        fontSize: '0.8em', 
        color: '#aaa',
        borderTop: '1px solid #eee',
        paddingTop: '15px'
    }}>
      © {copyrightYear} Progetto React & TypeScript. Tutti i diritti riservati.
    </footer>
  );
};

export default Footer;

// NOTA: I suoi stili andrebbero in un Footer.module.css accanto