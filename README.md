# ERPyA — Production Files

Este folder contiene los archivos `.tsx` listos para tu repo `erpya/erpya_site`.

## Cómo aplicar

Desde la raíz de tu repo local, en tu terminal:

```bash
# 1. Reemplaza estos archivos por los nuevos:
cp /path/to/production/tailwind.config.js ./
cp /path/to/production/src/index.css ./src/
cp /path/to/production/src/App.tsx ./src/
cp /path/to/production/src/components/Layout.tsx ./src/components/

# 2. Crea las nuevas carpetas y archivos:
mkdir -p ./src/lib ./src/components ./src/pages
cp /path/to/production/src/lib/*.ts*    ./src/lib/
cp /path/to/production/src/components/*.tsx ./src/components/
cp /path/to/production/src/pages/*.ts*  ./src/pages/

# 3. Borra los archivos viejos que ya no se usan
rm -rf ./src/pages/generated
rm ./src/pages/Funcionalidades.tsx ./src/pages/Soluciones.tsx ./src/pages/Home.tsx ./src/pages/Nosotros.tsx

# 4. Cualquier servicio que faltaba viene de los pages nuevos.
# 5. Asegúrate de tener Inter:
# en index.html agrega:
#   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

# 6. Prueba en local
npm run dev

# 7. Si todo se ve bien, commit y push
git add .
git commit -m "feat: nuevo home con ecosistema, Servicios mega-menu, IA & SENIAT/BCV, dark mode, ES/EN, brand colors"
git push
```

## Estructura nueva

```
src/
├── App.tsx                                  ← rutas actualizadas
├── index.css                                ← theme tokens (light/dark)
├── lib/
│   ├── brand.ts                             ← navy + cyan del logo
│   └── i18n.tsx                             ← Context + traducciones ES/EN
├── components/
│   ├── Layout.tsx                           ← Nav (mega-menu) + Footer
│   ├── PageHero.tsx                         ← Hero + StatsBar + CtaBanner + Section
│   ├── EcosystemDiagram.tsx                 ← Diagrama animado del home
│   ├── CoverageTable.tsx                    ← Tabla colapsable
│   └── NovedadesSection.tsx                 ← Sección "Lo nuevo en ERPyA"
└── pages/
    ├── Home.tsx                             ← Hero ecosistema + Novedades + Stats
    ├── Adempiere.tsx                        ← ADempiere completo
    ├── Servicio.tsx                         ← Template + data (Odoo, Docker, K8s, BI, IA, etc.)
    ├── coverage-data.ts                     ← Tablas de cobertura por servicio
    ├── Nube.tsx
    └── Nosotros.tsx
```

## Rutas

| Path               | Página              |
|--------------------|---------------------|
| `/`                | Home                |
| `/adempiere`       | ADempiere completo  |
| `/odoo`            | Odoo                |
| `/docker`          | Docker              |
| `/kubernetes`      | Kubernetes          |
| `/nube`            | Nube / Cloud        |
| `/power-bi`        | Power BI            |
| `/apache-superset` | Apache Superset     |
| `/n8n`             | N8N                 |
| `/pentaho`         | Pentaho             |
| `/ai-docs`         | IA · Documentos     |
| `/ai-quotes`       | IA · Cotizaciones   |
| `/seniat`          | Captura SENIAT      |
| `/bcv`             | Tasas BCV           |
| `/nosotros`        | Nosotros            |

## Dependencias requeridas

Ya están todas en tu `package.json`:

- `react-router-dom` ✓
- `framer-motion` ✓
- `lucide-react` ✓
- `tailwindcss` ✓

No necesitas instalar nada nuevo.

## Notas

- **Tema dark/light**: persiste en `localStorage` con clave `theme`
- **Idioma ES/EN**: persiste en `localStorage` con clave `erpya_lang`
- **Mega-menu**: la columna "IA & Local" tiene badge "Nuevo" en cyan
- **Cobertura**: la tabla está colapsada por defecto en cada página de servicio
- **Logo del ecosistema**: usa `cropped-cropped-erp-icono-1-1.png` de erpya.com como fallback — si lo prefieres, descárgalo a `/public/logo-icon.png` y ajusta el `href` en `EcosystemDiagram.tsx`
