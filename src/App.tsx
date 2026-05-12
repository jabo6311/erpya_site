import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { I18nProvider } from './lib/i18n'
import Layout from './components/Layout'
import Home from './pages/Home'
import Adempiere from './pages/Adempiere'
import Servicio from './pages/Servicio'
import Nube from './pages/Nube'
import Nosotros from './pages/Nosotros'

function App() {
  return (
    <I18nProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="adempiere" element={<Adempiere />} />
            <Route path="nube" element={<Nube />} />
            <Route path="nosotros" element={<Nosotros />} />
            {/* Catch-all for service detail pages */}
            <Route path=":serviceId" element={<Servicio />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  )
}

export default App
