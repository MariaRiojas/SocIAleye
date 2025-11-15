"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DashboardFilters } from "@/components/dashboard/dashboard-filters"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { ClassroomOverview } from "@/components/dashboard/classroom-overview"
import { AIChatbot } from "@/components/ai-chatbot/ai-chatbot"

export default function Dashboard() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [filters, setFilters] = useState({
    level: "primaria",
    grade: "1",
    section: "A",
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  const chatbotContext = `Dashboard - ${filters.level === "primaria" ? "Primaria" : "Secundaria"} ${filters.grade}° ${filters.section}`

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
        {/* Header con título naranja */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-orange-500">Dashboard General</h1>
          <p className="text-slate-400 mt-1 sm:mt-2 text-sm sm:text-base">
            Monitoreo de dinámicas sociales y alertas tempranas
          </p>
          {/* Línea decorativa naranja */}
          <div className="h-1 w-24 bg-orange-500 mt-3 rounded-full"></div>
        </div>

        <DashboardFilters filters={filters} onFiltersChange={setFilters} />
        <DashboardStats filters={filters} />
        <ClassroomOverview filters={filters} />
      </div>

      
    </DashboardLayout>
  )
}