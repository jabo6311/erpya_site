import { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  Sun, Moon, Menu, X, ChevronDown,
  BarChart3, Settings, Server, Layers, Cloud,
  PieChart, Globe, Workflow, Database,
  FileText, MessageSquare, Building2, Banknote,
  MapPin, Mail, Phone,
} from 'lucide-react'
import { useI18n } from '../lib/i18n'

type MenuItem = {
  to: string
  labelEs: string
  labelEn: string
  descEs: string
  descEn: string
  Icon: typeof BarChart3
}

type MenuSection = {
  section: string
  sectionEn: string
  badge?: string
  badgeEn?: string
  items: MenuItem[]
}

const SERVICIOS_MENU: MenuSection[] = [
  { section: 'ERPs', sectionEn: 'ERPs', items: [
    { to: '/adempiere',  labelEs: 'ADempiere', labelEn: 'ADempiere', descEs: 'ERP open-source de clase mundial', descEn: 'World-class open-source ERP', Icon: BarChart3 },
    { to: '/odoo',       labelEs: 'Odoo',      labelEn: 'Odoo',      descEs: 'Suite empresarial todo-en-uno',     descEn: 'All-in-one business suite',     Icon: Settings },
  ]},
  { section: 'Infraestructura', sectionEn: 'Infrastructure', items: [
    { to: '/docker',     labelEs: 'Docker',         labelEn: 'Docker',     descEs: 'Contenedores y despliegue ágil',      descEn: 'Containers and agile deployment',    Icon: Server },
    { to: '/kubernetes', labelEs: 'Kubernetes',     labelEn: 'Kubernetes', descEs: 'Orquestación y escalabilidad',         descEn: 'Orchestration and scalability',      Icon: Layers },
    { to: '/nube',       labelEs: 'Nube / Cloud',   labelEn: 'Cloud',      descEs: 'ERP en la nube, sin servidores propios', descEn: 'Cloud ERP, no own servers',         Icon: Cloud },
  ]},
  { section: 'Business Intelligence', sectionEn: 'Business Intelligence', items: [
    { to: '/power-bi',        labelEs: 'Power BI',         labelEn: 'Power BI',         descEs: 'Dashboards y reportes Microsoft',  descEn: 'Microsoft dashboards & reports',    Icon: PieChart },
    { to: '/apache-superset', labelEs: 'Apache Superset',  labelEn: 'Apache Superset',  descEs: 'BI open-source auto-hospedado',     descEn: 'Self-hosted open-source BI',        Icon: Globe },
  ]},
  { section: 'Integraciones', sectionEn: 'Integrations', items: [
    { to: '/n8n',     labelEs: 'N8N',     labelEn: 'N8N',     descEs: 'Automatización de flujos',  descEn: 'Workflow automation',      Icon: Workflow },
    { to: '/pentaho', labelEs: 'Pentaho', labelEn: 'Pentaho', descEs: 'ETL y analítica de datos',  descEn: 'ETL and data analytics',   Icon: Database },
  ]},
  { section: 'Novedades', sectionEn: "What's New", items: [
    { to: '/ai-docs',   labelEs: 'IA · Carga de Documentos',  labelEn: 'AI · Document Capture',  descEs: 'Facturas y órdenes con IA',          descEn: 'Invoices & POs with AI',         Icon: FileText },
    { to: '/ai-quotes', labelEs: 'IA · Análisis de Cotizaciones', labelEn: 'AI · Quote Analysis', descEs: 'Compara cotizaciones con IA',    descEn: 'Compare quotes with AI',         Icon: MessageSquare },
    { to: '/seniat',    labelEs: 'Captura SENIAT',            labelEn: 'SENIAT Capture',          descEs: 'Datos de socios desde el portal',     descEn: 'Partner data from the portal',   Icon: Building2 },
    { to: '/bcv',       labelEs: 'Tasas BCV',                 labelEn: 'BCV Rates',               descEs: 'Tasas bancarias diarias automáticas', descEn: 'Daily automatic bank rates',     Icon: Banknote },
  ]},
]

function GroupDropdown({ group, onClose }: { group: MenuSection; onClose: () => void }) {
  const { lang } = useI18n()
  const sectionLabel = lang === 'en' ? group.sectionEn : group.section
  return (
    <div className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-50 bg-card border border-border rounded-2xl shadow-xl w-max min-w-[340px] max-w-[420px]">
      <div className="px-5 pt-4 pb-2.5 border-b border-border">
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary">{sectionLabel}</p>
      </div>
      <div className="p-3 flex flex-col gap-0.5">
        {group.items.map(item => {
          const { Icon } = item
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className="flex items-center gap-3.5 px-3 py-3 rounded-xl hover:bg-muted transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon size={17} />
              </div>
              <div>
                <p className="text-[13.5px] font-semibold text-foreground leading-tight whitespace-nowrap">{lang === 'en' ? item.labelEn : item.labelEs}</p>
                <p className="text-[11.5px] text-muted-foreground mt-0.5 whitespace-nowrap">{lang === 'en' ? item.descEn : item.descEs}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function Layout() {
  const [isDark, setIsDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [overHero, setOverHero] = useState(false)
  const [heroScrolled, setHeroScrolled] = useState(false)
  const location = useLocation()
  const navRef = useRef<HTMLDivElement>(null)
  const { lang, setLang, t } = useI18n()

  const transparent = overHero
  const floatingOverHero = transparent && heroScrolled

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = saved ? saved === 'dark' : prefersDark
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setOpenSection(null)
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  useEffect(() => {
    const updateHeaderSurface = () => {
      const darkSurface = document.querySelector<HTMLElement>('[data-header-surface="dark"]')
      setOverHero(darkSurface ? darkSurface.getBoundingClientRect().bottom > 72 : false)
      setHeroScrolled(window.scrollY > 18)
    }

    updateHeaderSurface()
    window.addEventListener('scroll', updateHeaderSurface, { passive: true })
    window.addEventListener('resize', updateHeaderSurface)
    return () => {
      window.removeEventListener('scroll', updateHeaderSurface)
      window.removeEventListener('resize', updateHeaderSurface)
    }
  }, [location.pathname])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenSection(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const navText = transparent ? 'text-white/85 hover:text-white' : 'text-muted-foreground hover:text-foreground'
  const navActive = transparent ? 'text-white font-semibold' : 'text-primary font-semibold'

  // Etiquetas cortas para la barra de nav
  const navLabel = (group: MenuSection) => {
    if (group.section === 'Business Intelligence') return 'BI'
    return lang === 'en' ? group.sectionEn : group.section
  }

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col" style={{ transition: 'background-color 300ms ease' }}>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-3 ${
        floatingOverHero
          ? 'bg-[#071329]/78 backdrop-blur-md border-b border-white/[0.08] shadow-[0_14px_40px_rgba(2,6,23,0.22)]'
          : transparent
            ? ''
            : 'bg-background/95 backdrop-blur-md border-b border-border'
      }`}>
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src={transparent
                ? "https://erpya.com/wp-content/uploads/2017/11/ERP-logotipo-H-color.png"
                : "https://erpya.com/wp-content/uploads/2017/11/ERP-logotipo-H-color.png"}
              alt="ERPyA"
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav ref={navRef} className="hidden md:flex items-center gap-1 text-[13px] font-medium">
            {SERVICIOS_MENU.map(group => {
              const isOpen = openSection === group.section
              const isGroupActive = group.items.some(i => location.pathname === i.to)
              return (
                <div key={group.section} className="relative">
                  <button
                    onClick={() => setOpenSection(isOpen ? null : group.section)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                      isGroupActive || isOpen ? `font-bold ${navActive}` : navText
                    }`}
                  >
                    {navLabel(group)}
                    {group.badge && (
                      <span className="text-[8px] font-extrabold px-1 py-0.5 rounded bg-brand-cyan text-brand-navy leading-none ml-0.5">
                        {lang === 'en' ? group.badgeEn : group.badge}
                      </span>
                    )}
                    <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && <GroupDropdown group={group} onClose={() => setOpenSection(null)} />}
                </div>
              )
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className={`px-2.5 py-1 rounded-md border text-[11.5px] font-bold tracking-wider transition-colors ${
                transparent ? 'border-white/25 text-white/85 hover:bg-white/10' : 'border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${transparent ? 'text-white/85 hover:bg-white/10' : 'text-muted-foreground hover:bg-muted'}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${transparent ? 'text-white/85 hover:bg-white/10' : 'text-muted-foreground hover:bg-muted'}`}
              aria-label="Abrir menú"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 pb-4 border-t border-border pt-4 flex flex-col gap-2 text-sm font-medium text-muted-foreground bg-background">
            {SERVICIOS_MENU.map(group => (
              <div key={group.section}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-1">{lang === 'en' ? group.sectionEn : group.section}</p>
                {group.items.map(item => (
                  <Link key={item.to} to={item.to} className="block px-4 py-1.5 hover:text-foreground transition-colors">
                    {lang === 'en' ? item.labelEn : item.labelEs}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

function Footer() {
  const { t, lang } = useI18n()
  const offices = [
    { city: 'Araure', detail: 'Edo. Portuguesa' },
    { city: 'Bello Monte', detail: 'Caracas' },
  ]
  const phones = [
    { label: '+58 (255) 665 94 70', href: 'tel:+582556659470' },
    { label: '+58 412-2223824', href: 'tel:+584122223824' },
    { label: '+58 412-1741773', href: 'tel:+584121741773' },
  ]

  return (
    <footer id="contacto" className="mt-auto border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary mb-2">ERPyA</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
              {lang === 'en' ? 'Business technology with local support.' : 'Tecnología empresarial con soporte local.'}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t('footer', 'desc')}</p>
          </div>
          <div className="flex gap-2 lg:justify-end">
            <a href="https://www.instagram.com/erpcya" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
               className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://x.com/erpcya" target="_blank" rel="noopener noreferrer" aria-label="X"
               className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://github.com/erpcya" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
               className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mb-10 rounded-lg border border-border bg-background/70 p-5 shadow-sm">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <MapPin size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  {lang === 'en' ? 'Offices' : 'Sedes'}
                </p>
                <div className="mt-1 grid gap-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                  {offices.map(office => (
                    <p key={office.city} className="text-sm text-foreground">
                      <span className="font-semibold">{office.city}</span>
                      <span className="text-muted-foreground">, {office.detail}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Mail size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Email</p>
                <a href="mailto:info@erpya.com" className="mt-1 block truncate text-sm font-semibold text-primary hover:underline">
                  info@erpya.com
                </a>
                <p className="mt-1 text-xs text-muted-foreground">
                  {lang === 'en' ? 'Commercial and support inquiries' : 'Consultas comerciales y soporte'}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Phone size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  {lang === 'en' ? 'Phones' : 'Teléfonos'}
                </p>
                <div className="mt-1 grid gap-x-4 gap-y-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                  {phones.map(phone => (
                    <a key={phone.href} href={phone.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {phone.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:grid gap-6" style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}>
          {SERVICIOS_MENU.map(group => (
            <div key={group.section}>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary mb-3">
                {group.section === 'Business Intelligence' ? 'BI' : group.section}
              </p>
              <div className="flex flex-col gap-2">
                {group.items.map(item => (
                  <Link key={item.to} to={item.to}
                    className="text-[12px] text-muted-foreground hover:text-foreground transition-colors leading-snug">
                    {lang === 'en' ? item.labelEn : item.labelEs}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-5 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-muted-foreground/60">
          <p>{t('footer', 'rights')}</p>
          <span className="hidden sm:inline">{t('footer', 'tagline')}</span>
        </div>

      </div>
    </footer>
  )
}

export { SERVICIOS_MENU, type MenuItem }
