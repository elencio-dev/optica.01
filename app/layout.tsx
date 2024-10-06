import '../styles/globals.css'
import React from 'react'
import Header from '@/components/Navbar'
import Footer from '@/components/Footer'
import { roboto } from '@/styles/fonts/roboto'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`antialiased ${roboto.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
