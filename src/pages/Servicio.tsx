import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { PageHero, Section, CtaBanner } from '../components/PageHero'
import CoverageTable from '../components/CoverageTable'
import { COVERAGE_DATA } from './coverage-data'

type ServicioData = {
  badgeKey: 'erps' | 'infra' | 'bi' | 'integrations' | 'ai' | 'local'
  headline: { es: string; en: string }
  desc: { es: string; en: string }
  features: { es: string[]; en: string[] }
}

const SERVICIOS: Record<string, ServicioData> = {
  odoo: {
    badgeKey: 'erps',
    headline: { es: 'Suite empresarial todo-en-uno. Modular, moderno y escalable.', en: 'All-in-one business suite. Modular, modern and scalable.' },
    desc: { es: 'Odoo es la suite de gestión empresarial de más rápido crecimiento. ERPyA le acompaña desde la implementación hasta el soporte continuo.', en: "Odoo is the world's fastest-growing business suite. ERPyA guides you from implementation to ongoing support." },
    features: { es: ['CRM y Ventas', 'Facturación', 'Inventario', 'Manufactura', 'Recursos Humanos', 'Sitio Web y E-Commerce', 'Marketing', 'Helpdesk'], en: ['CRM & Sales', 'Invoicing', 'Inventory', 'Manufacturing', 'Human Resources', 'Website & E-Commerce', 'Marketing', 'Helpdesk'] },
  },
  docker: {
    badgeKey: 'infra',
    headline: { es: 'Contenedores para despliegues ágiles, reproducibles y seguros.', en: 'Containers for agile, reproducible and secure deployments.' },
    desc: { es: 'ERPyA diseña y administra entornos Docker garantizando ambientes consistentes desde desarrollo hasta producción.', en: 'ERPyA designs and manages Docker environments ensuring consistent environments from development to production.' },
    features: { es: ['Dockerización de ERPs', 'Docker Compose multi-servicio', 'Ambientes dev/staging/prod', 'Imágenes optimizadas', 'CI/CD pipelines', 'Monitoreo'], en: ['ERP dockerization', 'Multi-service Docker Compose', 'Dev/staging/prod environments', 'Optimized images', 'CI/CD pipelines', 'Monitoring'] },
  },
  kubernetes: {
    badgeKey: 'infra',
    headline: { es: 'Orquestación empresarial para alta disponibilidad.', en: 'Enterprise orchestration for high availability.' },
    desc: { es: 'ERPyA despliega y opera clústeres Kubernetes que garantizan escalabilidad automática y resiliencia.', en: 'ERPyA deploys and operates Kubernetes clusters guaranteeing automatic scalability and resilience.' },
    features: { es: ['Clústeres administrados', 'Auto-scaling', 'Alta disponibilidad', 'Despliegue continuo', 'Gestión de secretos', 'Monitoreo y alertas'], en: ['Managed clusters', 'Auto-scaling', 'High availability', 'Continuous deployment', 'Secrets management', 'Monitoring & alerts'] },
  },
  'power-bi': {
    badgeKey: 'bi',
    headline: { es: 'Dashboards y reportes con el poder de Microsoft.', en: 'Dashboards and reports with the power of Microsoft.' },
    desc: { es: 'Power BI conecta sus datos de ADempiere, Odoo y otras fuentes para producir reportes visuales y dashboards ejecutivos en tiempo real.', en: 'Power BI connects your ADempiere, Odoo and other source data to produce visual reports and real-time executive dashboards.' },
    features: { es: ['Dashboards ejecutivos', 'Reportes financieros', 'Análisis de ventas', 'KPIs en tiempo real', 'Integración con ERP', 'Seguridad por rol', 'Reportes programados', 'Exportación PDF/Excel'], en: ['Executive dashboards', 'Financial reports', 'Sales analysis', 'Real-time KPIs', 'ERP integration', 'Role-based security', 'Scheduled reports', 'PDF/Excel export'] },
  },
  'apache-superset': {
    badgeKey: 'bi',
    headline: { es: 'Business Intelligence open-source, potente y auto-hospedado.', en: 'Powerful, self-hosted open-source Business Intelligence.' },
    desc: { es: 'Apache Superset es la plataforma de visualización de datos open-source de mayor crecimiento. ERPyA lo despliega sin costos de licencia.', en: 'Apache Superset is the fastest-growing open-source data visualization platform. ERPyA deploys it with no license costs.' },
    features: { es: ['Dashboards interactivos', 'Explorador de datos visual', 'Conexión directa a PostgreSQL', 'Seguridad y roles', 'Sin costo de licencia', 'Auto-hospedado', 'Integración con ERPs', 'Alertas y notificaciones'], en: ['Interactive dashboards', 'Visual data explorer', 'Direct PostgreSQL connection', 'Security & roles', 'No license cost', 'Self-hosted', 'ERP integration', 'Alerts & notifications'] },
  },
  n8n: {
    badgeKey: 'integrations',
    headline: { es: 'Automatización de flujos de trabajo sin límites.', en: 'Unlimited workflow automation.' },
    desc: { es: 'N8N conecta sus sistemas ERP con cualquier API, base de datos o servicio externo. ERPyA diseña flujos de integración a medida.', en: 'N8N connects your ERP systems to any API, database or external service. ERPyA designs custom integration flows.' },
    features: { es: ['Integración ERP ↔ CRM', 'Sincronización de datos', 'Notificaciones automáticas', 'Procesamiento de documentos', 'Webhooks y APIs', 'Flujos programados'], en: ['ERP ↔ CRM integration', 'Data synchronization', 'Automatic notifications', 'Document processing', 'Webhooks & APIs', 'Scheduled flows'] },
  },
  pentaho: {
    badgeKey: 'integrations',
    headline: { es: 'Business Intelligence y ETL para decisiones basadas en datos.', en: 'Business Intelligence and ETL for data-driven decisions.' },
    desc: { es: 'Pentaho es la plataforma líder para integración de datos y analítica empresarial conectada a su ERP.', en: 'Pentaho is the leading platform for data integration and business analytics connected to your ERP.' },
    features: { es: ['ETL y transformación de datos', 'Dashboards ejecutivos', 'Reportes programados', 'Integración multi-fuente', 'Data Warehouse', 'KPIs en tiempo real'], en: ['ETL & data transformation', 'Executive dashboards', 'Scheduled reports', 'Multi-source integration', 'Data Warehouse', 'Real-time KPIs'] },
  },
  'ai-docs': {
    badgeKey: 'ai',
    headline: { es: 'Carga de documentos con IA: facturas y órdenes de compra automáticas.', en: 'AI document capture: automatic invoices and purchase orders.' },
    desc: { es: 'Nuestra integración de IA lee facturas, órdenes de compra y documentos digitalizados, extrae los datos relevantes y los carga directamente a su ERP — sin tipeo manual, sin errores.', en: 'Our AI integration reads invoices, purchase orders and scanned documents, extracts relevant data and loads it directly into your ERP — no manual typing, no errors.' },
    features: { es: ['OCR + IA generativa', 'Extracción de líneas de factura', 'Detección de proveedor automática', 'Validación contra socio de negocio', 'Carga directa al ERP', 'Auditoría', 'PDF/JPG/PNG', 'Aprendizaje continuo'], en: ['OCR + generative AI', 'Invoice line extraction', 'Automatic vendor detection', 'Business partner validation', 'Direct ERP loading', 'Auditing', 'PDF/JPG/PNG', 'Continuous learning'] },
  },
  'ai-quotes': {
    badgeKey: 'ai',
    headline: { es: 'Análisis de cotizaciones de proveedores con IA.', en: 'AI-powered vendor quote analysis.' },
    desc: { es: 'Compare cotizaciones de múltiples proveedores en segundos. La IA analiza precios, plazos y condiciones, y le sugiere la mejor opción según sus reglas de negocio.', en: 'Compare quotes from multiple vendors in seconds. AI analyzes prices, lead times and terms, and recommends the best option based on your business rules.' },
    features: { es: ['Carga de cotizaciones masiva', 'Comparación lado a lado', 'Análisis precio + plazo', 'Recomendación automática', 'Histórico por proveedor', 'Alertas de variación', 'Integración con OC', 'Reglas configurables'], en: ['Bulk quote loading', 'Side-by-side comparison', 'Price + lead-time analysis', 'Automatic recommendation', 'Vendor history', 'Variation alerts', 'PO integration', 'Configurable rules'] },
  },
  seniat: {
    badgeKey: 'local',
    headline: { es: 'Captura de socios de negocio desde el portal del SENIAT.', en: 'Business partner capture from the SENIAT portal.' },
    desc: { es: 'Cargue datos de proveedores y clientes con solo el RIF. Nuestra integración consulta el portal del SENIAT, valida la información y crea el socio automáticamente.', en: 'Load vendor and customer data with just the RIF. Our integration queries the SENIAT portal, validates data and creates the business partner automatically.' },
    features: { es: ['Consulta por RIF', 'Razón social y dirección fiscal', 'Validación de contribuyente especial', 'Estatus en tiempo real', 'Creación automática', 'Sin captcha manual', 'Auditoría', 'Cumplimiento fiscal'], en: ['Query by RIF', 'Legal name and tax address', 'Special-taxpayer validation', 'Real-time status', 'Automatic creation', 'No manual captcha', 'Auditing', 'Tax compliance'] },
  },
  bcv: {
    badgeKey: 'local',
    headline: { es: 'Tasas bancarias diarias automáticas desde el BCV.', en: 'Daily automatic bank rates from the BCV.' },
    desc: { es: 'Olvídese de cargar tasas a mano. Cada mañana, nuestra integración consulta el portal del Banco Central de Venezuela y actualiza la tasa en su ERP.', en: 'Forget loading rates manually. Every morning, our integration queries the Central Bank of Venezuela portal and updates the rate in your ERP.' },
    features: { es: ['USD, EUR y otras divisas', 'Tasa oficial diaria', 'Carga programada automática', 'Histórico completo', 'Alertas de variación', 'Aplicable a documentos', 'Sin intervención manual', 'Disponibilidad 24/7'], en: ['USD, EUR and other currencies', 'Daily official rate', 'Scheduled automatic load', 'Full history', 'Variation alerts', 'Applicable to documents', 'No manual intervention', '24/7 availability'] },
  },
}

const BADGE_LABELS: Record<string, { es: string; en: string }> = {
  erps:         { es: 'ERPs',                en: 'ERPs' },
  infra:        { es: 'Infraestructura',     en: 'Infrastructure' },
  bi:           { es: 'Business Intelligence', en: 'Business Intelligence' },
  integrations: { es: 'Integraciones',       en: 'Integrations' },
  ai:           { es: 'IA & Automatización', en: 'AI & Automation' },
  local:        { es: 'Integraciones Locales', en: 'Local Integrations' },
}

const TITLE_LABELS: Record<string, string> = {
  odoo: 'Odoo', docker: 'Docker', kubernetes: 'Kubernetes',
  'power-bi': 'Power BI', 'apache-superset': 'Apache Superset',
  n8n: 'N8N', pentaho: 'Pentaho',
  'ai-docs': 'IA · Documentos', 'ai-quotes': 'IA · Cotizaciones',
  seniat: 'SENIAT', bcv: 'BCV',
}

export default function Servicio() {
  const { serviceId } = useParams<{ serviceId: string }>()
  const { lang, t } = useI18n()
  const data = SERVICIOS[serviceId ?? '']
  if (!data) return null
  const badge = `${BADGE_LABELS[data.badgeKey][lang]} · ${TITLE_LABELS[serviceId ?? ''] ?? serviceId}`
  const headline = data.headline[lang]
  const desc = data.desc[lang]
  const features = data.features[lang]

  return (
    <div>
      <PageHero badge={badge} title={headline} subtitle={desc} cta1={t('servicio', 'cta')} />

      <Section>
        <h2 className="text-base font-bold text-foreground mb-4">{t('servicio', 'includes')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
          {features.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex items-center gap-2.5 px-3.5 py-3 rounded-lg bg-card border border-border"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-sm text-foreground">{f}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {COVERAGE_DATA[serviceId ?? ''] && (
        <Section alt>
          <CoverageTable data={COVERAGE_DATA[serviceId ?? '']} />
        </Section>
      )}

      <CtaBanner
        title={`${t('servicio', 'ctaFinal')} ${TITLE_LABELS[serviceId ?? ''] ?? serviceId}?`}
        sub={t('servicio', 'ctaFinalSub')}
        btnLabel={t('servicio', 'ctaFinalBtn')}
      />
    </div>
  )
}
