import { Target, Lightbulb, Wrench } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { PageHero, Section } from '../components/PageHero'

export default function Nosotros() {
  const { t } = useI18n()
  const cards = [
    { Icon: Target,    titleKey: 'mission' as const,    textKey: 'missionText' as const },
    { Icon: Lightbulb, titleKey: 'innovation' as const, textKey: 'innovationText' as const },
    { Icon: Wrench,    titleKey: 'custom' as const,     textKey: 'customText' as const },
  ]
  return (
    <div>
      <PageHero badge={t('nosotros', 'badge')} title={t('nosotros', 'title')} subtitle={t('nosotros', 'sub')} />

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {cards.map(c => {
            const { Icon } = c
            return (
              <div key={c.titleKey} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div className="text-[15px] font-bold text-foreground">{t('nosotros', c.titleKey)}</div>
                <div className="text-[13.5px] text-muted-foreground leading-relaxed">{t('nosotros', c.textKey)}</div>
              </div>
            )
          })}
        </div>
      </Section>

      <Section alt>
        <div className="flex items-center gap-10 flex-wrap">
          <div className="flex-1 min-w-[220px]">
            <h2 className="text-xl font-extrabold text-foreground mb-2.5 tracking-tight">{t('nosotros', 'about')}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{t('nosotros', 'aboutText')}</p>
          </div>
          <div className="flex gap-7 flex-wrap">
            {[['+500', t('nosotros','clients')], ['+15', t('nosotros','years')], ['2', t('nosotros','offices')]].map(([v,l]) => (
              <div key={l} className="text-center">
                <div className="text-3xl font-black text-primary tracking-tight">{v}</div>
                <div className="text-xs text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
