"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StudentSociometricMapProps {
  studentId: string
  studentName: string
  filters: {
    level: string
    grade: string
    section: string
  }
}

interface StudentNode {
  id: string
  name: string
  x: number
  y: number
  acceptance: "high" | "medium" | "low"
}

interface Relationship {
  from: string
  to: string
  type: "positive" | "negative"
}

export function StudentSociometricMap({ studentId, studentName, filters }: StudentSociometricMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 350 })

  // Ajustar tamaño del canvas según el contenedor
  useEffect(() => {
    const updateCanvasSize = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.clientWidth
      const isMobile = window.innerWidth < 768
      const isTablet = window.innerWidth < 1024

      if (isMobile) {
        setCanvasSize({
          width: containerWidth - 16,
          height: 250,
        })
      } else if (isTablet) {
        setCanvasSize({
          width: containerWidth - 32,
          height: 300,
        })
      } else {
        setCanvasSize({
          width: containerWidth - 32,
          height: 350,
        })
      }
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    const resizeObserver = new ResizeObserver(updateCanvasSize)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      resizeObserver.disconnect()
    }
  }, [])

  // Generar posiciones consistentes para estudiantes basadas en el filtro y grado
  const getStudentPositions = (): StudentNode[] => {
    const { width, height } = canvasSize
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) * 0.25

    // Datos de estudiantes - en esta clase específica
    const classStudents = [
      { id: "1", name: "Ana García", acceptance: "high" as const },
      { id: "2", name: "Carlos López", acceptance: "low" as const },
      { id: "3", name: "María Rodríguez", acceptance: "high" as const },
      { id: "4", name: "Juan Martínez", acceptance: "medium" as const },
      { id: "5", name: "Sofia Pérez", acceptance: "high" as const },
      { id: "6", name: "Diego Sánchez", acceptance: "low" as const },
      { id: "7", name: "Elena Torres", acceptance: "high" as const },
      { id: "8", name: "Felipe Rodríguez", acceptance: "medium" as const },
    ]

    // Posicionar estudiantes en círculo alrededor del centro
    return classStudents.map((student, index) => {
      const angle = (index / classStudents.length) * Math.PI * 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      return { ...student, x, y }
    })
  }

  // Relaciones sociométricas
  const getRelationships = (): Relationship[] => {
    return [
      { from: "1", to: "3", type: "positive" },
      { from: "1", to: "5", type: "positive" },
      { from: "3", to: "5", type: "positive" },
      { from: "2", to: "4", type: "negative" },
      { from: "2", to: "6", type: "negative" },
      { from: "4", to: "6", type: "positive" },
      { from: "1", to: "8", type: "positive" },
      { from: "7", to: "5", type: "positive" },
      { from: "7", to: "3", type: "positive" },
    ]
  }

  const students = getStudentPositions()
  const relationships = getRelationships()

  // Función para dibujar el mapa en canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Establecer pixel ratio para pantallas de alta densidad
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvasSize.width * dpr
    canvas.height = canvasSize.height * dpr
    ctx.scale(dpr, dpr)

    // Limpiar canvas
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)

    // Dibujar grid sutil
    ctx.strokeStyle = "#1e293b"
    ctx.lineWidth = 0.5
    const gridSize = 50
    for (let x = 0; x < canvasSize.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvasSize.height)
      ctx.stroke()
    }
    for (let y = 0; y < canvasSize.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvasSize.width, y)
      ctx.stroke()
    }

    // Dibujar relaciones primero (para que aparezcan debajo)
    relationships.forEach((rel) => {
      const fromStudent = students.find((s) => s.id === rel.from)
      const toStudent = students.find((s) => s.id === rel.to)

      if (fromStudent && toStudent) {
        ctx.beginPath()
        ctx.moveTo(fromStudent.x, fromStudent.y)
        ctx.lineTo(toStudent.x, toStudent.y)

        if (rel.type === "positive") {
          ctx.strokeStyle = "#10b981"
          ctx.lineWidth = 2
          ctx.setLineDash([])
        } else {
          ctx.strokeStyle = "#ef4444"
          ctx.lineWidth = 1.5
          ctx.setLineDash([5, 5])
        }

        ctx.stroke()
        ctx.setLineDash([])
      }
    })

    // Dibujar estudiantes (nodos)
    students.forEach((student) => {
      const isSelectedStudent = student.id === studentId
      const nodeRadius = isSelectedStudent ? 20 : 16

      // Color basado en aceptación social
      if (student.acceptance === "high") {
        ctx.fillStyle = "#10b981"
      } else if (student.acceptance === "medium") {
        ctx.fillStyle = "#eab308"
      } else {
        ctx.fillStyle = "#ef4444"
      }

      ctx.beginPath()
      ctx.arc(student.x, student.y, nodeRadius, 0, Math.PI * 2)
      ctx.fill()

      // Outline para estudiante seleccionado
      if (isSelectedStudent) {
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 3
        ctx.stroke()
      }

      // Dibujar nombre (iniciales para móvil)
      const isMobile = canvasSize.width < 500
      const displayName = isMobile ? student.name.charAt(0).toUpperCase() : student.name.substring(0, 3)

      ctx.fillStyle = "#ffffff"
      ctx.font = `bold ${isMobile ? 10 : 12}px sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(displayName, student.x, student.y)
    })

    // Dibujar leyenda
    const legendY = canvasSize.height - 40
    ctx.font = "12px sans-serif"
    ctx.textAlign = "left"

    // Posiciones positivas
    ctx.strokeStyle = "#10b981"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(10, legendY + 10)
    ctx.lineTo(30, legendY + 10)
    ctx.stroke()
    ctx.fillStyle = "#cbd5e1"
    ctx.fillText("Relación positiva", 35, legendY + 10)

    // Relaciones negativas
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 1.5
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(10, legendY + 25)
    ctx.lineTo(30, legendY + 25)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = "#cbd5e1"
    ctx.fillText("Conflicto", 35, legendY + 25)

    // Colores de aceptación
    ctx.fillStyle = "#10b981"
    ctx.beginPath()
    ctx.arc(280, legendY + 10, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#cbd5e1"
    ctx.fillText("Alta aceptación", 295, legendY + 10)

    ctx.fillStyle = "#eab308"
    ctx.beginPath()
    ctx.arc(450, legendY + 10, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#cbd5e1"
    ctx.fillText("Aceptación media", 465, legendY + 10)

    ctx.fillStyle = "#ef4444"
    ctx.beginPath()
    ctx.arc(280, legendY + 25, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#cbd5e1"
    ctx.fillText("Baja aceptación", 295, legendY + 25)
  }, [canvasSize, students, relationships, studentId])

  const getStudentColor = (acceptance: string) => {
    switch (acceptance) {
      case "high":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-red-500"
      default:
        return "bg-slate-500"
    }
  }

  const getAcceptanceLabel = (acceptance: string) => {
    switch (acceptance) {
      case "high":
        return "Alta aceptación"
      case "medium":
        return "Aceptación media"
      case "low":
        return "Baja aceptación"
      default:
        return "Sin datos"
    }
  }

  return (
    <div ref={containerRef} className="w-full">
      <Card className="border-stone-700 bg-stone-800/50 p-4 sm:p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
            Posición Sociométrica - {studentName}
          </h3>
          <p className="text-stone-400 text-sm mt-2">
            Visualización de la posición social de {studentName} dentro del grupo clase y sus relaciones con compañeros.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 border">
            {filters.level === "primaria" ? "Primaria" : "Secundaria"} {filters.grade}° - Sección {filters.section}
          </Badge>
          <Badge className="bg-stone-700 text-stone-300 border-stone-600 border">
            8 estudiantes en la clase
          </Badge>
        </div>

        <div className="bg-stone-900/50 rounded-lg overflow-hidden border border-stone-700">
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              maxWidth: "100%",
            }}
          />
        </div>

        {/* LEYENDA DE ESTUDIANTES */}
        <div className="pt-4 border-t border-stone-700">
          <h4 className="text-sm font-semibold text-white mb-3">Estudiantes en la Clase</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {students.map((student) => (
              <div
                key={student.id}
                className={`p-3 rounded-lg border ${
                  student.id === studentId
                    ? "bg-orange-500/20 border-orange-500/50"
                    : "bg-stone-700/50 border-stone-600"
                } transition-all`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${getStudentColor(student.acceptance)}`}
                  ></div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium truncate ${student.id === studentId ? "text-orange-300" : "text-white"}`}>
                      {student.name}
                    </p>
                    <p className="text-xs text-stone-400">{getAcceptanceLabel(student.acceptance)}</p>
                    {student.id === studentId && (
                      <p className="text-xs text-orange-300 mt-1 font-semibold">← Estudiante seleccionado</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LEYENDA DE RELACIONES Y ACEPTACIÓN */}
        <div className="pt-4 border-t border-stone-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Relaciones</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-1 rounded-full bg-green-500"></div>
                  <span className="text-xs text-stone-300">Relación positiva</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-1 rounded-full bg-red-500"
                    style={{
                      backgroundImage: "repeating-linear-gradient(90deg, #ef4444 0, #ef4444 5px, transparent 5px, transparent 10px)",
                    }}
                  ></div>
                  <span className="text-xs text-stone-300">Conflicto / rechazo</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Nivel de Aceptación</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-stone-300">Alta aceptación social</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs text-stone-300">Aceptación media</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-stone-300">Baja aceptación / aislamiento</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-700">
          <div className="space-y-1">
            <p className="text-xs text-stone-400">Elecciones Recibidas</p>
            <p className="text-2xl font-bold text-green-400">5</p>
            <p className="text-xs text-stone-400">compañeros lo eligen</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-stone-400">Rechazos Recibidos</p>
            <p className="text-2xl font-bold text-red-400">2</p>
            <p className="text-xs text-stone-400">compañeros lo rechazan</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-stone-400">Índice Sociométrico</p>
            <p className="text-2xl font-bold text-orange-400">+3</p>
            <p className="text-xs text-stone-400">posición en el grupo</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
