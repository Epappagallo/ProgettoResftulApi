// src/components/productGrid/productGrid.tsx

import React from 'react';
import ProductCard from '../cards/productCard';
import { useShopContext } from '../../context/shopContext';
import styles from './ProductGrid.module.css'; 

const ProductGrid: React.FC = () => {
    const { products, isLoading, error, fetchProducts } = useShopContext();
    const handleRetry = () => {
        fetchProducts();
    };

    if (isLoading && products.length === 0) {
        return <h2 style={{ padding: '40px', textAlign: 'center' }}>Caricamento prodotti...</h2>;
    }

    if (error) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2 style={{ color: 'red' }}>Errore API: {error}</h2>
                <button 
                    onClick={handleRetry} 
                    style={{ 
                        padding: '10px 15px', 
                        marginTop: '15px', 
                        backgroundColor: '#dc3545', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Riprova Caricamento
                </button>
            </div>
        );
    }
    
    if (products.length === 0) {
        return <h2 style={{ padding: '40px', textAlign: 'center' }}>Nessun prodotto trovato. Controlla il tuo Mock Server.</h2>;
    }

    return (
        <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // Griglia responsive
            gap: '20px',
            padding: '20px 0'
        }}>
            {products.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                />
            ))}
        </div>
    );
};

export default ProductGrid;