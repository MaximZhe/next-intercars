

import { PricePromoContext } from "@/contex"
import { ModalContext } from "@/contex/modal"

export default function BookingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <PricePromoContext>
                <ModalContext>
                   {children} 
                </ModalContext>  
            </PricePromoContext>

        </>

    )

}