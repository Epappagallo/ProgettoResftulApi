// src/services/ShopService.ts (NUOVO FILE)

import type { ProductData } from  '../components/cards/productCard';

// Interfaccia per il Carrello
export interface CartItem extends ProductData {
    quantity: number;
    orderId: number; // ID fittizio dell'ordine
}

// URL base di JSONPlaceholder per simulare i prodotti (useremo /posts)
const JSON_PLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/posts';
const MOCK_IMAGE_URLS = [
    "https://i.imgur.com/e5t9I5Q.png", 
    "https://i.imgur.com/p0T8cWf.png", 
    "https://i.imgur.com/8Qj8nLd.png", 
    "https://i.imgur.com/1B9kZgH.png", 
    "https://i.imgur.com/9vG9T1c.png", 
    "https://i.imgur.com/8xJ9jVf.png",
];

// Funzione helper per mappare i dati di JSONPlaceholder al nostro modello ProductData
const mapToProductData = (data: any[]): ProductData[] => {
    return data.slice(0, 6).map((item, index) => ({
        id: item.id,
        // Usiamo il titolo dell'API come titolo
        title: item.title.length > 50 ? item.title.substring(0, 50) + '...' : item.title,
        // Dati mock per prezzo, valuta, ecc.
        price: 100 + item.id * 10, // Prezzo crescente
        currency: "EUR",
        conditionDetail: index % 2 === 0 ? "Professionale" : "Nuovo",
        shippingText: index % 3 === 0 ? "Spedizione gratuita" : `+ EUR 9,99 sped.`,
        imageUrl: MOCK_IMAGE_URLS[index] || MOCK_IMAGE_URLS[0], // Usiamo l'URL mock per l'immagine
    }));
};

/**
 * 1. GET: Ottiene i dati dello shop (prodotti).
 */
export const getProducts = async (): Promise<ProductData[]> => {
    try {
        const response = await fetch(JSON_PLACEHOLDER_URL);
        if (!response.ok) {
            throw new Error('Errore nel recupero dei prodotti');
        }
        const data = await response.json();
        return mapToProductData(data);
    } catch (error) {
        console.error("Errore GET products:", error);
        return [];
    }
};

/**
 * 2. POST: Aggiunge un prodotto al carrello (simula la creazione di un ordine).
 */
export const postNewOrder = async (productId: number, quantity: number): Promise<CartItem> => {
    console.log(`POST: Creazione nuovo ordine per Prodotto ID ${productId}, Quantità ${quantity}`);
    
    // In un mock server Postman, avresti qui:
    // const response = await fetch('MOCK_POSTMAN_ORDER_URL', { method: 'POST', body: JSON.stringify({ productId, quantity }) });
    
    // Simulazione:
    return new Promise(resolve => {
        setTimeout(() => {
            // Dati fittizi per l'elemento del carrello
            resolve({
                id: productId,
                orderId: Date.now(), // ID Ordine unico
                title: `Prodotto ${productId} (Ordine simulato)`,
                price: 120.00, 
                currency: "EUR",
                conditionDetail: "Simulato",
                shippingText: "Simulato",
                imageUrl: MOCK_IMAGE_URLS[productId % MOCK_IMAGE_URLS.length],
                quantity: quantity
            });
        }, 300);
    });
};

/**
 * 3. PUT: Modifica la quantità di un prodotto nel carrello.
 */
export const putUpdateQuantity = async (orderId: number, newQuantity: number): Promise<void> => {
    console.log(`PUT: Aggiornamento quantità Ordine ID ${orderId} a ${newQuantity}`);
    
    // Simulazione:
    return new Promise(resolve => {
        setTimeout(resolve, 300);
    });
};

/**
 * 4. DELETE: Elimina un ordine dal carrello.
 */
export const deleteOrder = async (orderId: number): Promise<void> => {
    console.log(`DELETE: Eliminazione Ordine ID ${orderId}`);
    
    // Simulazione:
    return new Promise(resolve => {
        setTimeout(resolve, 300);
    });
};

// Funzione specifica per il bottone "Paga" (reset)
export const deleteAllOrders = async (orderIds: number[]): Promise<void> => {
    console.log(`DELETE ALL: Eliminazione di tutti gli ordini:`, orderIds);
    // Qui invieresti una richiesta DELETE al server (o loop di DELETE)
    return new Promise(resolve => {
        setTimeout(resolve, 500);
    });
};