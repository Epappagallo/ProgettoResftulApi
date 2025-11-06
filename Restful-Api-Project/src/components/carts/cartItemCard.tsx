// src/components/Cart/CartItemCard.tsx (NUOVO FILE)

import React, { useState } from 'react';
import { useShopContext } from '../../context/shopContext';
import type { CartItem } from '../../hooks/useShop';

interface CartItemCardProps {
    item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
    // Otteniamo le funzioni di shop
    const { updateCartItemQuantity, removeItemFromCart, isLoading } = useShopContext();
    // Usiamo lo stato locale per la quantità visualizzata
    const [quantity, setQuantity] = useState(item.quantity);

    // Funzione per formattare il prezzo in Euro
    const formatPrice = (price: number) => 
        new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(price);

    // Gestisce il cambio di quantità tramite input o pulsanti
    const handleQuantityChange = (newQuantity: number) => {
        // Impedisce che la quantità scenda sotto 1 nell'input
        if (newQuantity < 1) return;
        
        setQuantity(newQuantity);
        
        // Chiama la funzione PUT del carrello dopo un breve ritardo per evitare troppe chiamate API veloci
        // (In un'app reale useremmo un debounce)
        updateCartItemQuantity(item.orderId, newQuantity);
    };

    const handleRemove = () => {
        // Chiama la funzione DELETE del carrello
        removeItemFromCart(item.orderId);
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '10px', 
            borderBottom: '1px solid #ccc' 
        }}>
            
            <div style={{ flex: 3 }}>
                **{item.name}** </div>

            <div style={{ flex: 1, textAlign: 'center' }}>
                {formatPrice(item.price)}
            </div>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    disabled={isLoading}
                    style={{ width: '50px', textAlign: 'center' }}
                />
            </div>

            <div style={{ flex: 1, textAlign: 'right' }}>
                **{formatPrice(item.price * item.quantity)}**
            </div>

            <button 
                onClick={handleRemove} 
                disabled={isLoading}
                style={{ marginLeft: '20px', backgroundColor: 'red', color: 'white', border: 'none' }}
            >
                ❌ Rimuovi
            </button>
        </div>
    );
};

export default CartItemCard;