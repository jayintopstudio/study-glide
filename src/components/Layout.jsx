import Navbar from './Navbar'
import Footer from './Footer'
import WhatsappWidget from './WhatsappWidget'

export default function Layout({ children, heroNav = false }) {
  return (
    <>
      {/* 
        heroNav: when true the Navbar sits inside the hero section (dark bg).
        Pages like Home, About, etc. pass heroNav and wrap their own hero section.
        The Navbar is always rendered here — individual pages control the hero wrapper.
      */}
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsappWidget />
    </>
  )
}
