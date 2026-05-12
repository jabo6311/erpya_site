import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Lang = 'es' | 'en'

const ES = {
  nav: { services: 'Servicios', about: 'Conócenos', contact: 'Contacto' },
  home: {
    badge: 'Venezuela · Latinoamérica',
    headline1: 'Tecnología empresarial.',
    headline2: 'Implementada por expertos.',
    subtitle: 'ERP, CRM, BI e Infraestructura — implementados por expertos con más de 15 años de experiencia en Venezuela y Latinoamérica.',
    cta1: 'Ver soluciones', cta2: 'Conócenos',
    statsCompanies: 'Empresas implementadas',
    statsYears: 'Años de experiencia',
    statsServices: 'Servicios especializados',
    statsCloud: 'Países atendidos',
    novedadesEyebrow: 'Novedades',
    novedadesTitle: 'Lo nuevo en ERPyA',
    novedadesSub: 'Nuevas capacidades con IA e integraciones locales para hacer tu ERP más inteligente cada día.',
    learnMore: 'Saber más',
  },
  adempiere: {
    badge: 'ERPs · ADempiere',
    headline: 'El ERP open-source de clase mundial,',
    headlineAccent: 'implementado por expertos.',
    sub: 'ADempiere es una plataforma ERP/CRM/SCM con más de 15 años de evolución. ERPyA lleva más de 500 empresas implementadas en Venezuela y Latinoamérica.',
    cta1: 'Solicitar Demo', cta2: 'Ver documentación',
    features: 'Funcionalidades Integrales',
    featuresSub: 'Administre sus operaciones internas y externas en una sola plataforma de clase mundial.',
    industries: 'Soluciones por Industria',
    industriesSub: 'Entornos preconfigurados para su sector, listos para despliegue.',
    ctaFinal: '¿Listo para implementar ADempiere?',
    ctaFinalSub: 'Nuestro equipo le acompaña de principio a fin.',
    ctaFinalBtn: 'Hablar con un experto',
  },
  servicio: {
    includes: '¿Qué incluye?',
    cta: 'Solicitar información',
    ctaFinal: '¿Listo para comenzar con',
    ctaFinalSub: 'Nuestro equipo de expertos le acompaña en cada paso.',
    ctaFinalBtn: 'Hablar con un experto',
  },
  coverage: {
    show: 'Ver cobertura completa',
    hide: 'Ocultar cobertura',
  },
  nosotros: {
    badge: 'Nosotros · ERPyA',
    title: 'Acerca de ERPyA',
    sub: 'Conozca más sobre nuestra visión y compromiso tecnológico con las empresas de Latinoamérica.',
    mission: 'Nuestra Misión',
    innovation: 'Innovación Continua',
    custom: 'A Medida (Custom)',
    missionText: 'Innovar y crear soluciones tecnológicamente avanzadas que resuelvan los problemas de negocio de nuestros clientes de la manera más simple, ágil y eficiente.',
    innovationText: 'Al unir tecnología de punta con modernos procedimientos de negocios se alcanzan increíbles avances hacia la productividad empresarial.',
    customText: 'En caso de que no exista un módulo para su necesidad, podemos diseñarlo a medida fusionando nuestros conocimientos técnicos y de negocio.',
    about: 'Más de 15 años impulsando empresas en Venezuela y Latinoamérica',
    aboutText: 'ERPyA es el socio tecnológico de cientos de empresas. Somos el puente entre la tecnología de clase mundial y las necesidades reales del mercado latinoamericano.',
    clients: 'Clientes', years: 'Años', offices: 'Sedes',
  },
  nube: {
    badge: 'Infraestructura · Nube / Cloud',
    title: '¿Qué es un Software ERP en la Nube?',
    sub: 'La computación en la Nube permite llevar los sistemas de gestión empresarial fuera de sus servidores físicos.',
    quote: 'La Nube es una elección estratégica que fortalece el futuro de su negocio.',
    flexible: 'Flexible',
    flexibleText: 'Evalúe mover su ERP a la nube, implemente funcionalidades híbridas, o pase a un sistema 100% web. ERPyA le acompaña en cada opción.',
    accessible: 'Accesible',
    accessibleText: 'Acceda a aplicaciones empresariales de alta performance a precios razonables, sin importar el tamaño de su empresa.',
    scalable: 'Escalable',
    scalableText: 'Reduzca costos de infraestructura local y obtenga funcionalidades de clase mundial sin límites de crecimiento.',
    ctaTitle: 'Concéntrate en tu negocio, nosotros del ERP',
    ctaSub: 'ADempiere Cloud sin servidores físicos que administrar.',
    ctaBtn: 'Solicitar Demo',
  },
  footer: {
    desc: 'Un ERP de clase mundial escalable para los negocios de Venezuela y Latinoamérica.',
    rights: '© 2026 ERPyA. Todos los derechos reservados.',
    tagline: 'ADempiere ERP · ERPyA',
    erps: 'ERPs', infra: 'Infraestructura', bi: 'Business Intelligence',
    integrations: 'Integraciones', ai: 'IA & Local', contact: 'Contacto',
  },
} as const

const EN: typeof ES = {
  nav: { services: 'Services', about: 'About us', contact: 'Contact' },
  home: {
    badge: 'Venezuela · Latin America',
    headline1: 'Business technology.',
    headline2: 'Implemented by experts.',
    subtitle: 'ERP, CRM, BI and Infrastructure — implemented by experts with over 15 years of experience in Venezuela and Latin America.',
    cta1: 'See solutions', cta2: 'About us',
    statsCompanies: 'Companies implemented',
    statsYears: 'Years of experience',
    statsServices: 'Specialized services',
    statsCloud: 'Countries served',
    novedadesEyebrow: "What's new",
    novedadesTitle: 'Latest from ERPyA',
    novedadesSub: 'New AI capabilities and local integrations to make your ERP smarter every day.',
    learnMore: 'Learn more',
  },
  adempiere: {
    badge: 'ERPs · ADempiere',
    headline: 'The world-class open-source ERP,',
    headlineAccent: 'implemented by experts.',
    sub: 'ADempiere is an ERP/CRM/SCM platform with over 15 years of evolution. ERPyA has implemented over 500 companies across Venezuela and Latin America.',
    cta1: 'Request Demo', cta2: 'View documentation',
    features: 'Full Feature Set',
    featuresSub: 'Manage your internal and external operations on a single world-class platform.',
    industries: 'Industry Solutions',
    industriesSub: 'Pre-configured environments for your sector, ready for deployment.',
    ctaFinal: 'Ready to implement ADempiere?',
    ctaFinalSub: 'Our team will guide you from start to finish.',
    ctaFinalBtn: 'Talk to an expert',
  },
  servicio: {
    includes: "What's included?",
    cta: 'Request information',
    ctaFinal: 'Ready to get started with',
    ctaFinalSub: 'Our team of experts will guide you every step of the way.',
    ctaFinalBtn: 'Talk to an expert',
  },
  coverage: {
    show: 'View full coverage',
    hide: 'Hide coverage',
  },
  nosotros: {
    badge: 'About · ERPyA',
    title: 'About ERPyA',
    sub: 'Learn more about our vision and technological commitment to Latin American businesses.',
    mission: 'Our Mission',
    innovation: 'Continuous Innovation',
    custom: 'Custom Development',
    missionText: "To innovate and create technologically advanced solutions that solve our clients' business problems in the simplest, most agile and efficient way.",
    innovationText: 'By combining cutting-edge technology with modern business processes, we achieve incredible advances in enterprise productivity.',
    customText: "If a module for your need doesn't exist, we can design it from scratch by combining our technical and business knowledge.",
    about: 'Over 15 years empowering businesses in Venezuela and Latin America',
    aboutText: 'ERPyA is the technology partner of hundreds of companies. We bridge world-class technology with the real needs of the Latin American market.',
    clients: 'Clients', years: 'Years', offices: 'Offices',
  },
  nube: {
    badge: 'Infrastructure · Cloud',
    title: 'What is a Cloud ERP Software?',
    sub: 'Cloud computing allows enterprise management systems to run outside your physical servers.',
    quote: 'The Cloud is a strategic choice that strengthens the future of your business.',
    flexible: 'Flexible',
    flexibleText: 'Whether evaluating moving your ERP to the cloud, hybrid implementations, or a 100% web system — ERPyA supports you every step of the way.',
    accessible: 'Accessible',
    accessibleText: 'Access high-performance enterprise applications at reasonable prices, regardless of your company size.',
    scalable: 'Scalable',
    scalableText: 'Reduce local infrastructure costs and get world-class features with no growth limits.',
    ctaTitle: 'Focus on your business, we handle the ERP',
    ctaSub: 'ADempiere Cloud with no physical servers to manage.',
    ctaBtn: 'Request Demo',
  },
  footer: {
    desc: 'A world-class scalable ERP for businesses in Venezuela and Latin America.',
    rights: '© 2026 ERPyA. All rights reserved.',
    tagline: 'ADempiere ERP · ERPyA',
    erps: 'ERPs', infra: 'Infrastructure', bi: 'Business Intelligence',
    integrations: 'Integrations', ai: 'AI & Local', contact: 'Contact',
  },
}

const TRANSLATIONS = { es: ES, en: EN }

type I18nContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: <S extends keyof typeof ES, K extends keyof (typeof ES)[S]>(section: S, key: K) => string
}

const I18nContext = createContext<I18nContextType>({
  lang: 'es',
  setLang: () => {},
  t: () => '',
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem('erpya_lang') as Lang) || 'es')

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('erpya_lang', l)
  }

  const t: I18nContextType['t'] = (section, key) => {
    return (TRANSLATIONS[lang][section] as Record<string, string>)[key as string] ?? String(key)
  }

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)
