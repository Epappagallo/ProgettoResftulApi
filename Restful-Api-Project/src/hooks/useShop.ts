// src/hooks/useShop.ts (NUOVO FILE)
import type { CartItem } from '../services/shopService';
import { useState, useEffect, useCallback } from 'react';
import { getProducts, postNewOrder, putUpdateQuantity, deleteOrder, deleteAllOrders } from '../services/shopService';
import type { ProductData } from '../components/cards/productCard';

export interface UseShopHook {
    products: ProductData[];
    cart: CartItem[];
    isLoading: boolean;
    error: string | null;
    addItemToCart: (productId: number) => void;
    updateCartItemQuantity: (orderId: number, newQuantity: number) => void;
    removeItemFromCart: (orderId: number) => void;
    checkout: () => void;
    totalPrice: number;
}

export const useShop = (): UseShopHook => {
    const [products, setProducts] = useState<ProductData[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 1. READ: Ottieni i prodotti all'avvio
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
                setError(null);
            } catch (err: any) {
                setError(err.message || "Impossibile caricare i prodotti.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // 2. POST: Aggiungi al carrello
    const addItemToCart = useCallback(async (productId: number) => {
        setIsLoading(true);
        try {
            // Controlla se il prodotto è già nel carrello
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                // Se esiste, usa PUT per incrementare la quantità
                await putUpdateQuantity(existingItem.orderId, existingItem.quantity + 1);
                setCart(prevCart => prevCart.map(item => 
                    item.orderId === existingItem.orderId 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                ));
            } else {
                // Se non esiste, usa POST per creare un nuovo ordine
                const newCartItem = await postNewOrder(productId, 1);
                setCart(prevCart => [...prevCart, newCartItem]);
            }
            setError(null);
        } catch (err: any) {
            setError("Errore nell'aggiunta al carrello.");
        } finally {
            setIsLoading(false);
        }
    }, [cart]);

    // 3. PUT: Modifica quantità
    const updateCartItemQuantity = useCallback(async (orderId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeItemFromCart(orderId);
            return;
        }

        setIsLoading(true);
        try {
            await putUpdateQuantity(orderId, newQuantity);
            setCart(prevCart => prevCart.map(item => 
                item.orderId === orderId ? { ...item, quantity: newQuantity } : item
            ));
            setError(null);
        } catch (err: any) {
            setError("Errore nell'aggiornamento del carrello.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 4. DELETE: Rimuovi ordine singolo
    const removeItemFromCart = useCallback(async (orderId: number) => {
        setIsLoading(true);
        try {
            await deleteOrder(orderId);
            setCart(prevCart => prevCart.filter(item => item.orderId !== orderId));
            setError(null);
        } catch (err: any) {
            setError("Errore nella rimozione dal carrello.");
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    // Logica "Paga" (DELETE di tutti gli ordini)
    const checkout = useCallback(async () => {
        if (cart.length === 0) return;
        
        setIsLoading(true);
        try {
            const orderIds = cart.map(item => item.orderId);
            await deleteAllOrders(orderIds); 
            setCart([]); // Svuota il carrello dopo il "pagamento"
            setError(null);
            alert("Pagamento simulato completato! Ordini resettati.");
        } catch (err: any) {
            setError("Errore durante il checkout.");
        } finally {
            setIsLoading(false);
        }
    }, [cart]);
    
    // Calcolo del prezzo totale
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return {
        products,
        cart,
        isLoading,
        error,
        addItemToCart,
        updateCartItemQuantity,
        removeItemFromCart,
        checkout,
        totalPrice,
    };
};