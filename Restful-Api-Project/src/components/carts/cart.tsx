// src/components/carts/cart.tsx

import React from 'react';
import { useShopContext } from '../../context/shopContext';

const Cart: React.FC = () => {
    // 1. Estrai i dati e le funzioni necessarie dal contesto
    const { cart, totalPrice, isLoading, error, updateCartItemQuantity, removeItemFromCart, checkout } = useShopContext();

    // Gestione degli stati: Errore
    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2 style={{ color: 'red' }}>Errore Caricamento Carrello: {error}</h2>
                <p>Si prega di riprovare più tardi.</p>
            </div>
        );
    }
    
    // Gestione degli stati: Caricamento
    if (isLoading && cart.length === 0) {
        return <h2 style={{ textAlign: 'center', padding: '50px' }}>Caricamento Carrello...</h2>;
    }

    // Gestione degli stati: Carrello Vuoto
    if (cart.length === 0) {
        return <h2 style={{ textAlign: 'center', padding: '50px' }}>Il tuo carrello è vuoto! 🛍️</h2>;
    }

    // ----------------------------------------------------
    // Stato: Visualizzazione Carrello
    // ----------------------------------------------------

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                Il Tuo Carrello ({cart.length} articoli unici)
            </h1>

            {/* Tabella degli Articoli */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #000' }}>
                        <th style={{ textAlign: 'left', padding: '10px 0' }}>Prodotto</th>
                        <th style={{ width: '15%', padding: '10px 0' }}>Quantità</th>
                        <th style={{ width: '15%', padding: '10px 0' }}>Prezzo Unità</th>
                        <th style={{ width: '15%', padding: '10px 0', textAlign: 'right' }}>Totale</th>
                        <th style={{ width: '5%', padding: '10px 0' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.orderId} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '15px 0' }}>
                                <strong>{item.name}</strong>
                                <br />
                                <small>ID Ordine: {item.orderId}</small>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                {/* Input Quantità */}
                                <button 
                                    onClick={() => updateCartItemQuantity(item.orderId, item.quantity - 1)} 
                                    style={{ padding: '5px 10px', marginRight: '5px' }}
                                    disabled={isLoading}
                                >
                                    -
                                </button>
                                
                                <span style={{ padding: '0 10px', fontWeight: 'bold' }}>{item.quantity}</span>

                                <button 
                                    onClick={() => updateCartItemQuantity(item.orderId, item.quantity + 1)} 
                                    style={{ padding: '5px 8px', marginLeft: '5px' }}
                                    disabled={isLoading}
                                >
                                    +
                                </button>
                            </td>
                            <td style={{ textAlign: 'center' }}>€ {item.price.toFixed(2)}</td>
                            <td style={{ textAlign: 'right', fontWeight: 'bold' }}>€ {(item.price * item.quantity).toFixed(2)}</td>
                            <td style={{ textAlign: 'center' }}>
                                {/* Pulsante Rimuovi */}
                                <button 
                                    onClick={() => removeItemFromCart(item.orderId)} 
                                    style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                                    disabled={isLoading}
                                >
                                    ❌
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Sezione Totale e Checkout */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>
                <h2 style={{ margin: 0 }}>Totale Carrello: <span style={{ color: '#007bff' }}>€ {totalPrice.toFixed(2)}</span></h2>
                <button 
                    onClick={checkout} 
                    style={{ padding: '15px 30px', fontSize: '1.2em', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    disabled={isLoading || cart.length === 0}
                >
                    Procedi all'Ordine
                </button>
            </div>
        </div>
    );
};

export default Cart;