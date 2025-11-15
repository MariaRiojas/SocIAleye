"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DashboardFilters } from "@/components/dashboard/dashboard-filters"
import { AIChatbot } from "@/components/ai-chatbot/ai-chatbot"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, TrendingDown } from "lucide-react"
import {
  getRiskLevel,
  getDimensionColor,
  getProgressBarColor,
  getSeverityColor,
} from "@/lib/student-utils"

const STUDENT_REPORTS = [
  {
    id: "1",
    name: "Carlos López",
    grade: "1",
    section: "A",
    lastUpdated: "2025-01-15",
    profile: {
      conductual: {
        status: "red" as const,
        incidentes: 5,
        frecuencia: "alta" as const,
        intensidad: "media" as const,
        historial: [
          { fecha: "2025-01-10", tipo: "Agresión verbal", severidad: "alta" },
          { fecha: "2025-01-08", tipo: "Exclusión social", severidad: "media" },
          { fecha: "2025-01-05", tipo: "Acoso cibernético", severidad: "media" },
          { fecha: "2025-01-02", tipo: "Agresión física", severidad: "alta" },
          { fecha: "2024-12-28", tipo: "Burlas constantes", severidad: "media" },
        ],
      },
      emocional: {
        score: 35,
        capacidadEmpatica: 25,
        autocontrol: 30,
        tendencia: "bajando" as const,
        historico: [35, 38, 42, 39, 35],
      },
      social: {
        status: "red" as const,
        rol: "potencial_agresor" as const,
        relacionesPositivas: 2,
        relacionesConflictivas: 8,
        dominancia: true,
        gruposInfluencia: ["Grupo A", "Grupo B"],
      },
      cognitivo: {
        percepcionDocente: "minimiza" as const,
        nivelJustificacion: 75,
        creenciasAsociadas: ["Sentido de superioridad", "Justificación por provocación", "Culpabilización de víctima"],
        cambios: "sin_cambios" as const,
      },
    },
  },
  {
    id: "2",
    name: "Ana García",
    grade: "1",
    section: "A",
    lastUpdated: "2025-01-14",
    profile: {
      conductual: {
        status: "red" as const,
        incidentes: 8,
        frecuencia: "alta" as const,
        intensidad: "alta" as const,
        historial: [
          { fecha: "2025-01-14", tipo: "Agresión física", severidad: "alta" },
          { fecha: "2025-01-12", tipo: "Amenazas", severidad: "alta" },
          { fecha: "2025-01-10", tipo: "Agresión verbal", severidad: "alta" },
          { fecha: "2025-01-08", tipo: "Ciberbullying", severidad: "media" },
          { fecha: "2025-01-05", tipo: "Exclusión", severidad: "media" },
        ],
      },
      emocional: {
        score: 20,
        capacidadEmpatica: 15,
        autocontrol: 18,
        tendencia: "bajando" as const,
        historico: [45, 38, 30, 25, 20],
      },
      social: {
        status: "red" as const,
        rol: "potencial_agresor" as const,
        relacionesPositivas: 0,
        relacionesConflictivas: 12,
        dominancia: true,
        gruposInfluencia: ["Grupo C"],
      },
      cognitivo: {
        percepcionDocente: "minimiza" as const,
        nivelJustificacion: 88,
        creenciasAsociadas: ["Derecho al control", "Superioridad", "Víctima provocó acoso"],
        cambios: "empeorando" as const,
      },
    },
  },
  {
    id: "3",
    name: "Juan Martínez",
    grade: "1",
    section: "A",
    lastUpdated: "2025-01-13",
    profile: {
      conductual: {
        status: "yellow" as const,
        incidentes: 2,
        frecuencia: "media" as const,
        intensidad: "baja" as const,
        historial: [
          { fecha: "2025-01-10", tipo: "Comentario inapropiado", severidad: "baja" },
          { fecha: "2025-01-02", tipo: "Burla ocasional", severidad: "baja" },
        ],
      },
      emocional: {
        score: 65,
        capacidadEmpatica: 60,
        autocontrol: 70,
        tendencia: "subiendo" as const,
        historico: [55, 58, 62, 64, 65],
      },
      social: {
        status: "yellow" as const,
        rol: "lider" as const,
        relacionesPositivas: 10,
        relacionesConflictivas: 2,
        dominancia: false,
        gruposInfluencia: ["Grupo A", "Grupo D"],
      },
      cognitivo: {
        percepcionDocente: "neutral" as const,
        nivelJustificacion: 35,
        creenciasAsociadas: ["Necesidad de atención"],
        cambios: "mejorando" as const,
      },
    },
  },
]

export default function ReportsPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [filters, setFilters] = useState({
    level: "primaria",
    grade: "1",
    section: "A",
  })
  const [selectedStudent, setSelectedStudent] = useState<(typeof STUDENT_REPORTS)[0] | null>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  const filteredStudents = STUDENT_REPORTS.filter((s) => s.grade === filters.grade && s.section === filters.section)


  const getTrendIcon = (tendencia: string) => {
    if (tendencia === "subiendo" || tendencia === "mejorando") {
      return <TrendingUp className="w-4 h-4 text-green-400" />
    }
    return <TrendingDown className="w-4 h-4 text-red-400" />
  }

  const chatbotContext = `Reportes de Estudiantes - ${filters.level === "primaria" ? "Primaria" : "Secundaria"} ${filters.grade}° ${filters.section}`

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Reportes por Estudiante</h1>
          <p className="text-stone-400 mt-1 sm:mt-2 text-sm sm:text-base">
            Análisis detallado con histórico de incidentes y dimensiones por estudiante
          </p>
        </div>

        <DashboardFilters filters={filters} onFiltersChange={setFilters} />

        {selectedStudent ? (
          // VISTA DETALLADA DE REPORTE
          <div className="space-y-4 sm:space-y-6">
            <Button
              onClick={() => setSelectedStudent(null)}
              className="bg-stone-700 hover:bg-slate-600 text-white mb-4"
            >
              Volver a la lista
            </Button>

            <Card className="border-stone-700 bg-stone-800/50 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">{selectedStudent.name}</h2>
                  <p className="text-stone-400 text-sm mt-1">
                    {filters.level === "primaria" ? "Primaria" : "Secundaria"} {selectedStudent.grade}° - Sección{" "}
                    {selectedStudent.section}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge className={`${getDimensionColor(selectedStudent.profile.conductual.status)} border text-xs`}>
                    Riesgo: {getRiskLevel(selectedStudent.profile)}
                  </Badge>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-2">
                    <Download className="w-4 h-4" />
                    Exportar
                  </Button>
                </div>
              </div>

              {/* GRID DE MÉTRICAS PRINCIPALES */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6">
                <Card className="border-stone-700 bg-stone-700/50 p-3 sm:p-4">
                  <p className="text-xs text-stone-400 mb-1">Incidentes</p>
                  <p className="text-2xl font-bold text-white">{selectedStudent.profile.conductual.incidentes}</p>
                </Card>
                <Card className="border-stone-700 bg-stone-700/50 p-3 sm:p-4">
                  <p className="text-xs text-stone-400 mb-1">Emocional</p>
                  <p className="text-2xl font-bold text-white">{selectedStudent.profile.emocional.score}</p>
                </Card>
                <Card className="border-stone-700 bg-stone-700/50 p-3 sm:p-4">
                  <p className="text-xs text-stone-400 mb-1">Empatía</p>
                  <p className="text-2xl font-bold text-white">{selectedStudent.profile.emocional.capacidadEmpatica}</p>
                </Card>
                <Card className="border-stone-700 bg-stone-700/50 p-3 sm:p-4">
                  <p className="text-xs text-stone-400 mb-1">Justificación</p>
                  <p className="text-2xl font-bold text-white">
                    {selectedStudent.profile.cognitivo.nivelJustificacion}%
                  </p>
                </Card>
              </div>

              {/* DIMENSIÓN CONDUCTUAL */}
              <div className="space-y-3 mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                  Dimensión Conductual - Histórico de Incidentes
                </h3>
                <Card className={`border p-4 ${getDimensionColor(selectedStudent.profile.conductual.status)}`}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs opacity-75">Frecuencia</p>
                      <p className="font-semibold capitalize">{selectedStudent.profile.conductual.frecuencia}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75">Intensidad</p>
                      <p className="font-semibold capitalize">{selectedStudent.profile.conductual.intensidad}</p>
                    </div>
                  </div>
                </Card>
                <div className="space-y-2">
                  {selectedStudent.profile.conductual.historial.map((incident, idx) => (
                    <Card key={idx} className="border-stone-700 bg-stone-700/50 p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <p className="text-white font-medium text-sm">{incident.tipo}</p>
                          <p className="text-stone-400 text-xs mt-1">{incident.fecha}</p>
                        </div>
                        <Badge className={`text-xs ${getSeverityColor(incident.severidad)}`}>
                          {incident.severidad.charAt(0).toUpperCase() + incident.severidad.slice(1)}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* DIMENSIÓN EMOCIONAL */}
              <div className="space-y-3 mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                  Dimensión Emocional - Tendencia
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="border-stone-700 bg-stone-700/50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-stone-400">Estabilidad</p>
                      {getTrendIcon(selectedStudent.profile.emocional.tendencia)}
                    </div>
                    <p className="text-2xl font-bold text-white">{selectedStudent.profile.emocional.score}</p>
                    <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${getProgressBarColor(selectedStudent.profile.emocional.score)}`}
                        style={{ width: `${selectedStudent.profile.emocional.score}%` }}
                      ></div>
                    </div>
                  </Card>
                  <Card className="border-stone-700 bg-stone-700/50 p-4">
                    <p className="text-xs text-stone-400 mb-2">Capacidad Empática</p>
                    <p className="text-2xl font-bold text-white">
                      {selectedStudent.profile.emocional.capacidadEmpatica}
                    </p>
                    <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${getProgressBarColor(selectedStudent.profile.emocional.capacidadEmpatica)}`}
                        style={{ width: `${selectedStudent.profile.emocional.capacidadEmpatica}%` }}
                      ></div>
                    </div>
                  </Card>
                  <Card className="border-stone-700 bg-stone-700/50 p-4">
                    <p className="text-xs text-stone-400 mb-2">Autocontrol</p>
                    <p className="text-2xl font-bold text-white">{selectedStudent.profile.emocional.autocontrol}</p>
                    <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${getProgressBarColor(selectedStudent.profile.emocional.autocontrol)}`}
                        style={{ width: `${selectedStudent.profile.emocional.autocontrol}%` }}
                      ></div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* DIMENSIÓN SOCIAL */}
              <div className="space-y-3 mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  Dimensión Social
                </h3>
                <Card className={`border p-4 ${getDimensionColor(selectedStudent.profile.social.status)}`}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs opacity-75">Rol en Grupo</p>
                      <p className="font-semibold capitalize text-sm">
                        {selectedStudent.profile.social.rol.replace("_", " ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75">Rel. Positivas</p>
                      <p className="font-semibold">{selectedStudent.profile.social.relacionesPositivas}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75">Rel. Conflictivas</p>
                      <p className="font-semibold">{selectedStudent.profile.social.relacionesConflictivas}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-xs opacity-75">Conducta Dominante</p>
                      <p className="font-semibold">{selectedStudent.profile.social.dominancia ? "Sí" : "No"}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* DIMENSIÓN COGNITIVA */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                  Dimensión Cognitiva
                </h3>
                <Card className="border-stone-700 bg-stone-700/50 p-4 space-y-4">
                  <div>
                    <p className="text-xs text-stone-400 mb-2">Percepción Docente</p>
                    <Badge
                      className={`text-xs ${
                        selectedStudent.profile.cognitivo.percepcionDocente === "minimiza"
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : selectedStudent.profile.cognitivo.percepcionDocente === "neutral"
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            : "bg-green-500/20 text-green-400 border-green-500/30"
                      } border capitalize`}
                    >
                      {selectedStudent.profile.cognitivo.percepcionDocente}
                    </Badge>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-stone-400">Nivel de Justificación</p>
                      {getTrendIcon(selectedStudent.profile.cognitivo.cambios)}
                    </div>
                    <p className="text-lg font-bold text-white">
                      {selectedStudent.profile.cognitivo.nivelJustificacion}%
                    </p>
                    <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${getProgressBarColor(selectedStudent.profile.cognitivo.nivelJustificacion, true)}`}
                        style={{ width: `${selectedStudent.profile.cognitivo.nivelJustificacion}%` }}
                      ></div>
                    </div>
                  </div>

                  {selectedStudent.profile.cognitivo.creenciasAsociadas.length > 0 && (
                    <div>
                      <p className="text-xs text-stone-400 mb-2">Creencias Asociadas</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedStudent.profile.cognitivo.creenciasAsociadas.map((creencia, idx) => (
                          <Badge key={idx} className="bg-slate-600 text-stone-300 text-xs">
                            {creencia}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </Card>
          </div>
        ) : (
          // LISTA DE ESTUDIANTES
          <Card className="border-stone-700 bg-stone-800/50 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">
              Estudiantes - {filters.level.charAt(0).toUpperCase() + filters.level.slice(1)} {filters.grade}° Sección{" "}
              {filters.section}
            </h3>

            <div className="space-y-3">
              {filteredStudents.map((student) => {
                const riskLevel = getRiskLevel(student.profile)
                return (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className="p-4 sm:p-5 rounded-lg bg-stone-700/50 border border-stone-600 hover:border-orange-500 hover:bg-stone-700/70 transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-white group-hover:text-orange-300 transition-colors">
                          {student.name}
                        </p>
                        <p className="text-xs text-stone-400 mt-1">
                          Actualizado: {new Date(student.lastUpdated).toLocaleDateString("es-ES")}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge className={`${getDimensionColor(student.profile.conductual.status)} border text-xs`}>
                          {student.profile.conductual.incidentes} incidentes
                        </Badge>
                        <Badge
                          className={`border text-xs ${
                            riskLevel === "CRÍTICO"
                              ? "bg-red-500/20 text-red-400 border-red-500/30"
                              : riskLevel === "ALTO"
                                ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                                : riskLevel === "MEDIO"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  : "bg-green-500/20 text-green-400 border-green-500/30"
                          }`}
                        >
                          {riskLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        )}
      </div>

      
    </DashboardLayout>
  )
}
