// src/context/ShopContext.tsx 

import React, { createContext, useContext } from 'react';
import { useShop } from '../hooks/useShop'; 
// Importiamo l'interfaccia. Assicurati che useShop esporti l'interfaccia UseShopHook
import type { UseShopHook } from '../hooks/useShop'; 

// Definiamo il tipo di contesto
const ShopContext = createContext<UseShopHook | undefined>(undefined);

// --- Componente Provider ---
export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Chiama l'hook useShop per ottenere lo stato e le funzioni
    const shop = useShop(); 
    
    return (
        <ShopContext.Provider value={shop}>
            {children}
        </ShopContext.Provider>
    );
};

// --- Custom Hook per Consumare il Context ---
export const useShopContext = () => {
    const context = useContext(ShopContext);
    if (context === undefined) {
        // Questo errore si verifica se tenti di usare il contesto fuori dal Provider
        throw new Error('useShopContext deve essere usato all\'interno di un ShopProvider');
    }
    return context;
};