

import { PricePromoContext } from "@/contex"
import { ModalContext, ModalContextBustiket, ModalContextError } from "@/contex/modal"

export default function BookingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <PricePromoContext>
                <ModalContext>
                    <ModalContextBustiket>
                        <ModalContextError>
                           {children}  
                        </ModalContextError>
                    </ModalContextBustiket>
                </ModalContext>  
            </PricePromoContext>

        </>

    )

}