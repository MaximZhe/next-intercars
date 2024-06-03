'use client'

import { createContext, useContext, useState } from "react";

const ModalClientProvaider = createContext<any>(undefined);
const ModalBustiketProvaider = createContext<any>(undefined);
const ModalErrorProvaider = createContext<any>(undefined);

export function ModalContext({
    children,
}: {
    children: React.ReactNode
}) {
    const [isModal, setIsModal] = useState(false);
    const [isOpenModalPlace, setIsOpenModalPlace] = useState(false);
    const [isModalError, setIsModalError] = useState(false);
    return (
        <ModalClientProvaider.Provider value={{ isModal, setIsModal }}>
            <ModalBustiketProvaider.Provider value={{ isOpenModalPlace, setIsOpenModalPlace }}>
                <ModalErrorProvaider.Provider value={{ isModalError, setIsModalError}}>
                    {children}
                </ModalErrorProvaider.Provider>
            </ModalBustiketProvaider.Provider>
        </ModalClientProvaider.Provider>
    )
}
export function useModalContext() {
    return useContext(ModalClientProvaider);
}
export function useModalPlaceContext() {
    return useContext(ModalBustiketProvaider);
} 
export function useModalErrorContext() {
    return useContext(ModalErrorProvaider);
}   