// src/components/cards/productCard.tsx

import React from 'react';
import { useShopContext } from '../../context/shopContext'; 
import type { ProductData as HookProductData } from '../../hooks/useShop';

export interface ProductData extends HookProductData {
    title: string; 
    currency: string; 
    conditionDetail: string; 
    shippingText: string; 
    extraInfo?: string; 
    rating?: number; 
}

interface ProductCardProps {
    product: ProductData;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addItemToCart, isLoading } = useShopContext();

    const formatPrice = (price: number) => 
        new Intl.NumberFormat('it-IT', { style: 'currency', currency: product.currency || "EUR" }).format(price);

    const handleNavigate = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log(`Naviga al prodotto ID: ${product.id}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); 
        e.stopPropagation(); // Evita che il click sul bottone apra il link
        
        if (product.stock <= 0) {
            alert("Prodotto esaurito!");
            return;
        }
        addItemToCart(product.id);
    };

    const renderRating = () => {
        if (!product.rating) return null;
        return <span style={{ color: 'gold' }}>⭐ ({product.rating})</span>;
    }

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '5px', borderRadius: '8px' }}>
            {/* LINK PRINCIPALE */}
            <a href={`/prodotto/${product.id}`} onClick={handleNavigate} style={{ textDecoration: 'none', color: 'inherit' }}>
                
                <div style={{ height: '150px', overflow: 'hidden' }}>
                    <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ padding: '10px 0' }}>
                    <h3 style={{ fontSize: '1em', margin: '5px 0' }}>{product.title}</h3>
                    <div style={{ fontSize: '0.8em', color: '#555' }}>{product.conditionDetail}</div>
                    {renderRating()}
                    
                    <div style={{ fontWeight: 'bold', fontSize: '1.2em', margin: '5px 0' }}>
                        {formatPrice(product.price)}
                    </div>

                    <div style={{ fontSize: '0.9em', color: product.shippingText.includes('gratuita') ? 'green' : '#333' }}>
                        {product.shippingText}
                    </div>

                    {product.extraInfo && (<div style={{ fontSize: '0.8em', color: 'blue' }}>{product.extraInfo}</div>)}
                </div>
            </a>
            
            {/* PULSANTE DI AZIONE CARRELLO */}
            <div style={{ marginTop: '10px' }}>
                <button
                    onClick={handleAddToCart}
                    disabled={isLoading || product.stock <= 0}
                    style={{ 
                        width: '100%', 
                        padding: '8px', 
                        backgroundColor: product.stock > 0 ? '#0066ff' : '#6c757d', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {isLoading ? 'Aggiunta...' : product.stock > 0 ? 'Aggiungi al Carrello' : 'Esaurito'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;