"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AIChatbot } from "@/components/ai-chatbot/ai-chatbot"
import { AlertTriangle, LinkIcon, MessageSquare, TrendingUp } from "lucide-react"

interface IntegrationSource {
  id: string
  name: string
  platform: string
  status: "connected" | "disconnected"
  lastSync: string
  icon: string
}

interface CyberbullyingAlert {
  id: string
  student: string
  severity: "high" | "medium" | "low"
  type: string
  source: string
  content: string
  timestamp: string
  action: string
}

export default function CyberbullyingAnalysis() {
  const [integrations, setIntegrations] = useState<IntegrationSource[]>([
    {
      id: "1",
      name: "Classroom Principal",
      platform: "Google Classroom",
      status: "connected",
      lastSync: "Hace 2 horas",
      icon: "📚",
    },
    {
      id: "2",
      name: "Blackboard Institucional",
      platform: "Blackboard",
      status: "connected",
      lastSync: "Hace 1 hora",
      icon: "🖥️",
    },
    {
      id: "3",
      name: "Microsoft Teams",
      platform: "Microsoft Teams",
      status: "disconnected",
      lastSync: "Nunca",
      icon: "💼",
    },
    {
      id: "4",
      name: "Moodle Campus",
      platform: "Moodle",
      status: "connected",
      lastSync: "Hace 30 minutos",
      icon: "🎓",
    },
  ])

  const [alerts, setAlerts] = useState<CyberbullyingAlert[]>([
    {
      id: "1",
      student: "Juan Pérez",
      severity: "high",
      type: "Lenguaje ofensivo",
      source: "Google Classroom",
      content: "Comentario negativo en foro de discusión",
      timestamp: "Hace 2 horas",
      action: "Requiere intervención inmediata",
    },
    {
      id: "2",
      student: "María García",
      severity: "medium",
      type: "Exclusión social",
      source: "Blackboard",
      content: "Removida de grupo de trabajo colaborativo",
      timestamp: "Hace 4 horas",
      action: "Monitorear situación",
    },
    {
      id: "3",
      student: "Carlos López",
      severity: "low",
      type: "Comentarios inapropiados",
      source: "Moodle",
      content: "Múltiples comentarios sarcásticos",
      timestamp: "Hace 6 horas",
      action: "Seguimiento",
    },
  ])

  const toggleIntegration = (id: string) => {
    setIntegrations(
      integrations.map((int) =>
        int.id === id
          ? {
              ...int,
              status: int.status === "connected" ? "disconnected" : "connected",
              lastSync: int.status === "connected" ? "Nunca" : "Hace 5 minutos",
            }
          : int,
      ),
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-slate-500/20 text-stone-400 border-stone-500/30"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Análisis de Ciberbullying</h1>
          <p className="text-stone-400 text-sm sm:text-base">
            Monitorea y analiza comportamientos de ciberbullying desde múltiples plataformas educativas
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-stone-800 border-stone-700 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-stone-400 text-xs sm:text-sm">Alertas Activas</p>
                <p className="text-2xl sm:text-3xl font-bold text-white mt-2">{alerts.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
            </div>
          </Card>

          <Card className="bg-stone-800 border-stone-700 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-stone-400 text-xs sm:text-sm">Integraciones</p>
                <p className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {integrations.filter((i) => i.status === "connected").length}/{integrations.length}
                </p>
              </div>
              <LinkIcon className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
            </div>
          </Card>

          <Card className="bg-stone-800 border-stone-700 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-stone-400 text-xs sm:text-sm">Severidad Alta</p>
                <p className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {alerts.filter((a) => a.severity === "high").length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
            </div>
          </Card>

          <Card className="bg-stone-800 border-stone-700 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-stone-400 text-xs sm:text-sm">Estudiantes Afectados</p>
                <p className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {new Set(alerts.map((a) => a.student)).size}
                </p>
              </div>
              <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Integrations Section */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">Integraciones Conectadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration) => (
              <Card key={integration.id} className="bg-stone-800 border-stone-700 p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="text-2xl flex-shrink-0">{integration.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-white text-sm sm:text-base truncate">{integration.name}</h3>
                      <p className="text-stone-400 text-xs sm:text-sm">{integration.platform}</p>
                      <p className="text-stone-500 text-xs mt-1">Última sincronización: {integration.lastSync}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        integration.status === "connected"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-slate-500/20 text-stone-400"
                      }`}
                    >
                      {integration.status === "connected" ? "Conectado" : "Desconectado"}
                    </span>
                    <Button
                      onClick={() => toggleIntegration(integration.id)}
                      variant="outline"
                      size="sm"
                      className="border-stone-600 text-stone-300 hover:bg-stone-700 text-xs"
                    >
                      {integration.status === "connected" ? "Desconectar" : "Conectar"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Alerts Section */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">Alertas de Ciberbullying Detectadas</h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Card key={alert.id} className={`border p-4 sm:p-6 ${getSeverityColor(alert.severity)}`}>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{alert.student}</h3>
                      <p className="text-xs sm:text-sm opacity-90 mt-1">{alert.type}</p>
                    </div>
                    <span className="text-xs font-medium flex-shrink-0">{alert.timestamp}</span>
                  </div>

                  <div className="bg-black/20 rounded p-2 sm:p-3">
                    <p className="text-xs sm:text-sm">{alert.content}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-current/20">
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="opacity-75">Fuente:</span>
                      <span className="font-medium">{alert.source}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-current/30 text-current hover:bg-current/10 text-xs bg-transparent"
                      >
                        Ver Detalles
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-current/30 text-current hover:bg-current/10 text-xs bg-transparent"
                      >
                        Generar Cita
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* AI Chatbot */}
    </DashboardLayout>
  )
}
