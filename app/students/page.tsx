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
import { Download, TrendingUp, TrendingDown, X } from "lucide-react"
import {
  getRiskLevel,
  getRiskColor,
  getDimensionColor,
  getProgressBarColor,
  getSeverityColor,
  getStatusIndicatorColor,
} from "@/lib/student-utils"
import { StudentReportData } from "@/lib/student-types"
import { StudentSociometricMap } from "@/components/sociometric/student-sociometric-map"

// Datos simulados - combina perfiles y reportes
const STUDENT_DATA: StudentReportData[] = [
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
  {
    id: "4",
    name: "Felipe Rodríguez",
    grade: "1",
    section: "A",
    lastUpdated: "2025-01-15",
    profile: {
      conductual: {
        status: "green" as const,
        incidentes: 0,
        frecuencia: "baja" as const,
        intensidad: "baja" as const,
        historial: [],
      },
      emocional: {
        score: 85,
        capacidadEmpatica: 90,
        autocontrol: 88,
        tendencia: "subiendo" as const,
        historico: [80, 82, 84, 85, 85],
      },
      social: {
        status: "green" as const,
        rol: "puente" as const,
        relacionesPositivas: 14,
        relacionesConflictivas: 0,
        dominancia: false,
        gruposInfluencia: ["Todos"],
      },
      cognitivo: {
        percepcionDocente: "rechaza" as const,
        nivelJustificacion: 5,
        creenciasAsociadas: [],
        cambios: "mejorando" as const,
      },
    },
  },
]

export default function StudentsPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [filters, setFilters] = useState({
    level: "primaria",
    grade: "1",
    section: "A",
  })
  const [selectedStudent, setSelectedStudent] = useState<StudentReportData | null>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  const filteredStudents = STUDENT_DATA.filter((s) => s.grade === filters.grade && s.section === filters.section)

  const getTrendIcon = (tendencia: string) => {
    if (tendencia === "subiendo" || tendencia === "mejorando") {
      return <TrendingUp className="w-4 h-4 text-green-400" />
    }
    return <TrendingDown className="w-4 h-4 text-red-400" />
  }

  const formatStudentName = (level: string) => {
    return level === "primaria" ? "Primaria" : "Secundaria"
  }

  const chatbotContext = `Gestión de Estudiantes - ${formatStudentName(filters.level)} ${filters.grade}° ${filters.section}`

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Gestión de Estudiantes</h1>
          <p className="text-slate-400 mt-1 sm:mt-2 text-sm sm:text-base">
            Vista consolidada: perfiles, análisis detallado y sociometría de estudiantes
          </p>
        </div>

        <DashboardFilters filters={filters} onFiltersChange={setFilters} />

        {selectedStudent ? (
          // VISTA DETALLADA CONSOLIDADA
          <div className="space-y-4 sm:space-y-6">
            <Button
              onClick={() => setSelectedStudent(null)}
              variant="outline"
              className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600 flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Volver a Lista
            </Button>

            {/* HEADER DEL ESTUDIANTE */}
            <Card className="border-slate-700 bg-gradient-to-r from-slate-800/50 to-slate-800/30 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">{selectedStudent.name}</h2>
                  <p className="text-slate-400 text-sm mt-1">
                    {formatStudentName(filters.level)} {selectedStudent.grade}° - Sección {selectedStudent.section}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    Actualizado: {new Date(selectedStudent.lastUpdated).toLocaleDateString("es-ES")}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge className={`${getRiskColor(getRiskLevel(selectedStudent.profile))} border text-sm`}>
                    Riesgo: {getRiskLevel(selectedStudent.profile)}
                  </Badge>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <Download className="w-4 h-4" />
                    Exportar
                  </Button>
                </div>
              </div>
            </Card>

            {/* GRID DE MÉTRICAS PRINCIPALES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              <Card className="border-slate-700 bg-slate-700/50 p-3 sm:p-4">
                <p className="text-xs text-slate-400 mb-1">Incidentes</p>
                <p className="text-2xl font-bold text-white">{selectedStudent.profile.conductual.incidentes}</p>
              </Card>
              <Card className="border-slate-700 bg-slate-700/50 p-3 sm:p-4">
                <p className="text-xs text-slate-400 mb-1">Emocional</p>
                <p className="text-2xl font-bold text-white">{selectedStudent.profile.emocional.score}</p>
              </Card>
              <Card className="border-slate-700 bg-slate-700/50 p-3 sm:p-4">
                <p className="text-xs text-slate-400 mb-1">Empatía</p>
                <p className="text-2xl font-bold text-white">{selectedStudent.profile.emocional.capacidadEmpatica}</p>
              </Card>
              <Card className="border-slate-700 bg-slate-700/50 p-3 sm:p-4">
                <p className="text-xs text-slate-400 mb-1">Justificación</p>
                <p className="text-2xl font-bold text-white">
                  {selectedStudent.profile.cognitivo.nivelJustificacion}%
                </p>
              </Card>
            </div>

            {/* SECCIÓN 1: DIMENSIÓN CONDUCTUAL */}
            <Card className="border-slate-700 bg-slate-800/50 p-4 sm:p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
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
                {selectedStudent.profile.conductual.historial && selectedStudent.profile.conductual.historial.length > 0 ? (
                  selectedStudent.profile.conductual.historial.map((incident, idx) => (
                    <Card key={idx} className="border-slate-700 bg-slate-700/50 p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <p className="text-white font-medium text-sm">{incident.tipo}</p>
                          <p className="text-slate-400 text-xs mt-1">{incident.fecha}</p>
                        </div>
                        <Badge className={`text-xs ${getSeverityColor(incident.severidad)}`}>
                          {incident.severidad.charAt(0).toUpperCase() + incident.severidad.slice(1)}
                        </Badge>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="border-slate-700 bg-slate-700/50 p-3 sm:p-4">
                    <p className="text-slate-400 text-sm">Sin incidentes registrados</p>
                  </Card>
                )}
              </div>
            </Card>

            {/* SECCIÓN 2: DIMENSIÓN EMOCIONAL */}
            <Card className="border-slate-700 bg-slate-800/50 p-4 sm:p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                Dimensión Emocional - Tendencia
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="border-slate-700 bg-slate-700/50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-slate-400">Estabilidad</p>
                    {selectedStudent.profile.emocional.tendencia && getTrendIcon(selectedStudent.profile.emocional.tendencia)}
                  </div>
                  <p className="text-2xl font-bold text-white">{selectedStudent.profile.emocional.score}</p>
                  <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                    <div
                      className={getProgressBarColor(selectedStudent.profile.emocional.score)}
                      style={{ width: `${selectedStudent.profile.emocional.score}%` }}
                    ></div>
                  </div>
                </Card>
                <Card className="border-slate-700 bg-slate-700/50 p-4">
                  <p className="text-xs text-slate-400 mb-2">Capacidad Empática</p>
                  <p className="text-2xl font-bold text-white">{selectedStudent.profile.emocional.capacidadEmpatica}</p>
                  <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                    <div
                      className={getProgressBarColor(selectedStudent.profile.emocional.capacidadEmpatica)}
                      style={{ width: `${selectedStudent.profile.emocional.capacidadEmpatica}%` }}
                    ></div>
                  </div>
                </Card>
                <Card className="border-slate-700 bg-slate-700/50 p-4">
                  <p className="text-xs text-slate-400 mb-2">Autocontrol</p>
                  <p className="text-2xl font-bold text-white">{selectedStudent.profile.emocional.autocontrol}</p>
                  <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                    <div
                      className={getProgressBarColor(selectedStudent.profile.emocional.autocontrol)}
                      style={{ width: `${selectedStudent.profile.emocional.autocontrol}%` }}
                    ></div>
                  </div>
                </Card>
              </div>
            </Card>

            {/* SECCIÓN 3: POSICIÓN SOCIOMÉTRICA - FULL WIDTH */}
            <StudentSociometricMap
              studentId={selectedStudent.id}
              studentName={selectedStudent.name}
              filters={filters}
            />

            {/* SECCIÓN 4: DIMENSIÓN SOCIAL + DIMENSIÓN COGNITIVA */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* DIMENSIÓN SOCIAL */}
              <Card className="border-slate-700 bg-slate-800/50 p-4 sm:p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  Dimensión Social
                </h3>
                <Card className={`border p-4 ${getDimensionColor(selectedStudent.profile.social.status)}`}>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
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
                    <div>
                      <p className="text-xs opacity-75">Conducta Dominante</p>
                      <p className="font-semibold">{selectedStudent.profile.social.dominancia ? "Sí" : "No"}</p>
                    </div>
                  </div>
                </Card>

                {selectedStudent.profile.social.gruposInfluencia && selectedStudent.profile.social.gruposInfluencia.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-400 mb-2">Grupos de Influencia</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.profile.social.gruposInfluencia.map((grupo, idx) => (
                        <Badge key={idx} className="bg-blue-500/20 text-blue-300 border-blue-500/30 border">
                          {grupo}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>

              {/* DIMENSIÓN COGNITIVA */}
              <Card className="border-slate-700 bg-slate-800/50 p-4 sm:p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                  Dimensión Cognitiva
                </h3>
                <Card className="border-slate-700 bg-slate-700/50 p-4 space-y-4">
                  <div>
                    <p className="text-xs text-slate-400 mb-2">Percepción Docente</p>
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
                      <p className="text-xs text-slate-400">Nivel de Justificación</p>
                      {selectedStudent.profile.cognitivo.cambios && getTrendIcon(selectedStudent.profile.cognitivo.cambios)}
                    </div>
                    <p className="text-lg font-bold text-white">{selectedStudent.profile.cognitivo.nivelJustificacion}%</p>
                    <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                      <div
                        className={getProgressBarColor(selectedStudent.profile.cognitivo.nivelJustificacion, true)}
                        style={{ width: `${selectedStudent.profile.cognitivo.nivelJustificacion}%` }}
                      ></div>
                    </div>
                  </div>

                  {selectedStudent.profile.cognitivo.creenciasAsociadas.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-400 mb-2">Creencias Asociadas</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedStudent.profile.cognitivo.creenciasAsociadas.map((creencia, idx) => (
                          <Badge key={idx} className="bg-slate-600 text-slate-300 text-xs">
                            {creencia}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </Card>
            </div>
          </div>
        ) : (
          // VISTA DE LISTA DE ESTUDIANTES
          <>
            <Card className="border-slate-700 bg-slate-800/50 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">
                Estudiantes - {formatStudentName(filters.level)} {filters.grade}° Sección {filters.section}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {filteredStudents.map((student) => {
                  const riskLevel = getRiskLevel(student.profile)
                  return (
                    <div
                      key={student.id}
                      onClick={() => setSelectedStudent(student)}
                      className="p-4 sm:p-5 rounded-lg bg-slate-700/50 border border-slate-600 hover:border-slate-500 hover:bg-slate-700/70 transition-all cursor-pointer group"
                    >
                      <div className="mb-3">
                        <p className="font-semibold text-white text-sm sm:text-base group-hover:text-blue-300 transition-colors">
                          {student.name}
                        </p>
                        <Badge className={`${getRiskColor(riskLevel)} border mt-2 text-xs`}>Riesgo: {riskLevel}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-slate-400">Conducta</p>
                          <div className={`w-3 h-3 rounded-full ${getStatusIndicatorColor(student.profile.conductual.status)}`}></div>
                        </div>
                        <div>
                          <p className="text-slate-400">Social</p>
                          <div className={`w-3 h-3 rounded-full ${getStatusIndicatorColor(student.profile.social.status)}`}></div>
                        </div>
                        <div>
                          <p className="text-slate-400">Emocional</p>
                          <div
                            className={`w-3 h-3 rounded-full ${
                              student.profile.emocional.capacidadEmpatica < 40
                                ? getStatusIndicatorColor("red")
                                : student.profile.emocional.capacidadEmpatica < 70
                                  ? getStatusIndicatorColor("yellow")
                                  : getStatusIndicatorColor("green")
                            }`}
                          ></div>
                        </div>
                        <div>
                          <p className="text-slate-400">Cognitivo</p>
                          <div
                            className={`w-3 h-3 rounded-full ${
                              student.profile.cognitivo.percepcionDocente === "minimiza"
                                ? getStatusIndicatorColor("red")
                                : student.profile.cognitivo.percepcionDocente === "neutral"
                                  ? getStatusIndicatorColor("yellow")
                                  : getStatusIndicatorColor("green")
                            }`}
                          ></div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-600">
                        Click para ver perfil completo
                      </p>
                    </div>
                  )
                })}
              </div>
            </Card>

            <Card className="border-slate-700 bg-slate-800/50 p-4 sm:p-6">
              <h4 className="text-sm sm:text-base font-semibold text-white mb-3">Leyenda de Dimensiones</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-slate-300">Conductual - Registro de incidentes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span className="text-slate-300">Emocional - Autoevaluación 0-100</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-slate-300">Social - Interacciones académicas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-slate-300">Cognitivo - Percepción docente</span>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      <AIChatbot pageContext={chatbotContext} />
    </DashboardLayout>
  )
}
