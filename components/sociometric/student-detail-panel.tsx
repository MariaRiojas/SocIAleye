"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

interface StudentDetailPanelProps {
  studentId: string
  filters: {
    level: string
    grade: string
    section: string
  }
}

export function StudentDetailPanel({ studentId, filters }: StudentDetailPanelProps) {
  // Datos simulados del estudiante
  const studentData: Record<string, any> = {
    "1": {
      name: "Ana García",
      status: "normal",
      choicesReceived: 12,
      choicesEmitted: 10,
      rejections: 1,
      academicScore: 8.5,
      emotionalState: "stable",
      alerts: [],
    },
    "2": {
      name: "Carlos López",
      status: "warning",
      choicesReceived: 3,
      choicesEmitted: 2,
      rejections: 8,
      academicScore: 6.2,
      emotionalState: "anxious",
      alerts: ["Aislamiento progresivo", "Rechazos concentrados"],
    },
    "3": {
      name: "María Rodríguez",
      status: "normal",
      choicesReceived: 15,
      choicesEmitted: 14,
      rejections: 0,
      academicScore: 9.1,
      emotionalState: "stable",
      alerts: [],
    },
    "4": {
      name: "Juan Martínez",
      status: "alert",
      choicesReceived: 1,
      choicesEmitted: 0,
      rejections: 12,
      academicScore: 5.0,
      emotionalState: "depressed",
      alerts: ["Aislamiento severo", "Cambio emocional brusco", "Bajo rendimiento"],
    },
    "5": {
      name: "Sofia Pérez",
      status: "normal",
      choicesReceived: 14,
      choicesEmitted: 13,
      rejections: 1,
      academicScore: 8.8,
      emotionalState: "stable",
      alerts: [],
    },
    "6": {
      name: "Diego Sánchez",
      status: "warning",
      choicesReceived: 5,
      choicesEmitted: 4,
      rejections: 6,
      academicScore: 6.8,
      emotionalState: "withdrawn",
      alerts: ["Aislamiento progresivo"],
    },
  }

  const student = studentData[studentId]

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

  return (
    <div className="space-y-4">
      <Card className="border-slate-700 bg-slate-800/50 p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white">{student.name}</h3>
            <Badge className={`mt-2 ${getStatusColor(student.status)} border`}>
              {student.status === "alert" ? "Riesgo Alto" : student.status === "warning" ? "Riesgo Medio" : "Normal"}
            </Badge>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Elecciones recibidas</span>
              <span className="text-white font-semibold">{student.choicesReceived}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Elecciones emitidas</span>
              <span className="text-white font-semibold">{student.choicesEmitted}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Rechazos recibidos</span>
              <span className="text-red-400 font-semibold">{student.rejections}</span>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Rendimiento académico</span>
              <span className="text-white font-semibold">{student.academicScore}/10</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Estado emocional</span>
              <span className="text-white font-semibold capitalize">{student.emotionalState}</span>
            </div>
          </div>
        </div>
      </Card>

      {student.alerts.length > 0 && (
        <Card className="border-red-500/30 bg-red-500/10 p-6">
          <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Alertas Tempranas
          </h4>
          <ul className="space-y-2">
            {student.alerts.map((alert: string, i: number) => (
              <li key={i} className="text-sm text-red-300 flex gap-2">
                <span>•</span>
                <span>{alert}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
