"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DashboardFilters } from "@/components/dashboard/dashboard-filters"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { ClassroomOverview } from "@/components/dashboard/classroom-overview"
import { AIChatbot } from "@/components/ai-chatbot/ai-chatbot"
import { LayoutDashboard } from "lucide-react"

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
        {/* Header armonizado */}
        <div className="border-b-2 border-amber-500 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-amber-400">Dashboard General</h1>
              <p className="text-slate-400 mt-1 text-sm sm:text-base font-medium">
                Monitoreo de dinámicas sociales y alertas tempranas
              </p>
            </div>
          </div>
        </div>

        <DashboardFilters filters={filters} onFiltersChange={setFilters} />
        <DashboardStats filters={filters} />
        <ClassroomOverview filters={filters} />
      </div>
    </DashboardLayout>
  )
}