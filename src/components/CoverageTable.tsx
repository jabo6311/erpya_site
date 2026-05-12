import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, CheckCircle2 } from 'lucide-react'
import { useI18n } from '../lib/i18n'

export type CoverageGroup = {
  labelEs: string
  labelEn: string
  descEs?: string
  descEn?: string
  itemsEs: string[]
  itemsEn: string[]
}

export type CoverageData = {
  titleEs: string
  titleEn: string
  subtitleEs: string
  subtitleEn: string
  groups: CoverageGroup[]
}

export default function CoverageTable({ data, accentColor }: { data: CoverageData; accentColor?: string }) {
  const { lang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const color = accentColor ?? 'var(--primary)'
  const title = lang === 'en' ? data.titleEn : data.titleEs
  const subtitle = lang === 'en' ? data.subtitleEn : data.subtitleEs

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-primary/5 border-primary/30 text-primary font-semibold text-sm hover:bg-primary/10 transition-colors mb-5"
      >
        <ChevronDown size={15} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        {open ? t('coverage', 'hide') : t('coverage', 'show')}
      </button>

      {open && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="mb-4">
            <h3 className="text-lg font-extrabold tracking-tight text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="border border-border rounded-xl overflow-hidden bg-card">
            {data.groups.map((group, gi) => {
              const label = lang === 'en' ? group.labelEn : group.labelEs
              const desc  = lang === 'en' ? group.descEn  : group.descEs
              const items = lang === 'en' ? group.itemsEn : group.itemsEs
              return (
                <div key={label} className={gi < data.groups.length - 1 ? 'border-b border-border' : ''}>
                  <div className="px-5 py-3 bg-muted/50 border-b border-border/50">
                    <div className="text-[11px] font-bold text-foreground uppercase tracking-wider">{label}</div>
                    {desc && <div className="text-[11.5px] text-muted-foreground mt-0.5">{desc}</div>}
                  </div>
                  {items.map((item, ii) => (
                    <div key={item} className={`flex items-center justify-between px-5 py-2.5 ${ii < items.length - 1 ? 'border-b border-border/40' : ''}`}>
                      <span className="text-sm text-foreground">{item}</span>
                      <CheckCircle2 size={16} className="text-primary shrink-0" style={{ color }} />
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}
