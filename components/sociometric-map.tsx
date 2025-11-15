"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

interface Student {
  id: string
  name: string
  acceptanceLevel: "high" | "medium" | "low"
  connections: string[]
  rejections: string[]
  riskLevel: "none" | "low" | "medium" | "high"
}

const mockStudents: Student[] = [
  { id: "1", name: "Ana", acceptanceLevel: "high", connections: ["2", "3", "4"], rejections: [], riskLevel: "none" },
  { id: "2", name: "Carlos", acceptanceLevel: "high", connections: ["1", "3"], rejections: [], riskLevel: "none" },
  {
    id: "3",
    name: "María",
    acceptanceLevel: "medium",
    connections: ["1", "2", "5"],
    rejections: ["4"],
    riskLevel: "low",
  },
  { id: "4", name: "Juan", acceptanceLevel: "low", connections: [], rejections: ["1", "3", "5"], riskLevel: "high" },
  { id: "5", name: "Sofia", acceptanceLevel: "medium", connections: ["2"], rejections: ["4"], riskLevel: "medium" },
]

export function SociometricMap() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

  const getColorByAcceptance = (level: string) => {
    switch (level) {
      case "high":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-green-500/20 text-green-400 border-green-500/30"
    }
  }

  return (
    <Card className="border-border bg-background p-8 space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-orange-400" />
          Mapa Sociométrico Interactivo
        </h3>
        <p className="text-muted-foreground">
          Visualización de dinámicas sociales del aula. Haz clic en un estudiante para ver detalles.
        </p>
      </div>

      {/* SVG Canvas for connections */}
      <div className="relative w-full h-96 bg-card/50 border border-border/50 rounded-lg overflow-hidden">
        <svg
          className="w-full h-full"
          style={{ background: "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05), transparent)" }}
        >
          {/* Draw connections */}
          {mockStudents.map((student) =>
            student.connections.map((connId) => {
              const target = mockStudents.find((s) => s.id === connId)
              if (!target) return null

              const studentIndex = mockStudents.indexOf(student)
              const targetIndex = mockStudents.indexOf(target)

              const x1 = 100 + (studentIndex % 3) * 150
              const y1 = 80 + Math.floor(studentIndex / 3) * 120
              const x2 = 100 + (targetIndex % 3) * 150
              const y2 = 80 + Math.floor(targetIndex / 3) * 120

              return (
                <line
                  key={`${student.id}-${connId}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="2"
                />
              )
            }),
          )}

          {/* Draw rejection lines */}
          {mockStudents.map((student) =>
            student.rejections.map((rejId) => {
              const target = mockStudents.find((s) => s.id === rejId)
              if (!target) return null

              const studentIndex = mockStudents.indexOf(student)
              const targetIndex = mockStudents.indexOf(target)

              const x1 = 100 + (studentIndex % 3) * 150
              const y1 = 80 + Math.floor(studentIndex / 3) * 120
              const x2 = 100 + (targetIndex % 3) * 150
              const y2 = 80 + Math.floor(targetIndex / 3) * 120

              return (
                <line
                  key={`${student.id}-rej-${rejId}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(239, 68, 68, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              )
            }),
          )}

          {/* Draw nodes */}
          {mockStudents.map((student, index) => {
            const x = 100 + (index % 3) * 150
            const y = 80 + Math.floor(index / 3) * 120
            const isSelected = selectedStudent === student.id

            return (
              <g key={student.id} onClick={() => setSelectedStudent(student.id)} style={{ cursor: "pointer" }}>
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 28 : 24}
                  className={`${getColorByAcceptance(student.acceptanceLevel)} transition-all`}
                  opacity={isSelected ? 1 : 0.8}
                />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dy="0.3em"
                  className="text-xs font-bold fill-white pointer-events-none"
                >
                  {student.name.charAt(0)}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500" />
          <span>Alta aceptación</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500" />
          <span>Aceptación media</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <span>Baja aceptación</span>
        </div>
      </div>

      {/* Student List */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Estudiantes en el aula</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mockStudents.map((student) => (
            <div
              key={student.id}
              onClick={() => setSelectedStudent(student.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedStudent === student.id
                  ? "border-orange-500 bg-orange-500/10"
                  : "border-border hover:border-orange-500/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getColorByAcceptance(student.acceptanceLevel)}`} />
                  <span className="font-medium text-sm">{student.name}</span>
                </div>
                {student.riskLevel !== "none" && (
                  <Badge className={`text-xs ${getRiskBadgeColor(student.riskLevel)}`}>
                    {student.riskLevel === "high" && "Riesgo Alto"}
                    {student.riskLevel === "medium" && "Riesgo Medio"}
                    {student.riskLevel === "low" && "Riesgo Bajo"}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
