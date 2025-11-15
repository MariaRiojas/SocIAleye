"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Clock, CheckCircle, X, User, Calendar, Edit3, Save } from "lucide-react"

interface AlertsListProps {
  filters: {
    level: string
    grade: string
    section: string
    severity: string
    status: string
  }
}

interface TimelineItem {
  date: string
  event: string
}

interface AlertDetails {
  grade: string
  age: number
  incidentCount: number
  lastIncident: string
  riskLevel: string
  emotionalScore: number
  empathyScore: number
  socialConnections: number
  conflictiveRelations: number
  timeline: TimelineItem[]
  notes: string
}

interface Alert {
  id: string
  student: string
  type: string
  severity: string
  status: string
  date: string
  description: string
  details: AlertDetails
}

export function AlertsList({ filters }: AlertsListProps) {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedAlert, setEditedAlert] = useState<Alert | null>(null)
  const [alertsData, setAlertsData] = useState<Alert[]>([
    {
      id: "1",
      student: "Juan Martínez",
      type: "Aislamiento severo",
      severity: "high",
      status: "active",
      date: "Hoy 14:30",
      description: "Estudiante ha sido rechazado por 12 compañeros en últimas 2 semanas",
      details: {
        grade: "1° A",
        age: 12,
        incidentCount: 8,
        lastIncident: "Hoy 14:30",
        riskLevel: "Alto",
        emotionalScore: 25,
        empathyScore: 20,
        socialConnections: 2,
        conflictiveRelations: 12,
        timeline: [
          { date: "Hoy 14:30", event: "Rechazo grupal en actividad deportiva" },
          { date: "Ayer 11:00", event: "Exclusión en trabajo en equipo" },
          { date: "Hace 3 días", event: "Comentarios negativos de compañeros" },
          { date: "Hace 1 semana", event: "Aislamiento en recreo" },
        ],
        notes: "",
      },
    },
    {
      id: "2",
      student: "Carlos López",
      type: "Aislamiento progresivo",
      severity: "medium",
      status: "active",
      date: "Hoy 10:15",
      description: "Disminución en interacciones sociales del 40% en último mes",
      details: {
        grade: "1° A",
        age: 12,
        incidentCount: 5,
        lastIncident: "Hoy 10:15",
        riskLevel: "Medio",
        emotionalScore: 45,
        empathyScore: 40,
        socialConnections: 5,
        conflictiveRelations: 6,
        timeline: [
          { date: "Hoy 10:15", event: "No participó en discusión grupal" },
          { date: "Hace 2 días", event: "Almorzó solo por tercera vez consecutiva" },
          { date: "Hace 1 semana", event: "Evitó contacto visual con compañeros" },
        ],
        notes: "",
      },
    },
    {
      id: "3",
      student: "Diego Sánchez",
      type: "Cambio emocional",
      severity: "medium",
      status: "monitoring",
      date: "Ayer 16:45",
      description: "Cambio en patrones de comportamiento detectado por NLP",
      details: {
        grade: "1° A",
        age: 11,
        incidentCount: 3,
        lastIncident: "Ayer 16:45",
        riskLevel: "Medio",
        emotionalScore: 55,
        empathyScore: 60,
        socialConnections: 8,
        conflictiveRelations: 3,
        timeline: [
          { date: "Ayer 16:45", event: "Lenguaje negativo en redacción" },
          { date: "Hace 3 días", event: "Cambio en tono de comunicación" },
        ],
        notes: "",
      },
    },
    {
      id: "4",
      student: "María Rodríguez",
      type: "Conflicto grupal",
      severity: "low",
      status: "resolved",
      date: "Hace 3 días",
      description: "Tensión resuelta entre subgrupos de la clase",
      details: {
        grade: "1° A",
        age: 12,
        incidentCount: 1,
        lastIncident: "Hace 3 días",
        riskLevel: "Bajo",
        emotionalScore: 75,
        empathyScore: 80,
        socialConnections: 12,
        conflictiveRelations: 1,
        timeline: [
          { date: "Hace 3 días", event: "Mediación exitosa entre grupos" },
        ],
        notes: "",
      },
    },
    {
      id: "5",
      student: "Ana García",
      type: "Comportamiento agresivo",
      severity: "high",
      status: "active",
      date: "Hoy 09:00",
      description: "Múltiples incidentes de agresión verbal reportados esta semana",
      details: {
        grade: "1° A",
        age: 12,
        incidentCount: 12,
        lastIncident: "Hoy 09:00",
        riskLevel: "Alto",
        emotionalScore: 20,
        empathyScore: 15,
        socialConnections: 0,
        conflictiveRelations: 14,
        timeline: [
          { date: "Hoy 09:00", event: "Insultos a compañero en clase" },
          { date: "Ayer 14:00", event: "Amenazas verbales en recreo" },
          { date: "Hace 2 días", event: "Agresión verbal grupal" },
          { date: "Hace 3 días", event: "Ciberbullying detectado" },
        ],
        notes: "",
      },
    },
    {
      id: "6",
      student: "Pedro Fernández",
      type: "Bajo rendimiento social",
      severity: "low",
      status: "monitoring",
      date: "Hace 2 días",
      description: "Participación mínima en actividades grupales",
      details: {
        grade: "1° A",
        age: 11,
        incidentCount: 2,
        lastIncident: "Hace 2 días",
        riskLevel: "Bajo",
        emotionalScore: 65,
        empathyScore: 70,
        socialConnections: 6,
        conflictiveRelations: 2,
        timeline: [
          { date: "Hace 2 días", event: "No participó en proyecto grupal" },
          { date: "Hace 1 semana", event: "Preferencia por trabajo individual" },
        ],
        notes: "",
      },
    },
  ])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      default:
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      case "monitoring":
        return <Clock className="w-4 h-4 text-amber-400" />
      default:
        return <CheckCircle className="w-4 h-4 text-emerald-400" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score < 40) return "text-red-400"
    if (score < 70) return "text-amber-400"
    return "text-emerald-400"
  }

  const handleEdit = () => {
    if (selectedAlert) {
      setEditedAlert({ ...selectedAlert })
      setIsEditing(true)
    }
  }

  const handleSave = () => {
    if (editedAlert) {
      setAlertsData(alertsData.map(alert => 
        alert.id === editedAlert.id ? editedAlert : alert
      ))
      setSelectedAlert(editedAlert)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditedAlert(null)
    setIsEditing(false)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alertsData.map((alert) => (
          <Card 
            key={alert.id} 
            className="border border-slate-700 bg-slate-900/70 p-4 hover:border-amber-500/50 transition-all cursor-pointer"
            onClick={() => setSelectedAlert(alert)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                {getStatusIcon(alert.status)}
                <div>
                  <h4 className="font-semibold text-slate-100">{alert.student}</h4>
                  <p className="text-sm text-slate-400 mt-1">{alert.type}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Badge className={`${getSeverityColor(alert.severity)} border text-xs`}>
                {alert.severity === "high" ? "Alta" : alert.severity === "medium" ? "Media" : "Baja"}
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
                {alert.status === "active" ? "Activa" : alert.status === "monitoring" ? "Monitoreo" : "Resuelta"}
              </Badge>
            </div>
            <p className="text-sm text-slate-300 mb-3">{alert.description}</p>
            <p className="text-xs text-slate-500">{alert.date}</p>
          </Card>
        ))}
      </div>

      {/* Modal de Detalles */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="border border-slate-600 bg-slate-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
                    <User className="w-6 h-6 text-slate-300" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-100">
                      {isEditing && editedAlert ? editedAlert.student : selectedAlert.student}
                    </h2>
                    <p className="text-slate-400">
                      {isEditing && editedAlert ? editedAlert.details.grade : selectedAlert.details.grade} • {isEditing && editedAlert ? editedAlert.details.age : selectedAlert.details.age} años
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEdit}
                      className="border-amber-500/50 text-amber-400 hover:bg-amber-500/20"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedAlert(null)
                      setIsEditing(false)
                      setEditedAlert(null)
                    }}
                    className="text-slate-400 hover:text-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {isEditing && editedAlert ? (
                // Modo Edición
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Tipo de Alerta</label>
                      <Input
                        value={editedAlert.type}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedAlert({ ...editedAlert, type: e.target.value })}
                        className="bg-slate-900 border-slate-700 text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Severidad</label>
                      <select
                        value={editedAlert.severity}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditedAlert({ ...editedAlert, severity: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-md px-3 py-2"
                      >
                        <option value="high">Alta</option>
                        <option value="medium">Media</option>
                        <option value="low">Baja</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Estado</label>
                      <select
                        value={editedAlert.status}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditedAlert({ ...editedAlert, status: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-md px-3 py-2"
                      >
                        <option value="active">Activa</option>
                        <option value="monitoring">Monitoreo</option>
                        <option value="resolved">Resuelta</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Nivel de Riesgo</label>
                      <select
                        value={editedAlert.details.riskLevel}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditedAlert({ 
                          ...editedAlert, 
                          details: { ...editedAlert.details, riskLevel: e.target.value }
                        })}
                        className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-md px-3 py-2"
                      >
                        <option value="Alto">Alto</option>
                        <option value="Medio">Medio</option>
                        <option value="Bajo">Bajo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Descripción</label>
                    <textarea
                      value={editedAlert.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditedAlert({ ...editedAlert, description: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-md px-3 py-2"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Score Emocional</label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={editedAlert.details.emotionalScore}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedAlert({ 
                          ...editedAlert, 
                          details: { ...editedAlert.details, emotionalScore: parseInt(e.target.value) || 0 }
                        })}
                        className="bg-slate-900 border-slate-700 text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Empatía</label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={editedAlert.details.empathyScore}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedAlert({ 
                          ...editedAlert, 
                          details: { ...editedAlert.details, empathyScore: parseInt(e.target.value) || 0 }
                        })}
                        className="bg-slate-900 border-slate-700 text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Conexiones</label>
                      <Input
                        type="number"
                        min="0"
                        value={editedAlert.details.socialConnections}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedAlert({ 
                          ...editedAlert, 
                          details: { ...editedAlert.details, socialConnections: parseInt(e.target.value) || 0 }
                        })}
                        className="bg-slate-900 border-slate-700 text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Incidentes</label>
                      <Input
                        type="number"
                        min="0"
                        value={editedAlert.details.incidentCount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedAlert({ 
                          ...editedAlert, 
                          details: { ...editedAlert.details, incidentCount: parseInt(e.target.value) || 0 }
                        })}
                        className="bg-slate-900 border-slate-700 text-slate-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Notas Adicionales</label>
                    <textarea
                      value={editedAlert.details.notes}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditedAlert({ 
                        ...editedAlert, 
                        details: { ...editedAlert.details, notes: e.target.value }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-md px-3 py-2"
                      rows={4}
                      placeholder="Agregar notas sobre la alerta..."
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Cambios
                    </Button>
                  </div>
                </div>
              ) : (
                // Modo Vista
                <>
                  {/* Badges */}
                  <div className="flex gap-2 mb-6">
                    <Badge className={`${getSeverityColor(selectedAlert.severity)} border`}>
                      Severidad: {selectedAlert.severity === "high" ? "Alta" : selectedAlert.severity === "medium" ? "Media" : "Baja"}
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {selectedAlert.status === "active" ? "Activa" : selectedAlert.status === "monitoring" ? "Monitoreo" : "Resuelta"}
                    </Badge>
                    <Badge className="bg-sky-500/20 text-sky-400 border-sky-500/30 border">
                      Riesgo: {selectedAlert.details.riskLevel}
                    </Badge>
                  </div>

                  {/* Descripción */}
                  <Card className="border border-slate-700 bg-slate-900/50 p-4 mb-6">
                    <h3 className="text-sm font-semibold text-slate-400 mb-2">Descripción</h3>
                    <p className="text-slate-200">{selectedAlert.description}</p>
                  </Card>

                  {/* Métricas */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <Card className="border border-slate-700 bg-slate-900/50 p-4">
                      <p className="text-xs text-slate-400 mb-1">Incidentes</p>
                      <p className="text-2xl font-bold text-red-400">{selectedAlert.details.incidentCount}</p>
                    </Card>
                    <Card className="border border-slate-700 bg-slate-900/50 p-4">
                      <p className="text-xs text-slate-400 mb-1">Score Emocional</p>
                      <p className={`text-2xl font-bold ${getScoreColor(selectedAlert.details.emotionalScore)}`}>
                        {selectedAlert.details.emotionalScore}
                      </p>
                    </Card>
                    <Card className="border border-slate-700 bg-slate-900/50 p-4">
                      <p className="text-xs text-slate-400 mb-1">Empatía</p>
                      <p className={`text-2xl font-bold ${getScoreColor(selectedAlert.details.empathyScore)}`}>
                        {selectedAlert.details.empathyScore}
                      </p>
                    </Card>
                    <Card className="border border-slate-700 bg-slate-900/50 p-4">
                      <p className="text-xs text-slate-400 mb-1">Conexiones</p>
                      <p className="text-2xl font-bold text-sky-400">{selectedAlert.details.socialConnections}</p>
                    </Card>
                  </div>

                  {/* Timeline */}
                  <Card className="border border-slate-700 bg-slate-900/50 p-4 mb-6">
                    <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-amber-400" />
                      Línea de Tiempo
                    </h3>
                    <div className="space-y-3">
                      {selectedAlert.details.timeline.map((item: TimelineItem, idx: number) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-amber-500 mt-2"></div>
                          <div>
                            <p className="text-sm text-slate-300">{item.event}</p>
                            <p className="text-xs text-slate-500">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Notas */}
                  {selectedAlert.details.notes && (
                    <Card className="border border-slate-700 bg-slate-900/50 p-4">
                      <h3 className="text-sm font-semibold text-slate-400 mb-2">Notas</h3>
                      <p className="text-slate-200">{selectedAlert.details.notes}</p>
                    </Card>
                  )}
                </>
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  )
}