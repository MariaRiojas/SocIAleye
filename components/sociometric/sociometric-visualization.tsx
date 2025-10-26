"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

interface SociometricVisualizationProps {
  filters: {
    level: string
    grade: string
    section: string
  }
  selectedStudent: string | null
  onSelectStudent: (id: string) => void
}

export function SociometricMapVisualization({
  filters,
  selectedStudent,
  onSelectStudent,
}: SociometricVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Datos simulados de estudiantes y sus relaciones
  const students = [
    { id: "1", name: "Ana", x: 150, y: 100, acceptance: "high" },
    { id: "2", name: "Carlos", x: 300, y: 80, acceptance: "low" },
    { id: "3", name: "María", x: 450, y: 120, acceptance: "high" },
    { id: "4", name: "Juan", x: 200, y: 250, acceptance: "low" },
    { id: "5", name: "Sofia", x: 400, y: 280, acceptance: "high" },
    { id: "6", name: "Diego", x: 100, y: 200, acceptance: "medium" },
  ]

  const relationships = [
    { from: "1", to: "3", type: "positive" },
    { from: "1", to: "5", type: "positive" },
    { from: "3", to: "5", type: "positive" },
    { from: "2", to: "4", type: "negative" },
    { from: "4", to: "6", type: "negative" },
    { from: "6", to: "2", type: "negative" },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Limpiar canvas
    ctx.fillStyle = "#1e293b"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Dibujar relaciones
    relationships.forEach((rel) => {
      const from = students.find((s) => s.id === rel.from)
      const to = students.find((s) => s.id === rel.to)
      if (!from || !to) return

      ctx.strokeStyle = rel.type === "positive" ? "#10b981" : "#ef4444"
      ctx.lineWidth = rel.type === "positive" ? 2 : 1
      ctx.setLineDash(rel.type === "positive" ? [] : [5, 5])
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.stroke()
      ctx.setLineDash([])
    })

    // Dibujar nodos (estudiantes)
    students.forEach((student) => {
      const isSelected = student.id === selectedStudent
      const radius = isSelected ? 25 : 20

      // Color según aceptación
      let color = "#10b981" // green
      if (student.acceptance === "medium") color = "#eab308" // yellow
      if (student.acceptance === "low") color = "#ef4444" // red

      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(student.x, student.y, radius, 0, Math.PI * 2)
      ctx.fill()

      // Borde si está seleccionado
      if (isSelected) {
        ctx.strokeStyle = "#60a5fa"
        ctx.lineWidth = 3
        ctx.stroke()
      }

      // Texto
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(student.name, student.x, student.y)
    })
  }, [selectedStudent])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Detectar si se hizo clic en un nodo
    students.forEach((student) => {
      const distance = Math.sqrt((x - student.x) ** 2 + (y - student.y) ** 2)
      if (distance < 25) {
        onSelectStudent(student.id)
      }
    })
  }

  return (
    <Card className="border-slate-700 bg-slate-800/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Estructura Social del Aula</h3>
      <div className="bg-slate-900 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          onClick={handleCanvasClick}
          className="w-full cursor-pointer"
        />
      </div>
      <div className="mt-4 flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500" />
          <span className="text-slate-300">Alta aceptación</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500" />
          <span className="text-slate-300">Aceptación media</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <span className="text-slate-300">Baja aceptación</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 h-0.5 bg-green-500" />
          <span className="text-slate-300">Relación positiva</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-12 h-0.5 bg-red-500"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #ef4444 0, #ef4444 5px, transparent 5px, transparent 10px)",
            }}
          />
          <span className="text-slate-300">Rechazo</span>
        </div>
      </div>
    </Card>
  )
}
