import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Destination from './pages/Destination'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import Applicants from './pages/Applicants'

// Country sub-pages
import UK from './pages/countries/UK'
import USA from './pages/countries/USA'
import Canada from './pages/countries/Canada'
import Ireland from './pages/countries/Ireland'
import Australia from './pages/countries/Australia'
import NewZealand from './pages/countries/NewZealand'
import Dubai from './pages/countries/Dubai'
import Europe from './pages/countries/Europe'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/applicants" element={<Applicants />} />

        {/* Country sub-pages */}
        <Route path="/destination/uk" element={<UK />} />
        <Route path="/destination/usa" element={<USA />} />
        <Route path="/destination/canada" element={<Canada />} />
        <Route path="/destination/ireland" element={<Ireland />} />
        <Route path="/destination/australia" element={<Australia />} />
        <Route path="/destination/new-zealand" element={<NewZealand />} />
        <Route path="/destination/dubai" element={<Dubai />} />
        <Route path="/destination/europe" element={<Europe />} />
      </Routes>
    </BrowserRouter>
  )
}