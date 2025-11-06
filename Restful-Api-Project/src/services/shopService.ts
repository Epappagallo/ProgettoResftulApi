// src/services/ShopService.ts

import type { ProductData } from '../hooks/useShop';

// Interfaccia per il Carrello (CartItem è un ProductData esteso)
export interface CartItem extends ProductData {
    quantity: number;
    orderId: number; // ID fittizio dell'ordine generato dal Mock Server POST
}

// ⭐ BASE URL DEL TUO MOCK SERVER POSTMAN
const BASE_API_URL = 'https://34dcf2d6-239d-472f-a28d-8eb92dd3a99d.mock.pstmn.io';

const getHeaders = () => ({
    'Content-Type': 'application/json',
});

/**
 * 1. GET: Ottiene i dati dello shop (prodotti) dal Mock Server.
 */
export const getProducts = async (): Promise<ProductData[]> => {
    try {
        // ASSUMIAMO: Endpoint per i prodotti è '/items'
        const response = await fetch(`${BASE_API_URL}/items`, { headers: getHeaders() });
        
        if (!response.ok) {
            throw new Error(`Errore nel recupero dei prodotti: ${response.status}`);
        }
        
        const data: ProductData[] = await response.json(); 
        return data; 
    } catch (error) {
        console.error("Errore GET products:", error);
        return [];
    }
};

/**
 * 2. POST: Aggiunge un prodotto al carrello.
 */
export const postNewOrder = async (productId: number, quantity: number): Promise<CartItem> => {
    try {
        // ASSUMIAMO: Endpoint per aggiungere al carrello è '/cart'
        const response = await fetch(`${BASE_API_URL}/cart`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ productId, quantity })
        });

        if (!response.ok) {
             throw new Error(`Errore POST new order: ${response.status}`);
        }

        // Il Mock Server DEVE restituire l'oggetto CartItem completo (con orderId)
        const newCartItem: CartItem = await response.json();
        return newCartItem;

    } catch (error) {
        console.error("Errore POST new order:", error);
        throw error;
    }
};


/**
 * 3. PUT: Modifica la quantità di un prodotto nel carrello.
 */
export const putUpdateQuantity = async (orderId: number, newQuantity: number): Promise<void> => {
    console.log(`PUT: Aggiornamento quantità Ordine ID ${orderId} a ${newQuantity}`);
    
    const response = await fetch(`${BASE_API_URL}/cart/${orderId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ quantity: newQuantity })
    });

    if (!response.ok) {
        throw new Error(`Errore PUT update quantity: ${response.status}`);
    }
};

/**
 * 4. DELETE: Elimina un ordine dal carrello.
 */
export const deleteOrder = async (orderId: number): Promise<void> => {
    const response = await fetch(`${BASE_API_URL}/cart/${orderId}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    
    if (!response.ok) {
        throw new Error(`Errore DELETE order: ${response.status}`);
    }
};

/**
 * 5. DELETE ALL: Paga e svuota il carrello.
 */
export const deleteAllOrders = async (orderIds: number[]): Promise<void> => {
    // Esecuzione in parallelo di tutte le eliminazioni
    await Promise.all(orderIds.map(id => deleteOrder(id)));
};