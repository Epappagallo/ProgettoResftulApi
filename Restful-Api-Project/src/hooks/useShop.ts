import { useState, useEffect, useCallback, useMemo } from "react";

const MOCK_API_URL =
  "https://34dcf2d6-239d-472f-a28d-8eb92dd3a99d.mock.pstmn.io";
const HEADERS = { "Content-Type": "application/json" };

export interface ProductData {
  id: number;
  title: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  currency: string;
  conditionDetail: string;
  shippingText: string;
  imageUrl: string;
}

export interface CartItem {
  orderId: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface UseShopHook {
  products: ProductData[];
  cart: CartItem[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => void;
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

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = `${MOCK_API_URL}/api/items`;
      console.log(`[API REQUEST] GET: ${url}`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`[API ERROR] GET: ${url} - Status: ${response.status}`);
        throw new Error(`Errore fetch: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`[API RESPONSE] GET: Prodotti ricevuti:`, data);
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Impossibile caricare i prodotti.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const removeItemFromCart = useCallback(async (orderId: number) => {
    setIsLoading(true);
    try {
      const url = `${MOCK_API_URL}/api/cart/${orderId}`;
      console.log(`[API REQUEST] DELETE: ${url}`);

      const response = await fetch(url, {
        method: "DELETE",
      });
      if (!response.ok && response.status !== 204) {
        console.error(`[API ERROR] DELETE: ${url} - Status: ${response.status}`);
        throw new Error("Rimozione non riuscita");
      }
      
      console.log(`[API SUCCESS] DELETE: Articolo ${orderId} rimosso.`);
      setCart((prevCart) =>
        prevCart.filter((item) => item.orderId !== orderId)
      );
      setError(null);
    } catch (err: any) {
      setError("Errore nella rimozione dal carrello.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCartItemQuantity = useCallback(
    async (orderId: number, newQuantity: number) => {
      if (newQuantity <= 0) return removeItemFromCart(orderId);

      setIsLoading(true);
      try {
        const url = `${MOCK_API_URL}/api/cart/${orderId}`;
        const body = JSON.stringify({ quantity: newQuantity });
        console.log(`[API REQUEST] PUT: ${url} - Body:`, body);

        const response = await fetch(url, {
          method: "PUT",
          headers: HEADERS,
          body: body,
        });

        if (!response.ok && response.status !== 204) {
          console.error(`[API ERROR] PUT: ${url} - Status: ${response.status}`);
          throw new Error(`PUT non riuscita: ${response.status}`);
        }
        
        console.log(`[API SUCCESS] PUT: Quantità di ${orderId} aggiornata a ${newQuantity}.`);
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.orderId === orderId ? { ...item, quantity: newQuantity } : item
          )
        );
        setError(null);
      } catch (err: any) {
        setError("Errore nell'aggiornamento della quantità.");
      } finally {
        setIsLoading(false);
      }
    },
    [removeItemFromCart]
  );

  const addItemToCart = useCallback(
    async (productId: number) => {
      setIsLoading(true);
      try {
        const existingItem = cart.find((item) => item.productId === productId);
        const product = products.find((p) => p.id === productId);
        if (!product) {
          setError("Prodotto non trovato.");
          return;
        }

        if (existingItem) {
          updateCartItemQuantity(
            existingItem.orderId,
            existingItem.quantity + 1
          );
        } else {
          const url = `${MOCK_API_URL}/api/cart/add`;
          const body = JSON.stringify({ productId, quantity: 1 });
          console.log(`[API REQUEST] POST: ${url} - Body:`, body);

          const response = await fetch(url, {
            method: "POST",
            headers: HEADERS,
            body: body,
          });

          if (!response.ok) {
            console.error(`[API ERROR] POST: ${url} - Status: ${response.status}`);
            throw new Error(`POST non riuscita: ${response.status}`);
          }

          const responseData = await response.json();
          console.log(`[API RESPONSE] POST: Articolo aggiunto:`, responseData);

          // Soluzione per ID statici del mock: usa un ID univoco lato client
          const uniqueClientSideId = Date.now() + Math.random();

          const newCartItem: CartItem = {
            orderId: uniqueClientSideId, 
            productId: productId,
            name: product.name,
            price: product.price,
            quantity: 1,
          };
          setCart((prevCart) => [...prevCart, newCartItem]);
        }
        setError(null);
      } catch (err: any) {
        setError(
          "Errore nell'aggiunta al carrello: " +
            (err.message || "Verifica il Mock Server POST/PUT.")
        );
      } finally {
        setIsLoading(false);
      }
    },
    [cart, products, updateCartItemQuantity]
  );

  const checkout = useCallback(async () => {
    if (cart.length === 0) return;
    setIsLoading(true);
    setError(null);
    try {
      console.log(`[API REQUEST] CHECKOUT: Avvio eliminazione ${cart.length} articoli.`);
      await Promise.all(
        cart.map((item) => {
            const url = `${MOCK_API_URL}/api/cart/${item.orderId}`;
            console.log(`[API REQUEST] DELETE (Checkout): ${url}`);
            return fetch(url, {
                method: "DELETE",
            });
        })
      );
      setCart([]);
      console.log(`[API SUCCESS] CHECKOUT: Transazione completata.`);
      alert("Pagamento simulato avvenuto con successo!");
    } catch (err: any) {
      setError("Errore durante il checkout.");
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  return {
    products,
    cart,
    isLoading,
    error,
    fetchProducts,
    addItemToCart,
    updateCartItemQuantity,
    removeItemFromCart,
    checkout,
    totalPrice,
  };
};