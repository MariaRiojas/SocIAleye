"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { SociometricMapFilters } from "@/components/sociometric/sociometric-filters"
import { SociometricMapVisualization } from "@/components/sociometric/sociometric-visualization"
import { StudentDetailPanel } from "@/components/sociometric/student-detail-panel"

export default function SociometricMapPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [filters, setFilters] = useState({
    level: "primaria",
    grade: "1",
    section: "A",
  })
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

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
          <h1 className="text-3xl font-bold text-white">Mapa Sociométrico Interactivo</h1>
          <p className="text-slate-400 mt-2">Visualización de dinámicas sociales del aula</p>
        </div>

        <SociometricMapFilters filters={filters} onFiltersChange={setFilters} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SociometricMapVisualization
              filters={filters}
              selectedStudent={selectedStudent}
              onSelectStudent={setSelectedStudent}
            />
          </div>
          <div>{selectedStudent && <StudentDetailPanel studentId={selectedStudent} filters={filters} />}</div>
        </div>
      </div>
    </DashboardLayout>
  )
}
