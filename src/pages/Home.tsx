import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-32 pb-20 px-6 min-h-[90vh] relative overflow-hidden">

      {/* Orbes animados de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-blue-500/25 dark:bg-blue-500/15 blur-[90px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.18, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute -top-20 -right-48 w-[650px] h-[650px] rounded-full bg-cyan-400/20 dark:bg-cyan-400/10 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, 25, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[750px] h-[400px] rounded-full bg-blue-700/15 dark:bg-blue-600/10 blur-[120px]"
        />
      </div>

      {/* Cuadrícula de puntos */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center pt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-primary mb-8 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Basado en ADempiere ERP · Cloud y On-Premise
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]"
        >
          Controle y visualice todo <br className="hidden md:block" />
          <span className="text-gradient">en una sola plataforma.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
        >
          Software de Gestión Integral para Empresas. ¿Por qué optar sólo por un software contable cuando un potente ERP y CRM está a su alcance para gestionar con éxito los negocios de hoy en día?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <Link to="/funcionalidades" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-medium transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-primary/25">
            Ver Funcionalidades
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Métricas debajo del CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[
            { value: '+500', label: 'Empresas gestionadas' },
            { value: '+15', label: 'Años de experiencia' },
            { value: 'Cloud', label: 'y On-Premise' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl md:text-4xl font-extrabold text-gradient">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
