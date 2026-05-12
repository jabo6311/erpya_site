import {
  BarChart3, ShoppingCart, Users, Settings, Package, Shield, Wrench,
  Truck, Landmark,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useI18n } from '../lib/i18n'
import { PageHero, StatsBar, Section, SectionHeading, CtaBanner } from '../components/PageHero'
import CoverageTable from '../components/CoverageTable'
import { COVERAGE_DATA } from './coverage-data'

const FEATURES = [
  { Icon: BarChart3,     keyEs:'Gestión Financiera', keyEn:'Financial Management', descEs:'Control contable exacto para empresas de cualquier tamaño.', descEn:'Precise accounting control for any size company.' },
  { Icon: ShoppingCart,  keyEs:'Gestión de Compras', keyEn:'Purchasing',            descEs:'Condiciones con proveedores definidas una vez; ADempiere aplica todo automáticamente.', descEn:'Vendor terms set once; ADempiere applies them automatically.' },
  { Icon: BarChart3,     keyEs:'Gestión de Ventas',  keyEn:'Sales Management',      descEs:'Reglas por cliente para precios, costos y automatización contable.', descEn:'Customer rules for pricing, costs and accounting automation.' },
  { Icon: Users,         keyEs:'Capital Humano',     keyEn:'Human Capital',         descEs:'Empleados, asistencia, nómina y remuneraciones con total transparencia.', descEn:'Employees, attendance, payroll and compensation.' },
  { Icon: Settings,      keyEs:'Manufactura',        keyEn:'Manufacturing',         descEs:'Compras, finanzas y logística industrial integrados.', descEn:'Purchasing, finance and industrial logistics integrated.' },
  { Icon: Users,         keyEs:'CRM',                keyEn:'CRM',                   descEs:'Seguimiento de clientes y prospectos en todas las etapas.', descEn:'Track customers and prospects across all stages.' },
  { Icon: Package,       keyEs:'Distribución',       keyEn:'Distribution',          descEs:'Inventario multi-almacén, rutas y logística para minimizar errores.', descEn:'Multi-warehouse inventory, routes and logistics.' },
  { Icon: Shield,        keyEs:'Activos Fijos',      keyEn:'Fixed Assets',          descEs:'Mantenimiento correctivo y preventivo, depreciación.', descEn:'Corrective & preventive maintenance, depreciation.' },
  { Icon: Settings,      keyEs:'Servicios',          keyEn:'Services',              descEs:'Ciclo completo de ticket para servicios profesionales.', descEn:'Full ticket lifecycle for professional services.' },
  { Icon: Wrench,        keyEs:'Proyectos',          keyEn:'Projects',              descEs:'Tiempos, gastos, materiales y facturación en proyectos.', descEn:'Times, expenses, materials and billing for projects.' },
]

const INDUSTRIES = [
  { Icon: ShoppingCart, keyEs:'Retail y POS',             keyEn:'Retail & POS',             descEs:'POS integrado, promociones automáticas y control de precios.', descEn:'Integrated POS, automatic promotions and price control.' },
  { Icon: Package,      keyEs:'Supermercados',            keyEn:'Supermarkets',             descEs:'Control de lotes, mermas y caducidades con integración al piso de venta.', descEn:'Lot, shrinkage and expiry control with sales floor integration.' },
  { Icon: Truck,        keyEs:'Distribución y Logística', keyEn:'Distribution & Logistics', descEs:'Rutas comerciales, flota, despachos y recolección.', descEn:'Commercial routes, fleet, dispatches and collection.' },
  { Icon: Landmark,     keyEs:'No Alimentos',             keyEn:'Non-Food Retail',          descEs:'Inventario, compras multimoneda y promociones cruzadas.', descEn:'Inventory, multi-currency purchasing and cross-promotions.' },
]

export default function Adempiere() {
  const { lang, t } = useI18n()
  return (
    <div>
      <PageHero
        badge={t('adempiere', 'badge')}
        title={t('adempiere', 'headline')}
        titleAccent={t('adempiere', 'headlineAccent')}
        subtitle={t('adempiere', 'sub')}
        cta1={t('adempiere', 'cta1')}
        cta2={t('adempiere', 'cta2')}
      />
      <StatsBar stats={[
        { value: '+500', label: lang === 'en' ? 'Companies implemented' : 'Empresas implementadas' },
        { value: '+15',  label: lang === 'en' ? 'Years of experience' : 'Años de experiencia' },
        { value: '10+',  label: lang === 'en' ? 'Integrated modules' : 'Módulos integrados' },
        { value: '10+',  label: lang === 'en' ? 'Countries served' : 'Países atendidos' },
      ]} />

      <Section>
        <SectionHeading title={t('adempiere', 'features')} sub={t('adempiere', 'featuresSub')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-9 gap-y-0">
          {FEATURES.map((f, i) => {
            const { Icon } = f
            return (
              <motion.div
                key={f.keyEs}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (i % 5) * 0.04 }}
                className="flex gap-3 py-3.5 border-b border-border/60"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-[13.5px] font-semibold text-foreground mb-0.5">{lang === 'en' ? f.keyEn : f.keyEs}</div>
                  <div className="text-[12.5px] text-muted-foreground leading-relaxed">{lang === 'en' ? f.descEn : f.descEs}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Section>

      <Section alt>
        <SectionHeading title={t('adempiere', 'industries')} sub={t('adempiere', 'industriesSub')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {INDUSTRIES.map(ind => {
            const { Icon } = ind
            return (
              <div key={ind.keyEs} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2.5 hover:-translate-y-0.5 hover:shadow-lg transition-all">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <div className="text-sm font-bold text-foreground">{lang === 'en' ? ind.keyEn : ind.keyEs}</div>
                <div className="text-[12.5px] text-muted-foreground leading-relaxed">{lang === 'en' ? ind.descEn : ind.descEs}</div>
              </div>
            )
          })}
        </div>
      </Section>

      <Section>
        <CoverageTable data={COVERAGE_DATA.adempiere} />
      </Section>

      <CtaBanner
        title={t('adempiere', 'ctaFinal')}
        sub={t('adempiere', 'ctaFinalSub')}
        btnLabel={t('adempiere', 'ctaFinalBtn')}
      />
    </div>
  )
}
