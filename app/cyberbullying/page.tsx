"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, LinkIcon, MessageSquare, TrendingUp, Shield, Eye, Calendar } from "lucide-react"

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
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "low":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "high":
        return "Alta"
      case "medium":
        return "Media"
      case "low":
        return "Baja"
      default:
        return severity
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 px-4 sm:px-0">
        {/* Header */}
        <div className="border-b-2 border-amber-500 pb-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-400">Análisis de Ciberbullying</h1>
          <p className="text-slate-400 mt-1 sm:mt-2 text-sm sm:text-base font-medium">
            Monitorea y analiza comportamientos de ciberbullying desde múltiples plataformas educativas
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border border-slate-600 bg-slate-800/50 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs sm:text-sm font-medium">Alertas Activas</p>
                <p className="text-2xl sm:text-3xl font-bold text-red-400 mt-2">{alerts.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </Card>

          <Card className="border border-slate-600 bg-slate-800/50 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs sm:text-sm font-medium">Integraciones</p>
                <p className="text-2xl sm:text-3xl font-bold text-sky-400 mt-2">
                  {integrations.filter((i) => i.status === "connected").length}/{integrations.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-sky-500/20 flex items-center justify-center">
                <LinkIcon className="w-6 h-6 text-sky-400" />
              </div>
            </div>
          </Card>

          <Card className="border border-slate-600 bg-slate-800/50 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs sm:text-sm font-medium">Severidad Alta</p>
                <p className="text-2xl sm:text-3xl font-bold text-amber-400 mt-2">
                  {alerts.filter((a) => a.severity === "high").length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </Card>

          <Card className="border border-slate-600 bg-slate-800/50 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs sm:text-sm font-medium">Estudiantes Afectados</p>
                <p className="text-2xl sm:text-3xl font-bold text-violet-400 mt-2">
                  {new Set(alerts.map((a) => a.student)).size}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-violet-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Integrations Section */}
        <Card className="border border-slate-600 bg-slate-800/50 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-sky-400" />
            Integraciones Conectadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration) => (
              <Card key={integration.id} className="border border-slate-700 bg-slate-900/50 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="text-2xl flex-shrink-0">{integration.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-100 text-sm sm:text-base truncate">{integration.name}</h3>
                      <p className="text-slate-400 text-xs sm:text-sm">{integration.platform}</p>
                      <p className="text-slate-500 text-xs mt-1">Última sincronización: {integration.lastSync}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 flex-shrink-0 ml-2">
                    <Badge
                      className={`${
                        integration.status === "connected"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                      } border text-xs`}
                    >
                      {integration.status === "connected" ? "Conectado" : "Desconectado"}
                    </Badge>
                    {/* Toggle Switch */}
                    <button
                      onClick={() => toggleIntegration(integration.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                        integration.status === "connected" ? "bg-emerald-500" : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          integration.status === "connected" ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Alerts Section */}
        <Card className="border border-slate-600 bg-slate-800/50 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Alertas de Ciberbullying Detectadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className="border border-slate-700 bg-slate-900/70 p-4 hover:border-amber-500/50 transition-all cursor-pointer group">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-100 text-sm sm:text-base truncate group-hover:text-amber-300 transition-colors">{alert.student}</h3>
                      <p className="text-slate-400 text-xs sm:text-sm mt-1">{alert.type}</p>
                    </div>
                    <Badge className={`${getSeverityColor(alert.severity)} border text-xs`}>
                      {getSeverityLabel(alert.severity)}
                    </Badge>
                  </div>

                  <Card className="border border-slate-700 bg-slate-800/50 p-3">
                    <p className="text-xs sm:text-sm text-slate-300">{alert.content}</p>
                  </Card>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-400">
                      <LinkIcon className="w-3 h-3" />
                      <span>Fuente: <span className="text-slate-300">{alert.source}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-slate-700">
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-md bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition-all text-xs font-medium">
                      <Eye className="w-3 h-3" />
                      Ver Detalles
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-md bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all text-xs font-medium">
                      <Calendar className="w-3 h-3" />
                      Generar Cita
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}