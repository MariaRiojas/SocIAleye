"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { AIChatbot } from "@/components/ai-chatbot/ai-chatbot"
import { Calendar, Clock, User, AlertCircle, Plus, X } from "lucide-react"

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
  const router = useRouter()
  const { user, isLoading } = useAuth()
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

  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedReason, setSelectedReason] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  // Protección de ruta
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

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

  const chatbotContext = `Gestión de Citas - ${user?.role === "teacher" ? "Profesor" : "Psicólogo"}`

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Gestión de Citas</h1>
          <p className="text-slate-400 mt-2">
            {user?.role === "teacher"
              ? "Genera citas con psicólogos para tus estudiantes"
              : "Visualiza y gestiona tus citas programadas"}
          </p>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="list" className="text-sm sm:text-base">
              Mis Citas
            </TabsTrigger>
            {user?.role === "teacher" && (
              <TabsTrigger value="new" className="text-sm sm:text-base">
                Nueva Cita
              </TabsTrigger>
            )}
          </TabsList>

          {/* Lista de Citas */}
          <TabsContent value="list" className="space-y-4">
            {appointments.length === 0 ? (
              <Card className="border-slate-700 bg-slate-800/50 p-8 text-center">
                <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-300">No hay citas programadas</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <Card key={apt.id} className="border-slate-700 bg-slate-800/50 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <User className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          <h3 className="text-base sm:text-lg font-semibold text-white">{apt.studentName}</h3>
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
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                            <span className="flex-1">{apt.reason}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <span>{apt.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <span>{apt.time}</span>
                          </div>
                          <p className="text-slate-400">
                            <span className="font-medium">Psicólogo:</span> {apt.psychologist}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 sm:flex-col">
                        {apt.status === "pending" && (
                          <>
                            <Button 
                              size="sm" 
                              className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white"
                            >
                              Confirmar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 sm:flex-none border-slate-600 text-slate-300 bg-transparent hover:bg-slate-700"
                            >
                              Cancelar
                            </Button>
                          </>
                        )}
                        {apt.status === "confirmed" && (
                          <Button 
                            size="sm" 
                            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Completar
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Nueva Cita */}
          {user?.role === "teacher" && (
            <TabsContent value="new">
              <Card className="border-slate-700 bg-slate-800/50 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
                  Programar Nueva Cita
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="student" className="text-sm font-medium text-slate-300 block mb-2">
                      Estudiante
                    </label>
                    <Input
                      id="student"
                      type="text"
                      placeholder="Nombre del estudiante"
                      value={selectedStudent}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedStudent(e.target.value)}
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="reason" className="text-sm font-medium text-slate-300 block mb-2">
                      Motivo de la cita
                    </label>
                    <textarea
                      id="reason"
                      placeholder="Describe el motivo de la cita..."
                      value={selectedReason}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSelectedReason(e.target.value)}
                      className="w-full min-h-[100px] px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="text-sm font-medium text-slate-300 block mb-2">
                        Fecha
                      </label>
                      <Input
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedDate(e.target.value)}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="time" className="text-sm font-medium text-slate-300 block mb-2">
                        Hora
                      </label>
                      <Input
                        id="time"
                        type="time"
                        value={selectedTime}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedTime(e.target.value)}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleCreateAppointment}
                      className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={!selectedStudent || !selectedReason || !selectedDate || !selectedTime}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Crear Cita
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedStudent("")
                        setSelectedReason("")
                        setSelectedDate("")
                        setSelectedTime("")
                      }}
                      className="border-slate-600 text-slate-300 bg-transparent hover:bg-slate-700"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Limpiar
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>

      <AIChatbot pageContext={chatbotContext} />
    </DashboardLayout>
  )
}
