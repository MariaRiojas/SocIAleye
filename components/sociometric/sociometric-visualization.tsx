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
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 400 })

  // Ajustar tamaño del canvas según el contenedor
  useEffect(() => {
    const updateCanvasSize = () => {
      if (!containerRef.current) return
      
      const containerWidth = containerRef.current.clientWidth
      const isMobile = window.innerWidth < 768
      const isTablet = window.innerWidth < 1024
      
      if (isMobile) {
        setCanvasSize({ 
          width: containerWidth - 32, 
          height: 280 
        })
      } else if (isTablet) {
        setCanvasSize({ 
          width: containerWidth - 48, 
          height: 350 
        })
      } else {
        setCanvasSize({ 
          width: containerWidth, 
          height: 400 
        })
      }
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    
    // Observer para cambios en el contenedor
    const resizeObserver = new ResizeObserver(updateCanvasSize)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      resizeObserver.disconnect()
    }
  }, [])

  // Datos simulados de estudiantes - AJUSTADOS para canvas responsive
  const getStudentsPositions = () => {
    const { width, height } = canvasSize
    const isMobile = width < 768
    
    if (isMobile) {
      return [
        { id: "1", name: "Ana", x: width * 0.2, y: height * 0.25, acceptance: "high" },
        { id: "2", name: "Carlos", x: width * 0.5, y: height * 0.2, acceptance: "low" },
        { id: "3", name: "María", x: width * 0.8, y: height * 0.3, acceptance: "high" },
        { id: "4", name: "Juan", x: width * 0.3, y: height * 0.65, acceptance: "low" },
        { id: "5", name: "Sofia", x: width * 0.7, y: height * 0.7, acceptance: "high" },
        { id: "6", name: "Diego", x: width * 0.15, y: height * 0.5, acceptance: "medium" },
      ]
    }
    
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
      const isMobile = canvasSize.width < 768
      const radius = isSelected ? (isMobile ? 20 : 25) : (isMobile ? 16 : 20)

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
      ctx.font = isMobile ? "bold 10px sans-serif" : "bold 12px sans-serif"
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
      const isMobile = canvasSize.width < 768
      const clickRadius = isMobile ? 20 : 25
      
      if (distance < clickRadius) {
        onSelectStudent(student.id)
      }
    })
  }

  return (
    <div ref={containerRef} className="w-full space-y-6 lg:space-y-8">
      <Card className="border-stone-700 bg-slate-1000/50 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 text-center">
          Estructura Social del Aula
        </h3>
        <div className="flex justify-center">
          <div className="bg-stone-900 rounded-lg overflow-hidden max-w-full">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick(canvasRef)}
              className="cursor-pointer touch-manipulation"
              width={canvasSize.width}
              height={canvasSize.height}
              style={{ 
                maxWidth: '100%', 
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
        <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500" />
            <span className="text-stone-300 text-xs sm:text-sm">Alta aceptación</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-500" />
            <span className="text-stone-300 text-xs sm:text-sm">Aceptación media</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500" />
            <span className="text-stone-300 text-xs sm:text-sm">Baja aceptación</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 sm:w-12 h-0.5 bg-green-500" />
            <span className="text-stone-300 text-xs sm:text-sm">Positiva</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-8 sm:w-12 h-0.5 bg-red-500"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #ef4444 0, #ef4444 5px, transparent 5px, transparent 10px)",
              }}
            />
            <span className="text-stone-300 text-xs sm:text-sm">Rechazo</span>
          </div>
        </div>
      </Card>

      <Card className="border-stone-700 bg-slate-1000/50 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 text-center">
          Estructura Social del Patio
        </h3>
        <div className="flex justify-center">
          <div className="bg-stone-900 rounded-lg overflow-hidden max-w-full">
            <canvas
              ref={canvasRef2}
              onClick={handleCanvasClick(canvasRef2)}
              className="cursor-pointer touch-manipulation"
              width={canvasSize.width}
              height={canvasSize.height}
              style={{ 
                maxWidth: '100%', 
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
        <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500" />
            <span className="text-stone-300 text-xs sm:text-sm">Alta aceptación</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-500" />
            <span className="text-stone-300 text-xs sm:text-sm">Aceptación media</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500" />
            <span className="text-stone-300 text-xs sm:text-sm">Baja aceptación</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 sm:w-12 h-0.5 bg-green-500" />
            <span className="text-stone-300 text-xs sm:text-sm">Positiva</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-8 sm:w-12 h-0.5 bg-red-500"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #ef4444 0, #ef4444 5px, transparent 5px, transparent 10px)",
              }}
            />
            <span className="text-stone-300 text-xs sm:text-sm">Rechazo</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
