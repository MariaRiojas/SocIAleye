"use client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { getRiskLevel, getRiskColor, getDimensionColor, getProgressBarColor } from "@/lib/student-utils"
import { StudentProfile } from "@/lib/student-types"

interface StudentProfileModalProps {
  student: {
    id: string
    name: string
    profile: StudentProfile
  }
  isOpen: boolean
  onClose: () => void
}

export function StudentProfileModal({ student, isOpen, onClose }: StudentProfileModalProps) {
  if (!isOpen) return null

  const riskLevel = getRiskLevel(student.profile)

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="border-slate-700 bg-slate-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{student.name}</h2>
            <Badge className={`mt-2 ${getRiskColor(riskLevel)} border`}>
              Riesgo General: {riskLevel}
            </Badge>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* DIMENSIÓN CONDUCTUAL */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              Dimensión Conductual
            </h3>
            <Card className={`border p-4 ${getDimensionColor(student.profile.conductual.status)}`}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs opacity-75">Estado</p>
                  <p className="font-semibold capitalize">
                    {student.profile.conductual.status === "red"
                      ? "Reincidencia/Agresión"
                      : student.profile.conductual.status === "yellow"
                        ? "Conductas Observadas"
                        : "Sin Incidentes"}
                  </p>
                </div>
                <div>
                  <p className="text-xs opacity-75">Incidentes</p>
                  <p className="font-semibold">{student.profile.conductual.incidentes}</p>
                </div>
                <div>
                  <p className="text-xs opacity-75">Frecuencia</p>
                  <p className="font-semibold capitalize">{student.profile.conductual.frecuencia}</p>
                </div>
                <div>
                  <p className="text-xs opacity-75">Intensidad</p>
                  <p className="font-semibold capitalize">{student.profile.conductual.intensidad}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* DIMENSIÓN EMOCIONAL */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              Dimensión Emocional
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="border-slate-700 bg-slate-700/50 p-4">
                <p className="text-xs text-slate-400 mb-2">Estabilidad Emocional (0-100)</p>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">{student.profile.emocional.score}</p>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressBarColor(student.profile.emocional.score)}`}
                      style={{ width: `${student.profile.emocional.score}%` }}
                    ></div>
                  </div>
                </div>
              </Card>

              <Card className="border-slate-700 bg-slate-700/50 p-4">
                <p className="text-xs text-slate-400 mb-2">Capacidad Empática (0-100)</p>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">{student.profile.emocional.capacidadEmpatica}</p>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressBarColor(student.profile.emocional.capacidadEmpatica)}`}
                      style={{ width: `${student.profile.emocional.capacidadEmpatica}%` }}
                    ></div>
                  </div>
                </div>
              </Card>

              <Card className="border-slate-700 bg-slate-700/50 p-4">
                <p className="text-xs text-slate-400 mb-2">Autocontrol (0-100)</p>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">{student.profile.emocional.autocontrol}</p>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressBarColor(student.profile.emocional.autocontrol)}`}
                      style={{ width: `${student.profile.emocional.autocontrol}%` }}
                    ></div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* DIMENSIÓN SOCIAL */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              Dimensión Social
            </h3>
            <Card className={`border p-4 ${getDimensionColor(student.profile.social.status)}`}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs opacity-75">Rol en Grupo</p>
                  <p className="font-semibold capitalize">{student.profile.social.rol.replace("_", " ")}</p>
                </div>
                <div>
                  <p className="text-xs opacity-75">Relaciones Positivas</p>
                  <p className="font-semibold">{student.profile.social.relacionesPositivas}</p>
                </div>
                <div>
                  <p className="text-xs opacity-75">Relaciones Conflictivas</p>
                  <p className="font-semibold">{student.profile.social.relacionesConflictivas}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-xs opacity-75">Conducta Dominante</p>
                  <p className="font-semibold">{student.profile.social.dominancia ? "Sí" : "No"}</p>
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
            <Card className="border-slate-700 bg-slate-700/50 p-4 space-y-4">
              <div>
                <p className="text-xs text-slate-400 mb-2">Percepción Docente</p>
                <Badge
                  className={`${
                    student.profile.cognitivo.percepcionDocente === "minimiza"
                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                      : student.profile.cognitivo.percepcionDocente === "neutral"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        : "bg-green-500/20 text-green-400 border-green-500/30"
                  } border capitalize`}
                >
                  {student.profile.cognitivo.percepcionDocente}
                </Badge>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-2">Nivel de Justificación del Acoso (0-100)</p>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-white">{student.profile.cognitivo.nivelJustificacion}%</p>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressBarColor(student.profile.cognitivo.nivelJustificacion, true)}`}
                      style={{ width: `${student.profile.cognitivo.nivelJustificacion}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {student.profile.cognitivo.creenciasAsociadas.length > 0 && (
                <div>
                  <p className="text-xs text-slate-400 mb-2">Creencias Asociadas al Control/Dominio</p>
                  <div className="flex flex-wrap gap-2">
                    {student.profile.cognitivo.creenciasAsociadas.map((creencia, idx) => (
                      <Badge key={idx} className="bg-slate-600 text-slate-300">
                        {creencia}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>

        <div className="p-6 border-t border-slate-700 flex justify-end gap-3">
          <Button onClick={onClose} className="bg-slate-700 hover:bg-slate-600 text-white">
            Cerrar
          </Button>
        </div>
      </Card>
    </div>
  )
}
