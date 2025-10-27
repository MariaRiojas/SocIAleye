"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
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
  const canvasRef2 = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 400 })

  // Ajustar tamaño del canvas según el viewport
  useEffect(() => {
    const updateCanvasSize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setCanvasSize({ width: width - 48, height: 300 }) // móvil
      } else if (width < 1024) {
        setCanvasSize({ width: width - 96, height: 400 }) // tablet
      } else {
        setCanvasSize({ width: 600, height: 400 }) // desktop
      }
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    return () => window.removeEventListener('resize', updateCanvasSize)
  }, [])

  // Datos simulados de estudiantes - AJUSTADOS para canvas responsive
  const getStudentsPositions = () => {
    const { width, height } = canvasSize
    return [
      { id: "1", name: "Ana", x: width * 0.25, y: height * 0.25, acceptance: "high" },
      { id: "2", name: "Carlos", x: width * 0.5, y: height * 0.2, acceptance: "low" },
      { id: "3", name: "María", x: width * 0.75, y: height * 0.3, acceptance: "high" },
      { id: "4", name: "Juan", x: width * 0.33, y: height * 0.625, acceptance: "low" },
      { id: "5", name: "Sofia", x: width * 0.67, y: height * 0.7, acceptance: "high" },
      { id: "6", name: "Diego", x: width * 0.17, y: height * 0.5, acceptance: "medium" },
    ]
  }

  const students = getStudentsPositions()

  const relationships = [
    { from: "1", to: "3", type: "positive" },
    { from: "1", to: "5", type: "positive" },
    { from: "3", to: "5", type: "positive" },
    { from: "2", to: "4", type: "negative" },
    { from: "4", to: "6", type: "negative" },
    { from: "6", to: "2", type: "negative" },
  ]

  const drawCanvas = (canvas: HTMLCanvasElement) => {
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

      let color = "#10b981" // green
      if (student.acceptance === "medium") color = "#eab308" // yellow
      if (student.acceptance === "low") color = "#ef4444" // red

      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(student.x, student.y, radius, 0, Math.PI * 2)
      ctx.fill()

      if (isSelected) {
        ctx.strokeStyle = "#60a5fa"
        ctx.lineWidth = 3
        ctx.stroke()
      }

      // Texto
      ctx.fillStyle = "#ffffff"
      ctx.font = canvasSize.width < 400 ? "bold 10px sans-serif" : "bold 12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(student.name, student.x, student.y)
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const canvas2 = canvasRef2.current
    
    if (canvas) {
      canvas.width = canvasSize.width
      canvas.height = canvasSize.height
      drawCanvas(canvas)
    }
    if (canvas2) {
      canvas2.width = canvasSize.width
      canvas2.height = canvasSize.height
      drawCanvas(canvas2)
    }
  }, [selectedStudent, canvasSize])

  const handleCanvasClick = (canvasRefParam: React.RefObject<HTMLCanvasElement | null>) => (
    e: React.MouseEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRefParam.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    students.forEach((student) => {
      const distance = Math.sqrt((x - student.x) ** 2 + (y - student.y) ** 2)
      if (distance < 25) {
        onSelectStudent(student.id)
      }
    })
  }

  return (
    <>
      <Card className="border-slate-700 bg-slate-1000/50 p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
          Estructura Social del Aula
        </h3>
        <div className="bg-slate-900 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick(canvasRef)}
            className="w-full cursor-pointer touch-manipulation"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        <div className="mt-3 sm:mt-4 flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500" />
            <span className="text-slate-300">Alta aceptación</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-500" />
            <span className="text-slate-300">Aceptación media</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500" />
            <span className="text-slate-300">Baja aceptación</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 sm:w-12 h-0.5 bg-green-500" />
            <span className="text-slate-300">Positiva</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-8 sm:w-12 h-0.5 bg-red-500"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #ef4444 0, #ef4444 5px, transparent 5px, transparent 10px)",
              }}
            />
            <span className="text-slate-300">Rechazo</span>
          </div>
        </div>
      </Card>

      <Card className="border-slate-700 bg-slate-1000/50 p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
          Estructura Social del Patio
        </h3>
        <div className="bg-slate-900 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef2}
            onClick={handleCanvasClick(canvasRef2)}
            className="w-full cursor-pointer touch-manipulation"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        <div className="mt-3 sm:mt-4 flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500" />
            <span className="text-slate-300">Alta aceptación</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-500" />
            <span className="text-slate-300">Aceptación media</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500" />
            <span className="text-slate-300">Baja aceptación</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 sm:w-12 h-0.5 bg-green-500" />
            <span className="text-slate-300">Positiva</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-8 sm:w-12 h-0.5 bg-red-500"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #ef4444 0, #ef4444 5px, transparent 5px, transparent 10px)",
              }}
            />
            <span className="text-slate-300">Rechazo</span>
          </div>
        </div>
      </Card>
    </>
  )
}