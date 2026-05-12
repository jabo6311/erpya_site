import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import EcosystemDiagram from '../components/EcosystemDiagram'
import { StatsBar } from '../components/PageHero'
import NovedadesSection from '../components/NovedadesSection'

export default function Home() {
  const { t, lang } = useI18n()
  const navigate = useNavigate()
  const proofPoints = lang === 'en'
    ? ['ERP implementation', 'BI and analytics', 'Cloud infrastructure']
    : ['Implementación ERP', 'BI y analítica', 'Infraestructura cloud']

  return (
    <div>
      <div
        id="home-hero"
        data-header-surface="dark"
        className="relative overflow-hidden px-6 pt-28 pb-16 sm:px-8 lg:pt-32 lg:pb-20"
        style={{
          background:
            'radial-gradient(circle at 72% 34%, rgba(26,170,212,0.24), transparent 31%), radial-gradient(circle at 14% 12%, rgba(91,200,229,0.13), transparent 28%), linear-gradient(135deg, #071329 0%, #0D2167 47%, #08122A 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-55"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 92%)',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/95 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_430px] lg:gap-14">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/[0.18] bg-white/[0.09] px-3.5 py-1.5 text-xs font-semibold text-white/[0.88] shadow-[0_14px_38px_rgba(0,0,0,0.14)] backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-[0_0_14px_rgba(26,170,212,0.9)]" />
              {t('home', 'badge')}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
              className="mb-5 max-w-[720px] text-[clamp(34px,5vw,64px)] font-extrabold leading-[1.04] tracking-tight text-white"
            >
              {t('home', 'headline1')}{' '}
              <span className="text-brand-cyan-light">{t('home', 'headline2')}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
              className="mb-7 max-w-xl text-base leading-8 text-white/[0.72] sm:text-lg"
            >
              {t('home', 'subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}
              className="mb-8 flex flex-wrap gap-3"
            >
              <button
                onClick={() => navigate('/adempiere')}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-cyan px-6 py-3 text-sm font-extrabold text-brand-navy shadow-[0_18px_45px_rgba(26,170,212,0.28)] transition-colors hover:bg-brand-cyan-light"
              >
                {t('home', 'cta1')} <ArrowRight size={15} />
              </button>
              <button
                onClick={() => navigate('/nosotros')}
                className="rounded-lg border border-white/[0.24] px-5 py-3 text-sm font-semibold text-white/[0.88] transition-colors hover:bg-white/[0.08]"
              >
                {t('home', 'cta2')}
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.32 }}
              className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70"
            >
              {proofPoints.map(point => (
                <span key={point} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-cyan-light" />
                  {point}
                </span>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.12 }}
            className="mx-auto h-[320px] w-full max-w-[380px] sm:h-[380px] lg:h-[430px] lg:max-w-none"
          >
            <EcosystemDiagram />
          </motion.div>
        </div>
      </div>

      <NovedadesSection />

      <StatsBar stats={[
        { value: '+500', label: t('home', 'statsCompanies') },
        { value: '+15',  label: t('home', 'statsYears') },
        { value: '8+',   label: t('home', 'statsServices') },
        { value: '10+',  label: t('home', 'statsCloud') },
      ]} />
    </div>
  )
}
