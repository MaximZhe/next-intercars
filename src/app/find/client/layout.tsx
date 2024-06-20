

import { PricePromoContext } from "@/contex"
import { ModalContext, ModalContextBustiket, ModalContextError, ModalContextFormError } from "@/contex/modal"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Intercars - покупка билета',
    description: 'Intercars - покупка билета',
    keywords:'Intercars - покупка билета'
  }
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
                            <ModalContextFormError>
                                {children}  
                            </ModalContextFormError>    
                        </ModalContextError>
                    </ModalContextBustiket>
                </ModalContext>  
            </PricePromoContext>

        </>

    )

}