"use client"

import { Card } from "@/components/ui/card"
import { AlertTriangle, Users, TrendingDown, Shield } from "lucide-react"

interface DashboardStatsProps {
  filters: {
    level: string
    grade: string
    section: string
  }
}

export function DashboardStats({ filters }: DashboardStatsProps) {
  const stats = [
    {
      label: "Estudiantes",
      value: "28",
      icon: Users,
      color: "from-blue-500/20 to-cyan-500/20",
      textColor: "text-blue-400",
    },
    {
      label: "Alertas Activas",
      value: "3",
      icon: AlertTriangle,
      color: "from-red-500/20 to-orange-500/20",
      textColor: "text-red-400",
    },
    {
      label: "Riesgo Bajo",
      value: "24",
      icon: Shield,
      color: "from-green-500/20 to-emerald-500/20",
      textColor: "text-green-400",
    },
    {
      label: "Tendencia",
      value: "-15%",
      icon: TrendingDown,
      color: "from-purple-500/20 to-pink-500/20",
      textColor: "text-purple-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <Card key={i} className={`border-slate-700 bg-gradient-to-br ${stat.color} p-4 sm:p-6`}>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-slate-400 text-xs sm:text-sm truncate">{stat.label}</p>
                <p className={`text-2xl sm:text-3xl font-bold mt-1 sm:mt-2 ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
              <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.textColor} opacity-50 flex-shrink-0 ml-2`} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}