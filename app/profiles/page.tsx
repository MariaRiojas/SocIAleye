"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DashboardFilters } from "@/components/dashboard/dashboard-filters"
import { StudentProfileModal } from "@/components/profiles/student-profile-modal"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AIChatbot } from "@/components/ai-chatbot/ai-chatbot"
import { getRiskLevel, getRiskColor, getStatusIndicatorColor } from "@/lib/student-utils"
import { StudentProfile } from "@/lib/student-types"

const STUDENT_PROFILES = [
  {
    id: "1",
    name: "Carlos López",
    profile: {
      conductual: {
        status: "red" as const,
        incidentes: 5,
        frecuencia: "alta" as const,
        intensidad: "media" as const,
      },
      emocional: {
        score: 35,
        capacidadEmpatica: 25,
        autocontrol: 30,
      },
      social: {
        status: "red" as const,
        rol: "potencial_agresor" as const,
        relacionesPositivas: 2,
        relacionesConflictivas: 8,
        dominancia: true,
      },
      cognitivo: {
        percepcionDocente: "minimiza" as const,
        nivelJustificacion: 75,
        creenciasAsociadas: ["Sentido de superioridad", "Justificación por provocación"],
      },
    },
  },
  {
    id: "2",
    name: "Juan Martínez",
    profile: {
      conductual: {
        status: "yellow" as const,
        incidentes: 2,
        frecuencia: "media" as const,
        intensidad: "baja" as const,
      },
      emocional: {
        score: 55,
        capacidadEmpatica: 50,
        autocontrol: 60,
      },
      social: {
        status: "yellow" as const,
        rol: "lider" as const,
        relacionesPositivas: 10,
        relacionesConflictivas: 3,
        dominancia: false,
      },
      cognitivo: {
        percepcionDocente: "neutral" as const,
        nivelJustificacion: 40,
        creenciasAsociadas: ["Necesidad de atención"],
      },
    },
  },
  {
    id: "3",
    name: "Diego Sánchez",
    profile: {
      conductual: {
        status: "red" as const,
        incidentes: 7,
        frecuencia: "alta" as const,
        intensidad: "alta" as const,
      },
      emocional: {
        score: 25,
        capacidadEmpatica: 15,
        autocontrol: 20,
      },
      social: {
        status: "red" as const,
        rol: "potencial_agresor" as const,
        relacionesPositivas: 1,
        relacionesConflictivas: 11,
        dominancia: true,
      },
      cognitivo: {
        percepcionDocente: "minimiza" as const,
        nivelJustificacion: 85,
        creenciasAsociadas: ["Superioridad", "Culpa víctima", "Derecho al control"],
      },
    },
  },
  {
    id: "4",
    name: "Felipe Rodríguez",
    profile: {
      conductual: {
        status: "green" as const,
        incidentes: 0,
        frecuencia: "baja" as const,
        intensidad: "baja" as const,
      },
      emocional: {
        score: 85,
        capacidadEmpatica: 90,
        autocontrol: 88,
      },
      social: {
        status: "green" as const,
        rol: "puente" as const,
        relacionesPositivas: 14,
        relacionesConflictivas: 0,
        dominancia: false,
      },
      cognitivo: {
        percepcionDocente: "rechaza" as const,
        nivelJustificacion: 5,
        creenciasAsociadas: [],
      },
    },
  },
]

export default function ProfilesPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [filters, setFilters] = useState({
    level: "primaria",
    grade: "1",
    section: "A",
  })
  const [selectedStudent, setSelectedStudent] = useState<(typeof STUDENT_PROFILES)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null


  const openStudentProfile = (student: (typeof STUDENT_PROFILES)[0]) => {
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

  const chatbotContext = `Perfiles de Estudiantes - ${filters.level === "primaria" ? "Primaria" : "Secundaria"} ${filters.grade}° ${filters.section}`

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Perfiles de Estudiantes</h1>
          <p className="text-slate-400 mt-1 sm:mt-2 text-sm sm:text-base">
            Análisis detallado de riesgo conductual, emocional, social y cognitivo
          </p>
        </div>

        <DashboardFilters filters={filters} onFiltersChange={setFilters} />

        <Card className="border-slate-700 bg-slate-800/50 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">
            Estudiantes - {filters.level.charAt(0).toUpperCase() + filters.level.slice(1)} {filters.grade}° Sección{" "}
            {filters.section}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {STUDENT_PROFILES.map((student) => {
              const riskLevel = getRiskLevel(student.profile)
              return (
                <div
                  key={student.id}
                  onClick={() => openStudentProfile(student)}
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
                    Click para ver perfil detallado
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
      </div>

      <StudentProfileModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedStudent(null)
        }}
      />

      <AIChatbot pageContext={chatbotContext} />
    </DashboardLayout>
  )
}
