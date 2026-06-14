'use client'

import Navbar from './Navbar'
import Footer from './Footer'
import WhatsappWidget from './WhatsappWidget'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsappWidget />
    </>
  )
}
