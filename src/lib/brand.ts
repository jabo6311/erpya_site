// Brand constants extracted from the ERPyA logo
export const BRAND = {
  navy:       "#0D2167",
  navyLight:  "#1535A0",
  navyDark:   "#081853",
  cyan:       "#1AAAD4",
  cyanLight:  "#5BC8E5",
  cyanDark:   "#1488AF",
} as const

// Service IDs that route to ServicioPage
export const SERVICE_IDS = [
  "adempiere", "odoo",
  "docker", "kubernetes", "nube",
  "powerbi", "superset",
  "n8n", "pentaho",
  "ai-docs", "ai-quotes", "seniat", "bcv",
] as const

export type ServiceId = (typeof SERVICE_IDS)[number]
