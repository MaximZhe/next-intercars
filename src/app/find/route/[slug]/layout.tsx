


import { ModalContextSearchId } from "@/contex/modal"

export default function RatesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <ModalContextSearchId>
                {children}
            </ModalContextSearchId>
        </>

    )

}