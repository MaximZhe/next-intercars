'use client'

import { createContext, useContext, useState } from "react";

const PricePromoProvaider = createContext<any>(undefined);



export function PricePromoContext({
    children,
}: {
    children: React.ReactNode
}) {
    const [pricePromo, setPricePromo] = useState('');
    return (
        <PricePromoProvaider.Provider value={{ pricePromo, setPricePromo }}>
            {children}
        </PricePromoProvaider.Provider>
    )
}
export function usePriceContext() {
    return useContext(PricePromoProvaider);
}
