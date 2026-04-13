import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/funcionalidades', label: 'Funcionalidades' },
  { to: '/soluciones', label: 'Soluciones' },
  { to: '/nube', label: 'Nube' },
  { to: '/nosotros', label: 'Nosotros' },
]

export default function Layout() {
  const [isDark, setIsDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = saved ? saved === 'dark' : prefersDark
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden font-sans transition-colors duration-300 flex flex-col">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 dark:bg-primary/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[40%] rounded-full bg-cyan-500/10 dark:bg-cyan-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="fixed top-0 w-full glass z-50 transition-all px-6 py-4 border-b border-border">
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src="https://erpya.com/wp-content/uploads/2017/11/ERP-logotipo-H-color.png" alt="ERPyA Logo" className="h-10 w-auto dark:drop-shadow-sm" />
            </Link>

            {/* Nav escritorio */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} className={`hover:text-foreground transition-colors ${location.pathname === link.to ? 'text-primary font-bold' : ''}`}>
                  {link.label}
                </Link>
              ))}
              <a href="#contacto" className="hover:text-foreground transition-colors">Contacto</a>
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Botón hamburguesa — solo móvil */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground transition-colors"
                aria-label="Abrir menú"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Menú móvil desplegable */}
          {menuOpen && (
            <div className="md:hidden mt-3 pb-4 border-t border-border pt-4 flex flex-col gap-4 text-sm font-medium text-muted-foreground">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} className={`px-2 hover:text-foreground transition-colors ${location.pathname === link.to ? 'text-primary font-bold' : ''}`}>
                  {link.label}
                </Link>
              ))}
              <a href="#contacto" onClick={() => setMenuOpen(false)} className="px-2 hover:text-foreground transition-colors">Contacto</a>
            </div>
          )}
        </header>

        <main className="flex-1 w-full relative z-0">
          <Outlet />
        </main>

        <footer id="contacto" className="py-16 bg-card border-t border-border mt-auto relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row border-b border-border pb-12 gap-12 justify-between">
            <div className="max-w-sm">
              <p className="text-muted-foreground mb-6">En la nube o en su empresa. Un ERP de clase mundial escalable para los negocios de hoy.</p>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📍 C.C Buenaventura, Oficina M-6, Araure, Edo. Portuguesa. Venezuela.</p>
                <p>📍 Final Av. Casanova Torre Limina Piso 6, Bello Monte. Caracas.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              <div className="flex flex-col gap-3">
                <h4 className="text-foreground font-semibold mb-2">Principales</h4>
                <Link to="/funcionalidades" className="text-sm text-muted-foreground hover:text-foreground">Funcionalidades</Link>
                <Link to="/soluciones" className="text-sm text-muted-foreground hover:text-foreground">Soluciones</Link>
                <Link to="/nosotros" className="text-sm text-muted-foreground hover:text-foreground">Nosotros</Link>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-foreground font-semibold mb-2">Populares</h4>
                <Link to="/gestion-financiera" className="text-sm text-muted-foreground hover:text-foreground">Finanzas</Link>
                <Link to="/gestion-de-compras" className="text-sm text-muted-foreground hover:text-foreground">Compras</Link>
                <Link to="/retail" className="text-sm text-muted-foreground hover:text-foreground">Retail</Link>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-foreground font-semibold mb-2">Servicios</h4>
                <Link to="/consultoria-de-procesos" className="text-sm text-muted-foreground hover:text-foreground">Consultoría</Link>
                <Link to="/soporte-y-mantenimiento" className="text-sm text-muted-foreground hover:text-foreground">Soporte</Link>
                <Link to="/nube" className="text-sm text-muted-foreground hover:text-foreground">Nube</Link>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-foreground font-semibold mb-2">Contacto</h4>
                <a href="mailto:info@erpya.com" className="text-sm text-primary hover:text-primary/80 font-medium">info@erpya.com</a>
                <a href="tel:+582556659470" className="text-sm text-muted-foreground hover:text-foreground">+58 (255) 665 94 70</a>
                <span className="text-sm text-muted-foreground">+58 412-2223824</span>
                <div className="flex items-center gap-4 mt-2">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 pt-8 flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2026 ERPyA. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <span className="select-none text-muted-foreground/60 hidden sm:inline">ADempiere ERP en la nube</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
