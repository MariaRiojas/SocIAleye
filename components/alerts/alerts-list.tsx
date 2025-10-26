"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, CheckCircle } from "lucide-react"

interface AlertsListProps {
  filters: {
    level: string
    grade: string
    section: string
    severity: string
    status: string
  }
}

export function AlertsList({ filters }: AlertsListProps) {
  const alerts = [
    {
      id: "1",
      student: "Juan Martínez",
      type: "Aislamiento severo",
      severity: "high",
      status: "active",
      date: "Hoy 14:30",
      description: "Estudiante ha sido rechazado por 12 compañeros en últimas 2 semanas",
    },
    {
      id: "2",
      student: "Carlos López",
      type: "Aislamiento progresivo",
      severity: "medium",
      status: "active",
      date: "Hoy 10:15",
      description: "Disminución en interacciones sociales del 40% en último mes",
    },
    {
      id: "3",
      student: "Diego Sánchez",
      type: "Cambio emocional",
      severity: "medium",
      status: "monitoring",
      date: "Ayer 16:45",
      description: "Cambio en patrones de comportamiento detectado por NLP",
    },
    {
      id: "4",
      student: "María Rodríguez",
      type: "Conflicto grupal",
      severity: "low",
      status: "resolved",
      date: "Hace 3 días",
      description: "Tensión resuelta entre subgrupos de la clase",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      case "monitoring":
        return <Clock className="w-4 h-4 text-yellow-400" />
      default:
        return <CheckCircle className="w-4 h-4 text-green-400" />
    }
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Card key={alert.id} className="border-slate-700 bg-slate-800/50 p-6 hover:border-slate-600 transition">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3">
              {getStatusIcon(alert.status)}
              <div>
                <h4 className="font-semibold text-white">{alert.student}</h4>
                <p className="text-sm text-slate-400 mt-1">{alert.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${getSeverityColor(alert.severity)} border`}>
                {alert.severity === "high" ? "Alta" : alert.severity === "medium" ? "Media" : "Baja"}
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                {alert.status === "active" ? "Activa" : alert.status === "monitoring" ? "Monitoreo" : "Resuelta"}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-slate-300 mb-3">{alert.description}</p>
          <p className="text-xs text-slate-500">{alert.date}</p>
        </Card>
      ))}
    </div>
  )
}
