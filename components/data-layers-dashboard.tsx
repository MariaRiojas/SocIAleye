"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Users, Heart, User, Building2 } from "lucide-react"

interface DataLayer {
  name: string
  icon: React.ReactNode
  description: string
  dataPoints: number
  healthScore: number
  insights: string[]
}

const dataLayers: DataLayer[] = [
  {
    name: "Académico",
    icon: <BookOpen className="w-5 h-5" />,
    description: "Rendimiento y colaboración digital",
    dataPoints: 45,
    healthScore: 78,
    insights: ["Participación en clase: 85%", "Trabajos colaborativos: 12", "Calificación promedio: 7.8"],
  },
  {
    name: "Social",
    icon: <Users className="w-5 h-5" />,
    description: "Redes reales de interacción",
    dataPoints: 32,
    healthScore: 62,
    insights: ["Conexiones positivas: 8", "Rechazos: 2", "Aislamiento: Bajo"],
  },
  {
    name: "Emocional",
    icon: <Heart className="w-5 h-5" />,
    description: "Estado emocional y bienestar",
    dataPoints: 28,
    healthScore: 71,
    insights: ["Estabilidad: 72%", "Estrés detectado: Bajo", "Tendencia: Estable"],
  },
  {
    name: "Docente",
    icon: <User className="w-5 h-5" />,
    description: "Percepción y contexto humano",
    dataPoints: 18,
    healthScore: 85,
    insights: ["Observaciones: 5", "Comportamiento: Positivo", "Participación: Alta"],
  },
  {
    name: "Institucional",
    icon: <Building2 className="w-5 h-5" />,
    description: "Variables estructurales del colegio",
    dataPoints: 24,
    healthScore: 80,
    insights: ["Clima escolar: Positivo", "Recursos: Suficientes", "Políticas: Implementadas"],
  },
]

export function DataLayersDashboard() {
  const avgHealthScore = Math.round(dataLayers.reduce((sum, layer) => sum + layer.healthScore, 0) / dataLayers.length)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Análisis Multicapa con IA</h3>
        <p className="text-muted-foreground">
          Integración de 5 capas de datos procesadas por algoritmos de Machine Learning, NLP y GenAI
        </p>
      </div>

      {/* Overall Health Score */}
      <Card className="border-border bg-background p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Puntuación de Salud General</p>
            <p className="text-4xl font-bold text-blue-400">{avgHealthScore}%</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm text-muted-foreground">Capas activas</p>
            <p className="text-3xl font-bold">{dataLayers.length}</p>
          </div>
        </div>
        <Progress value={avgHealthScore} className="h-2" />
      </Card>

      {/* Data Layers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {dataLayers.map((layer, i) => (
          <Card key={i} className="border-border bg-background p-6 space-y-4 hover:border-blue-500/50 transition">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                {layer.icon}
              </div>
              <span className="text-xs font-semibold text-muted-foreground">{layer.dataPoints} puntos</span>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">{layer.name}</h4>
              <p className="text-xs text-muted-foreground">{layer.description}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Salud</span>
                <span className="text-sm font-bold text-blue-400">{layer.healthScore}%</span>
              </div>
              <Progress value={layer.healthScore} className="h-1.5" />
            </div>

            <div className="space-y-1 pt-2 border-t border-border/50">
              {layer.insights.map((insight, j) => (
                <p key={j} className="text-xs text-muted-foreground">
                  • {insight}
                </p>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* AI Processing Info */}
      <Card className="border-border bg-card/50 p-6 space-y-4">
        <h4 className="font-semibold">Procesamiento de IA</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-blue-400">Machine Learning</p>
            <p className="text-xs text-muted-foreground">Análisis de patrones académicos y comportamentales</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-green-400">NLP</p>
            <p className="text-xs text-muted-foreground">Procesamiento de lenguaje para análisis emocional</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-purple-400">GenAI</p>
            <p className="text-xs text-muted-foreground">Generación de recomendaciones personalizadas</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
