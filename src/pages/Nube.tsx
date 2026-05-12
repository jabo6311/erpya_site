import { Zap, Shield, Cloud } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { PageHero, Section, CtaBanner } from '../components/PageHero'

export default function Nube() {
  const { t } = useI18n()
  const cards = [
    { Icon: Zap,    titleKey: 'flexible' as const,   textKey: 'flexibleText' as const },
    { Icon: Shield, titleKey: 'accessible' as const, textKey: 'accessibleText' as const },
    { Icon: Cloud,  titleKey: 'scalable' as const,   textKey: 'scalableText' as const },
  ]

  return (
    <div>
      <PageHero
        badge={t('nube', 'badge')}
        title={t('nube', 'title')}
        subtitle={t('nube', 'sub')}
      />
      <Section>
        <p className="text-base font-semibold text-foreground mb-6 max-w-2xl">{t('nube', 'quote')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {cards.map(c => {
            const { Icon } = c
            return (
              <div key={c.titleKey} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:-translate-y-0.5 hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div className="text-[17px] font-bold text-foreground">{t('nube', c.titleKey)}</div>
                <div className="text-[13.5px] text-muted-foreground leading-relaxed">{t('nube', c.textKey)}</div>
              </div>
            )
          })}
        </div>
      </Section>
      <CtaBanner
        title={t('nube', 'ctaTitle')}
        sub={t('nube', 'ctaSub')}
        btnLabel={t('nube', 'ctaBtn')}
      />
    </div>
  )
}
