// src/context/shopContext.tsx

import React, { createContext, useContext } from 'react';
import { useShop } from '../hooks/useShop';
import type { UseShopHook } from '../hooks/useShop';
const ShopContext = createContext<UseShopHook | undefined>(undefined);

interface ShopProviderProps {
    children: React.ReactNode;
}

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
    const shopHook = useShop();

    return (
        <ShopContext.Provider value={shopHook}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShopContext = (): UseShopHook => {
    const context = useContext(ShopContext);
    if (context === undefined) {
        throw new Error('useShopContext deve essere usato all\'interno di un ShopProvider');
    }
    return context;
};