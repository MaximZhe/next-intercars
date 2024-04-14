

import { PricePromoContext } from "@/contex"

export default function BookingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <PricePromoContext>
                {children}
            </PricePromoContext>

        </>

    )

}