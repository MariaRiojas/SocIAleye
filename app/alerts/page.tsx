"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AlertsFilters } from "@/components/alerts/alerts-filters"
import { AlertsList } from "@/components/alerts/alerts-list"

export default function AlertsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [filters, setFilters] = useState({
    level: "primaria",
    grade: "1",
    section: "A",
    severity: "all",
    status: "active",
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  if (!user) return null

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
    </DashboardLayout>
  )
}
