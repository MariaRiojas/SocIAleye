"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIChatbot } from "@/components/ai-chatbot/ai-chatbot"
import { Calendar, Clock, User, AlertCircle } from "lucide-react"

interface Appointment {
  id: string
  studentName: string
  studentId: string
  reason: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed"
  psychologist: string
}

export default function AppointmentsPage() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      studentName: "Juan Pérez",
      studentId: "001",
      reason: "Aislamiento social progresivo",
      date: "2024-11-15",
      time: "14:00",
      status: "pending",
      psychologist: "Dra. María López",
    },
    {
      id: "2",
      studentName: "Ana García",
      studentId: "002",
      reason: "Cambios emocionales bruscos",
      date: "2024-11-16",
      time: "15:30",
      status: "confirmed",
      psychologist: "Dr. Carlos Rodríguez",
    },
  ])

  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedReason, setSelectedReason] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const handleCreateAppointment = () => {
    if (selectedStudent && selectedReason && selectedDate && selectedTime) {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        studentName: selectedStudent,
        studentId: "NEW",
        reason: selectedReason,
        date: selectedDate,
        time: selectedTime,
        status: "pending",
        psychologist: "Por asignar",
      }
      setAppointments([...appointments, newAppointment])
      setShowNewAppointment(false)
      setSelectedStudent("")
      setSelectedReason("")
      setSelectedDate("")
      setSelectedTime("")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "confirmed":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      case "completed":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Gestión de Citas</h1>
          <p className="text-slate-400">
            {user?.role === "teacher"
              ? "Genera citas con psicólogos para tus estudiantes"
              : "Visualiza y gestiona tus citas programadas"}
          </p>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="list">Mis Citas</TabsTrigger>
            {user?.role === "teacher" && <TabsTrigger value="new">Nueva Cita</TabsTrigger>}
          </TabsList>

          {/* Lista de Citas */}
          <TabsContent value="list" className="space-y-4">
            {appointments.length === 0 ? (
              <Card className="border-slate-700 bg-slate-800/50 p-8 text-center">
                <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-300">No hay citas programadas</p>
              </Card>
            ) : (
              appointments.map((apt) => (
                <Card key={apt.id} className="border-slate-700 bg-slate-800/50 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <User className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-semibold text-white">{apt.studentName}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(apt.status)}`}
                        >
                          {apt.status === "pending"
                            ? "Pendiente"
                            : apt.status === "confirmed"
                              ? "Confirmada"
                              : "Completada"}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-400" />
                          <span>{apt.reason}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>{apt.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span>{apt.time}</span>
                        </div>
                        <p className="text-slate-400">Psicólogo: {apt.psychologist}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {apt.status === "pending" && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Confirmar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-slate-300 bg-transparent"
                          >
                            Cancelar
                          </Button>
                        </>
                      )}
                      {apt.status === "confirmed" && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Completar
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Nueva Cita */}
          {user?.role === "teacher" && (
            <TabsContent value="new" className="space-y-4">
              <Card className="border-slate-700 bg-slate-800/50 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Crear Nueva Cita</h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300">Estudiante</label>
                    <select
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                      className="w-full mt-2 bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                    >
                      <option value="">Selecciona un estudiante</option>
                      <option value="Juan Pérez">Juan Pérez</option>
                      <option value="Ana García">Ana García</option>
                      <option value="Carlos López">Carlos López</option>
                      <option value="María Rodríguez">María Rodríguez</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-300">Motivo de la Cita</label>
                    <select
                      value={selectedReason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="w-full mt-2 bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                    >
                      <option value="">Selecciona un motivo</option>
                      <option value="Aislamiento social">Aislamiento social</option>
                      <option value="Cambios emocionales">Cambios emocionales</option>
                      <option value="Conflicto con compañeros">Conflicto con compañeros</option>
                      <option value="Bajo rendimiento académico">Bajo rendimiento académico</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300">Fecha</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full mt-2 bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300">Hora</label>
                      <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full mt-2 bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleCreateAppointment}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Crear Cita
                    </Button>
                    <Button
                      onClick={() => setShowNewAppointment(false)}
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-300"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* AI Chatbot */}
      <AIChatbot pageContext="Gestión de Citas" />
    </div>
  )
}
