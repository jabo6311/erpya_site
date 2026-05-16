import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

type PageHeroProps = {
  badge?: string
  title: ReactNode
  titleAccent?: string
  subtitle?: string
  cta1?: string
  cta2?: string
  onCta1?: () => void
  onCta2?: () => void
  children?: ReactNode
}

export function PageHero({ badge, title, titleAccent, subtitle, cta1, cta2, onCta1, onCta2, children }: PageHeroProps) {
  const handleCta1 = onCta1 || (() => window.open('https://wa.me/584122223824', '_blank'))
  const handleCta2 = onCta2 || (() => window.open('https://wa.me/584122223824', '_blank'))

  return (
    <div
      data-header-surface="dark"
      className="relative overflow-hidden px-8 pt-28 pb-16"
      style={{
        background:
          'radial-gradient(circle at 72% 26%, rgba(26,170,212,0.22), transparent 30%), radial-gradient(circle at 18% 18%, rgba(91,200,229,0.12), transparent 27%), linear-gradient(135deg, #071329 0%, #0D2167 48%, #08122A 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 92%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/90 to-transparent" />

      <div className="relative max-w-3xl mx-auto text-center">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/[0.09] border border-white/[0.18] text-xs font-semibold text-white/[0.88] mb-6 whitespace-nowrap tracking-wide backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full" />
            {badge}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
          className="text-[clamp(28px,4.5vw,50px)] font-extrabold tracking-tight leading-[1.12] text-white mb-4"
        >
          {title}
          {titleAccent && <><br /><span className="text-brand-cyan">{titleAccent}</span></>}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base text-white/70 leading-relaxed mb-8 max-w-xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
        {(cta1 || cta2 || children) && (
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}
            className="flex gap-2.5 justify-center flex-wrap"
          >
            {cta1 && (
              <button
                onClick={handleCta1}
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg bg-brand-cyan text-brand-navy font-bold text-sm hover:bg-brand-cyan-light transition-colors"
              >
                {cta1} <ArrowRight size={15} />
              </button>
            )}
            {cta2 && (
              <button
                onClick={handleCta2}
                className="px-5 py-3 rounded-lg border border-white/[0.22] text-white/[0.88] font-medium text-sm hover:bg-white/[0.08] transition-colors"
              >
                {cta2}
              </button>
            )}
            {children}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export function StatsBar({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-3xl mx-auto flex">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`flex-1 text-center py-4 px-3 ${i < stats.length - 1 ? 'border-r border-border' : ''}`}
          >
            <div className="text-2xl font-extrabold text-brand-navy dark:text-brand-cyan tracking-tight">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CtaBanner({ title, sub, btnLabel, onClick }: { title: string; sub?: string; btnLabel: string; onClick?: () => void }) {
  const handleClick = onClick || (() => window.open('https://wa.me/584122223824', '_blank'))
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="bg-brand-navy rounded-xl px-10 py-8 flex items-center justify-between flex-wrap gap-5">
        <div>
          <div className="text-lg font-bold text-white mb-1">{title}</div>
          {sub && <div className="text-sm text-white/70">{sub}</div>}
        </div>
        <button
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-brand-cyan text-brand-navy font-bold text-sm hover:bg-brand-cyan-light transition-colors whitespace-nowrap"
        >
          {btnLabel} <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}

export function Section({ alt = false, children, className = '' }: { alt?: boolean; children: ReactNode; className?: string }) {
  return (
    <section className={`${alt ? 'bg-card' : 'bg-background'} border-t border-border px-8 py-12 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  )
}

export function SectionHeading({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-7">
      <h2 className="text-[clamp(18px,2.5vw,26px)] font-extrabold tracking-tight text-foreground mb-1.5">{title}</h2>
      {sub && <p className="text-sm text-muted-foreground max-w-xl">{sub}</p>}
    </div>
  )
}
