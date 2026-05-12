import { useEffect, useState, ReactNode } from 'react'
import { BRAND } from '../lib/brand'
import erpyaMarkUrl from '../assets/erpya-mark.svg'

type Node = { id: string; label: string; angle: number; icon: ReactNode }

const SERVICE_NODES: Node[] = [
  { id: 'adempiere',  label: 'ADempiere',  angle: 270, icon: <path d="M3 3v18h18M3 12h9M12 3v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/> },
  { id: 'odoo',       label: 'Odoo',       angle: 315, icon: <><rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/></> },
  { id: 'powerbi',    label: 'Power BI',   angle: 0,   icon: <><rect x="2" y="10" width="4" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/><rect x="9" y="6" width="4" height="15" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/><rect x="16" y="2" width="4" height="19" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/></> },
  { id: 'superset',   label: 'Superset',   angle: 45,  icon: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9M12 3c-2.5 2.5-4 5.5-4 9s1.5 6.5 4 9M3 12h18" stroke="currentColor" strokeWidth="1.5" fill="none"/></> },
  { id: 'docker',     label: 'Docker',     angle: 90,  icon: <><path d="M13 10h2M9 10h2M5 10h2M13 6h2M9 6h2M7 14c-3 0-5-1-5-3.5C2 8 4 7 5 7h.5C6 5 8 4 10 4.5M19 10.5c1-.5 2-2 1.5-4-1.5-.5-3 .5-3.5 2H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/><path d="M5 14s0 4 7 4 9-4 9-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/></> },
  { id: 'kubernetes', label: 'K8s',        angle: 135, icon: <><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.5"/><line x1="2" y1="8.5" x2="22" y2="15.5" stroke="currentColor" strokeWidth="1" opacity="0.5"/><line x1="22" y1="8.5" x2="2" y2="15.5" stroke="currentColor" strokeWidth="1" opacity="0.5"/></> },
  { id: 'n8n',        label: 'N8N',        angle: 180, icon: <><circle cx="5" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="19" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="19" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M7.5 12h4l2-6h3M7.5 12h4l2 6h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/></> },
  { id: 'pentaho',    label: 'Pentaho',    angle: 225, icon: <><path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/><rect x="6" y="11" width="3" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><rect x="12" y="7" width="3" height="11" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/></> },
]

export default function EcosystemDiagram() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000)
    return () => clearInterval(id)
  }, [])
  const activeIdx = tick % SERVICE_NODES.length
  const cx = 50, cy = 50, R = 34, nodeR = 7.5
  const toRad = (deg: number) => (deg * Math.PI) / 180

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_28px_50px_rgba(0,0,0,0.22)]">
      <defs>
        <radialGradient id="ecglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={BRAND.cyanLight} stopOpacity="0.38" />
          <stop offset="48%" stopColor={BRAND.cyan} stopOpacity="0.12" />
          <stop offset="100%" stopColor={BRAND.cyan} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nodeFill" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
        </linearGradient>
        <filter id="ecblur"><feGaussianBlur stdDeviation="1.6" /></filter>
        <filter id="softShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="1.4" stdDeviation="2.6" floodColor="#020617" floodOpacity="0.34" />
        </filter>
        <clipPath id="logoClip"><circle cx={cx} cy={cy} r="13.6" /></clipPath>
      </defs>

      <circle cx={cx} cy={cy} r="42" fill="url(#ecglow)" />
      <circle cx={cx} cy={cy} r="40" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.35" strokeDasharray="1.8 2.6" />
      <circle cx={cx} cy={cy} r="26" fill="none" stroke={`${BRAND.cyan}35`} strokeWidth="0.35" />

      {SERVICE_NODES.map((n, i) => {
        const rad = toRad(n.angle)
        const nx = cx + R * Math.cos(rad)
        const ny = cy + R * Math.sin(rad)
        const isActive = i === activeIdx
        return (
          <line key={n.id} x1={cx} y1={cy} x2={nx} y2={ny}
            stroke={isActive ? BRAND.cyanLight : 'rgba(255,255,255,0.14)'}
            strokeWidth={isActive ? 0.75 : 0.32}
            strokeDasharray={isActive ? 'none' : '1.7 2.2'}
            strokeLinecap="round"
            style={{ transition: 'stroke .4s, stroke-width .4s, opacity .4s' }}
          />
        )
      })}

      {SERVICE_NODES.map((n, i) => {
        const rad = toRad(n.angle)
        const nx = cx + R * Math.cos(rad)
        const ny = cy + R * Math.sin(rad)
        const isActive = i === activeIdx
        const lx = cx + (R + 11) * Math.cos(rad)
        const ly = cy + (R + 11) * Math.sin(rad)
        return (
          <g key={n.id}>
            {isActive && <circle cx={nx} cy={ny} r={nodeR + 4.3} fill={`${BRAND.cyan}38`} filter="url(#ecblur)" />}
            <circle cx={nx} cy={ny} r={nodeR}
              fill={isActive ? `${BRAND.cyan}28` : 'url(#nodeFill)'}
              stroke={isActive ? BRAND.cyanLight : 'rgba(255,255,255,0.28)'}
              strokeWidth={isActive ? 0.95 : 0.45}
              filter="url(#softShadow)"
              style={{ transition: 'fill .4s, stroke .4s' }}
            />
            <svg x={nx - 5} y={ny - 5} width="10" height="10" viewBox="0 0 24 24"
              style={{ color: isActive ? BRAND.cyan : 'rgba(255,255,255,0.55)', transition: 'color .4s' }}
            >
              {n.icon}
            </svg>
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
              fontSize="3.2" fontWeight={isActive ? 700 : 400}
              fill={isActive ? BRAND.cyan : 'rgba(255,255,255,0.45)'}
              fontFamily="Inter,sans-serif"
              style={{ transition: 'fill .4s' }}
            >
              {n.label}
            </text>
          </g>
        )
      })}

      <g filter="url(#softShadow)">
        <circle cx={cx} cy={cy} r="17.2" fill="rgba(9, 24, 83, 0.58)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.45" />
        <circle cx={cx} cy={cy} r="14.4" fill={BRAND.navy} stroke={BRAND.cyanLight} strokeWidth="0.65" />
        <image
          href={erpyaMarkUrl}
          x="38.2"
          y="38.2"
          width="23.6"
          height="23.6"
          clipPath="url(#logoClip)"
          preserveAspectRatio="xMidYMid meet"
        />
      </g>
    </svg>
  )
}
