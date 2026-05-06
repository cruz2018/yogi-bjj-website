import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import BarnUngdomar from './pages/BarnUngdomar'
import Schema from './pages/Schema'
import Priser from './pages/Priser'
import Intresseanmalan from './pages/Intresseanmalan'
import Galleri from './pages/Galleri'
import Evenemang from './pages/Evenemang'
import HittaTillOss from './pages/HittaTillOss'
import Kontakt from './pages/Kontakt'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/barn-ungdomar" element={<BarnUngdomar />} />
          <Route path="/schema" element={<Schema />} />
          <Route path="/priser" element={<Priser />} />
          <Route path="/intresseanmalan" element={<Intresseanmalan />} />
          <Route path="/galleri" element={<Galleri />} />
          <Route path="/evenemang" element={<Evenemang />} />
          <Route path="/hitta-till-oss" element={<HittaTillOss />} />
          <Route path="/kontakt" element={<Kontakt />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
      <WhatsAppFloat />
    </BrowserRouter>
  )
}
