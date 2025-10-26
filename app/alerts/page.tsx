"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AlertsFilters } from "@/components/alerts/alerts-filters"
import { AlertsList } from "@/components/alerts/alerts-list"
import { AIChatbot } from "@/components/ai-chatbot/ai-chatbot"

export default function AlertsPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [filters, setFilters] = useState({
    level: "primaria",
    grade: "1",
    section: "A",
    severity: "all",
    status: "active",
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  const chatbotContext = `Gestión de Alertas - ${filters.level === "primaria" ? "Primaria" : "Secundaria"} ${filters.grade}° ${filters.section}`

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de Alertas Tempranas</h1>
          <p className="text-slate-400 mt-2">Monitoreo y respuesta a patrones de riesgo</p>
        </div>

        <AlertsFilters filters={filters} onFiltersChange={setFilters} />
        <AlertsList filters={filters} />
      </div>

      <AIChatbot pageContext={chatbotContext} />
    </DashboardLayout>
  )
}
