/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Новости Intercars',
  description: 'Следить за новостями на нашем сайте стало проще, всю актуальнуя информацию  увидеть на нашем сайте Intercars',
  keywords:'новости, Intercars'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    {children}
    </>
    
  )
}