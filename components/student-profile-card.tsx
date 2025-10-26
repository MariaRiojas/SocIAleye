"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Heart, X } from "lucide-react"

interface StudentProfileProps {
  name: string
  acceptanceLevel: "high" | "medium" | "low"
  choicesReceived: number
  choicesEmitted: number
  rejectionsReceived: number
  emotionalState: "stable" | "concerning" | "critical"
  academicPerformance: "excellent" | "good" | "average" | "poor"
  alerts: Array<{
    type: "isolation" | "rejection" | "behavioral" | "emotional"
    message: string
    severity: "low" | "medium" | "high"
  }>
}

export function StudentProfileCard({
  name,
  acceptanceLevel,
  choicesReceived,
  choicesEmitted,
  rejectionsReceived,
  emotionalState,
  academicPerformance,
  alerts,
}: StudentProfileProps) {
  const getAcceptanceColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getEmotionalColor = (state: string) => {
    switch (state) {
      case "stable":
        return "bg-green-500/20 text-green-400"
      case "concerning":
        return "bg-yellow-500/20 text-yellow-400"
      case "critical":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-500/50 bg-red-500/10"
      case "medium":
        return "border-yellow-500/50 bg-yellow-500/10"
      case "low":
        return "border-orange-500/50 bg-orange-500/10"
      default:
        return "border-border"
    }
  }

  return (
    <Card className="border-border bg-background p-8 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">{name}</h2>
        <div className="flex flex-wrap gap-2">
          <Badge className={`text-sm ${getAcceptanceColor(acceptanceLevel)}`}>
            {acceptanceLevel === "high" && "Alta aceptación"}
            {acceptanceLevel === "medium" && "Aceptación media"}
            {acceptanceLevel === "low" && "Baja aceptación"}
          </Badge>
          <Badge className={`text-sm ${getEmotionalColor(emotionalState)}`}>
            {emotionalState === "stable" && "Estado emocional estable"}
            {emotionalState === "concerning" && "Estado preocupante"}
            {emotionalState === "critical" && "Estado crítico"}
          </Badge>
          <Badge variant="outline" className="text-sm">
            {academicPerformance === "excellent" && "Rendimiento excelente"}
            {academicPerformance === "good" && "Buen rendimiento"}
            {academicPerformance === "average" && "Rendimiento promedio"}
            {academicPerformance === "poor" && "Rendimiento bajo"}
          </Badge>
        </div>
      </div>

      {/* Sociometric Summary */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-card/50 border border-border/50 rounded-lg">
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold text-green-400">{choicesReceived}</div>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Heart className="w-3 h-3" />
            Elecciones recibidas
          </p>
        </div>
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold text-blue-400">{choicesEmitted}</div>
          <p className="text-xs text-muted-foreground">Elecciones emitidas</p>
        </div>
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold text-red-400">{rejectionsReceived}</div>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <X className="w-3 h-3" />
            Rechazos recibidos
          </p>
        </div>
      </div>

      {/* Early Alerts */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-400" />
          Alertas Tempranas
        </h3>
        {alerts.length > 0 ? (
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className={`p-4 rounded-lg border ${getAlertColor(alert.severity)} space-y-2`}>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">
                      {alert.type === "isolation" && "Aislamiento progresivo"}
                      {alert.type === "rejection" && "Rechazos concentrados"}
                      {alert.type === "behavioral" && "Cambio de comportamiento"}
                      {alert.type === "emotional" && "Cambio emocional"}
                    </p>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      alert.severity === "high"
                        ? "border-red-500/50 text-red-400"
                        : alert.severity === "medium"
                          ? "border-yellow-500/50 text-yellow-400"
                          : "border-orange-500/50 text-orange-400"
                    }`}
                  >
                    {alert.severity === "high" && "Alto"}
                    {alert.severity === "medium" && "Medio"}
                    {alert.severity === "low" && "Bajo"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No hay alertas activas para este estudiante.</p>
        )}
      </div>

      {/* Recommendations */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg space-y-2">
        <p className="font-semibold text-sm text-blue-400">Recomendaciones</p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Realizar seguimiento semanal del estado emocional</li>
          <li>• Facilitar actividades colaborativas con pares positivos</li>
          <li>• Comunicar con familia sobre cambios observados</li>
        </ul>
      </div>
    </Card>
  )
}
