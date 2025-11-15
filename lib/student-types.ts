// Tipos compartidos para estudiantes
export type DimensionStatus = "green" | "yellow" | "red"
export type Frecuencia = "baja" | "media" | "alta"
export type Intensidad = "baja" | "media" | "alta"
export type RolSocial = "lider" | "aislado" | "puente" | "potencial_agresor"
export type PercepcionDocente = "minimiza" | "neutral" | "rechaza"
export type CambiosTendencia = "mejorando" | "empeorando" | "sin_cambios"
export type TipoSeveridad = "baja" | "media" | "alta"

export interface StudentProfile {
  conductual: {
    status: DimensionStatus
    incidentes: number
    frecuencia: Frecuencia
    intensidad: Intensidad
    historial?: Array<{
      fecha: string
      tipo: string
      severidad: TipoSeveridad
    }>
  }
  emocional: {
    score: number
    capacidadEmpatica: number
    autocontrol: number
    tendencia?: "subiendo" | "bajando"
    historico?: number[]
  }
  social: {
    status: DimensionStatus
    rol: RolSocial
    relacionesPositivas: number
    relacionesConflictivas: number
    dominancia: boolean
    gruposInfluencia?: string[]
  }
  cognitivo: {
    percepcionDocente: PercepcionDocente
    nivelJustificacion: number
    creenciasAsociadas: string[]
    cambios?: CambiosTendencia
  }
}

export interface StudentBase {
  id: string
  name: string
  grade: string
  section: string
  profile: StudentProfile
}

export interface StudentProfileData extends StudentBase {}

export interface StudentReportData extends StudentBase {
  lastUpdated: string
}
