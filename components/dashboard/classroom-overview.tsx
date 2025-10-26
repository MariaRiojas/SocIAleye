"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ClassroomOverviewProps {
  filters: {
    level: string
    grade: string
    section: string
  }
}

export function ClassroomOverview({ filters }: ClassroomOverviewProps) {
  const students = [
    { id: "1", name: "Ana García", status: "normal", interactions: 12 },
    { id: "2", name: "Carlos López", status: "warning", interactions: 3 },
    { id: "3", name: "María Rodríguez", status: "normal", interactions: 15 },
    { id: "4", name: "Juan Martínez", status: "alert", interactions: 1 },
    { id: "5", name: "Sofia Pérez", status: "normal", interactions: 14 },
    { id: "6", name: "Diego Sánchez", status: "normal", interactions: 11 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "alert":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-green-500/20 text-green-400 border-green-500/30"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "alert":
        return "Riesgo Alto"
      case "warning":
        return "Riesgo Medio"
      default:
        return "Normal"
    }
  }

  return (
    <Card className="border-slate-700 bg-slate-800/50 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
        <span className="block sm:inline">Resumen de Estudiantes - </span>
        <span className="block sm:inline mt-1 sm:mt-0">
          {filters.level.charAt(0).toUpperCase() + filters.level.slice(1)} {filters.grade}°
          Sección {filters.section}
        </span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="p-3 sm:p-4 rounded-lg bg-slate-700/50 border border-slate-600 hover:border-slate-500 transition-colors"
          >
            <div className="flex items-start justify-between mb-2 gap-2">
              <p className="font-medium text-white text-sm sm:text-base flex-1 min-w-0 truncate">
                {student.name}
              </p>
              <Badge className={`${getStatusColor(student.status)} border text-xs flex-shrink-0`}>
                {getStatusLabel(student.status)}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Interacciones: <span className="font-semibold">{student.interactions}</span>
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}