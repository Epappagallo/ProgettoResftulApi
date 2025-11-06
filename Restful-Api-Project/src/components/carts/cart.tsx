// src/components/Common/Cart/Cart.tsx (NUOVO FILE)

import React from 'react';
import styles from './Cart.module.css';
import { useShop } from '../../hooks/useShop';
import type { CartItem } from '../../services/shopService';

const Cart: React.FC = () => {
    const { 
        cart, 
        isLoading, 
        totalPrice, 
        updateCartItemQuantity, 
        removeItemFromCart, 
        checkout 
    } = useShop();

    if (isLoading) {
        // Se l'operazione in background è in corso (es. un POST/PUT), mostriamo il loading
        // Nota: Il loading è gestito globalmente dall'hook, ma qui lo usiamo per il carrello
    }

    // Funzione per gestire il cambio di quantità (PUT)
    const handleQuantityChange = (orderId: number, event: React.ChangeEvent<HTMLSelectElement>) => {
        const newQuantity = parseInt(event.target.value);
        updateCartItemQuantity(orderId, newQuantity);
    };

    // Funzione per gestire la rimozione (DELETE)
    const handleRemoveItem = (orderId: number) => {
        if (window.confirm("Sei sicuro di voler rimuovere questo prodotto?")) {
            removeItemFromCart(orderId);
        }
    };

    const renderCartItem = (item: CartItem) => (
        <div key={item.orderId} className={styles.cartItem}>
            <img src={item.imageUrl} alt={item.title} className={styles.itemImage} />
            <div className={styles.itemDetails}>
                <h4 className={styles.itemTitle}>{item.title}</h4>
                <div className={styles.itemInfo}>
                    <span>{item.currency} {item.price.toFixed(2).replace('.', ',')} cad.</span>
                    <span className={styles.itemShipping}>{item.shippingText}</span>
                </div>
            </div>
            
            <div className={styles.itemActions}>
                {/* PUT: Selettore Quantità */}
                <select 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.orderId, e)}
                    className={styles.quantitySelector}
                    aria-label="Seleziona Quantità"
                >
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
                
                {/* DELETE: Bottone Rimuovi */}
                <button 
                    onClick={() => handleRemoveItem(item.orderId)} 
                    className={styles.removeButton}
                >
                    Rimuovi
                </button>
            </div>
        </div>
    );

    return (
        <div className={styles.cartContainer}>
            <h2 className={styles.cartTitle}>Il tuo Carrello ({cart.length} Articoli)</h2>
            
            {cart.length === 0 ? (
                <div className={styles.emptyCart}>Il tuo carrello è vuoto.</div>
            ) : (
                <>
                    <div className={styles.itemList}>
                        {cart.map(renderCartItem)}
                    </div>

                    <div className={styles.cartSummary}>
                        <div className={styles.summaryRow}>
                            <span>Totale Subtotale ({cart.length} articoli):</span>
                            <span className={styles.totalPrice}>
                                EUR {totalPrice.toFixed(2).replace('.', ',')}
                            </span>
                        </div>
                        
                        {/* Bottone Paga (DELETE ALL) */}
                        <button 
                            onClick={checkout} 
                            className={styles.checkoutButton}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Elaborazione...' : 'Paga con PayPal o Carta'}
                        </button>
                        <div className={styles.paymentDisclaimer}>
                            Transazione simulata. Gli ordini verranno resettati.
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;