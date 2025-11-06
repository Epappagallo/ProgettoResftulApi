// src/components/Common/ProductCard/ProductCard.tsx (REVISIONATO)

import React from 'react';
import styles from './ProductCard.module.css';
// Rimosse le icone non necessarie

// Interfaccia che definisce i dati che la card riceverà
export interface ProductData {
    id: number;
    title: string;
    price: number;
    currency: string; // Es: "EUR"
    conditionDetail: string; // Es: "Professionale"
    shippingText: string; // Es: "Spedizione gratuita" o "+ EUR 9,90 sped."
    extraInfo?: string; // Es: "73 venduti" o "Osservato da 43 persone"
    imageUrl: string;
    rating?: number; // Es: (1) per la quarta card
}

interface ProductCardProps {
    product: ProductData;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    // Funzione stub per simulare la navigazione
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log(`Naviga al prodotto ID: ${product.id}`);
    };

    // Placeholder per la stella di rating (potrebbe essere un componente a parte in futuro)
    const renderRating = () => {
        if (!product.rating) return null;
        // In un'implementazione reale useremmo un'icona stella.
        // Qui simuleremo con un placeholder
        return (
            <span className={styles.rating}>
                ⭐ ({product.rating})
            </span>
        );
    }

    return (
        <a href={`/prodotto/${product.id}`} className={styles.cardLink} onClick={handleClick}>
            <div className={styles.card}>
                
                {/* 1. Immagine */}
                <div className={styles.imageWrapper}>
                    <img 
                        src={product.imageUrl} 
                        alt={product.title} 
                        className={styles.productImage} 
                    />
                    {/* Rimosso il bottone Preferiti */}
                </div>

                {/* 2. Dettagli Prodotto */}
                <div className={styles.details}>
                    
                    {/* Titolo */}
                    <h3 className={styles.title} title={product.title}>
                        {product.title}
                    </h3>

                    {/* Dettaglio Condizione (Es: Professionale) */}
                    <div className={styles.conditionDetail}>{product.conditionDetail}</div>
                    
                    {/* Rating (se presente) */}
                    {renderRating()}
                    
                    {/* Prezzo */}
                    <div className={styles.priceContainer}>
                        <span className={styles.currentPrice}>
                            {product.currency} {product.price.toFixed(2).replace('.', ',')}
                        </span>
                    </div>

                    {/* Spedizione */}
                    <div className={styles.shippingText}>
                        {product.shippingText}
                    </div>

                    {/* Informazioni Aggiuntive (Venduti/Osservati) */}
                    {product.extraInfo && (
                        <div className={styles.extraInfo}>{product.extraInfo}</div>
                    )}
                </div>
            </div>
        </a>
    );
};

export default ProductCard;