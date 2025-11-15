import { StudentProfile, DimensionStatus } from "./student-types"

/**
 * Calcula el nivel de riesgo general basado en múltiples factores
 */
export const getRiskLevel = (profile: StudentProfile): "CRÍTICO" | "ALTO" | "MEDIO" | "BAJO" => {
  const riskFactors = [
    profile.conductual.status === "red" ? 1 : profile.conductual.status === "yellow" ? 0.5 : 0,
    profile.social.status === "red" ? 1 : profile.social.status === "yellow" ? 0.5 : 0,
    profile.emocional.capacidadEmpatica < 40 ? 1 : profile.emocional.capacidadEmpatica < 70 ? 0.5 : 0,
    profile.cognitivo.percepcionDocente === "minimiza"
      ? 1
      : profile.cognitivo.percepcionDocente === "neutral"
        ? 0.5
        : 0,
  ]
  const totalRisk = riskFactors.reduce((a, b) => a + b, 0) / riskFactors.length
  return totalRisk > 0.7 ? "CRÍTICO" : totalRisk > 0.4 ? "ALTO" : totalRisk > 0.2 ? "MEDIO" : "BAJO"
}

/**
 * Retorna las clases Tailwind para el color de riesgo
 */
export const getRiskColor = (
  level: "CRÍTICO" | "ALTO" | "MEDIO" | "BAJO"
): string => {
  switch (level) {
    case "CRÍTICO":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "ALTO":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    case "MEDIO":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    default:
      return "bg-green-500/20 text-green-400 border-green-500/30"
  }
}

/**
 * Retorna las clases Tailwind para el color de dimensión según su estado
 */
export const getDimensionColor = (status: DimensionStatus): string => {
  switch (status) {
    case "green":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "yellow":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case "red":
      return "bg-red-500/20 text-red-400 border-red-500/30"
  }
}

/**
 * Retorna el color RGB para indicadores visuales (pequeños círculos, etc)
 */
export const getStatusIndicatorColor = (
  status: DimensionStatus | "subiendo" | "bajando" | "mejorando" | "empeorando"
): string => {
  switch (status) {
    case "red":
    case "bajando":
    case "empeorando":
      return "bg-red-500"
    case "yellow":
      return "bg-yellow-500"
    case "green":
    case "subiendo":
    case "mejorando":
      return "bg-green-500"
    default:
      return "bg-slate-500"
  }
}

/**
 * Retorna la clase para la barra de progreso basada en el score
 */
export const getProgressBarColor = (score: number, reverseLogic: boolean = false): string => {
  if (reverseLogic) {
    // Para métricas donde alto es malo (justificación de acoso)
    return score >= 70 ? "bg-red-500" : score >= 40 ? "bg-yellow-500" : "bg-green-500"
  }
  // Para métricas donde alto es bueno (empatía, autocontrol, etc)
  return score >= 70 ? "bg-green-500" : score >= 40 ? "bg-yellow-500" : "bg-red-500"
}

/**
 * Retorna el color de severidad para incidentes
 */
export const getSeverityColor = (
  severidad: "baja" | "media" | "alta"
): string => {
  switch (severidad) {
    case "alta":
      return "bg-red-500/20 text-red-400"
    case "media":
      return "bg-yellow-500/20 text-yellow-400"
    default:
      return "bg-green-500/20 text-green-400"
  }
}

/**
 * Retorna el color RGB puro para indicadores de estado (círculos)
 */
export const getStatusBgColor = (status: DimensionStatus): string => {
  switch (status) {
    case "green":
      return "bg-green-500"
    case "yellow":
      return "bg-yellow-500"
    case "red":
      return "bg-red-500"
  }
}
