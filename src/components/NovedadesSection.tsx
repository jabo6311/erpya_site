import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, MessageSquare, Building2, Banknote } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { Section } from './PageHero'

type NovedadItem = {
  to: string
  tagEs: string
  tagEn: string
  titleEs: string
  titleEn: string
  descEs: string
  descEn: string
  Icon: typeof FileText
}

const ITEMS: NovedadItem[] = [
  { to: '/ai-docs',   tagEs: 'IA',    tagEn: 'AI',
    titleEs: 'Carga de documentos con IA', titleEn: 'AI document capture',
    descEs: 'Facturas y órdenes de compra leídas automáticamente y cargadas a su ERP.',
    descEn: 'Invoices and purchase orders read automatically and loaded into your ERP.',
    Icon: FileText },
  { to: '/ai-quotes', tagEs: 'IA',    tagEn: 'AI',
    titleEs: 'Análisis de cotizaciones',   titleEn: 'Quote analysis',
    descEs: 'Compare cotizaciones de proveedores con IA y elija la mejor opción.',
    descEn: 'Compare vendor quotes with AI and pick the best option.',
    Icon: MessageSquare },
  { to: '/seniat',    tagEs: 'Local', tagEn: 'Local',
    titleEs: 'Captura SENIAT',             titleEn: 'SENIAT capture',
    descEs: 'Datos de socios de negocio cargados desde el portal del SENIAT con solo el RIF.',
    descEn: 'Business partner data loaded from the SENIAT portal with just the RIF.',
    Icon: Building2 },
  { to: '/bcv',       tagEs: 'Local', tagEn: 'Local',
    titleEs: 'Tasas BCV automáticas',      titleEn: 'Automatic BCV rates',
    descEs: 'Tasas bancarias diarias cargadas cada mañana desde el portal del BCV.',
    descEn: 'Daily bank rates loaded every morning from the BCV portal.',
    Icon: Banknote },
]

export default function NovedadesSection() {
  const { lang, t } = useI18n()
  return (
    <Section>
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-cyan/20 text-brand-navy dark:text-brand-cyan text-[11px] font-bold uppercase tracking-wider mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
          {t('home', 'novedadesEyebrow')}
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">{t('home', 'novedadesTitle')}</h2>
        <p className="text-[15px] text-muted-foreground mt-1.5 max-w-xl">{t('home', 'novedadesSub')}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ITEMS.map((it, i) => {
          const { Icon } = it
          return (
            <motion.div
              key={it.to}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                to={it.to}
                className="relative block bg-card border border-border rounded-xl p-4 hover:border-brand-cyan hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(13,33,103,0.10)] transition-all overflow-hidden h-full"
              >
                <div className="absolute top-3.5 right-3.5 text-[9.5px] font-extrabold px-1.5 py-[3px] rounded bg-brand-cyan text-brand-navy tracking-wider">
                  {lang === 'en' ? it.tagEn : it.tagEs}
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-navy to-brand-navy-light text-brand-cyan flex items-center justify-center mb-3">
                  <Icon size={20} />
                </div>
                <h3 className="text-[15px] font-bold text-foreground leading-tight mb-2">{lang === 'en' ? it.titleEn : it.titleEs}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{lang === 'en' ? it.descEn : it.descEs}</p>
                <div className="text-xs font-semibold text-primary mt-3">{t('home', 'learnMore')} →</div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
