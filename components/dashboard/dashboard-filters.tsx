"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface DashboardFiltersProps {
  filters: {
    level: string
    grade: string
    section: string
  }
  onFiltersChange: (filters: any) => void
}

export function DashboardFilters({ filters, onFiltersChange }: DashboardFiltersProps) {
  const levels = ["primaria", "secundaria"]
  const primaryGrades = ["1", "2", "3", "4", "5", "6"]
  const secondaryGrades = ["1", "2", "3", "4", "5"]
  const sections = ["A", "B", "C", "D"]

  const grades = filters.level === "primaria" ? primaryGrades : secondaryGrades

  return (
    <Card className="border-2 border-[#E67E22]  p-4 sm:p-6 shadow-md">
      <div className="border-b-2 border-[#E67E22] pb-3 mb-4">
        <h3 className="text-lg font-bold text-[#E67E22]">Filtros de Búsqueda</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#FFFFFF]">Nivel Educativo</label>
          <div className="flex gap-2 w-full">
            {levels.map((level) => (
              <Button
                key={level}
                variant={filters.level === level ? "default" : "outline"}
                size="sm"
                onClick={() => onFiltersChange({ ...filters, level, grade: "1" })}
                className={`flex-1 font-semibold ${
                  filters.level === level ? "bg-[#E67E22] hover:bg-[#D35400] text-white" : "border-2 border-[#E67E22]/30 text-[#1A1F2E] hover:border-[#E67E22]"
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-[#FFFFF]">Grado</label>
          <select
            value={filters.grade}
            onChange={(e) => onFiltersChange({ ...filters, grade: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#FAFBFC] border-2 border-[#E67E22]/30 text-[#1A1F2E] text-sm font-medium focus:outline-none focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/30"
          >
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                {filters.level === "primaria" ? `${grade}° Primaria` : `${grade}° Secundaria`}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-[#FFFFF]">Sección</label>
          <select
            value={filters.section}
            onChange={(e) => onFiltersChange({ ...filters, section: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#FAFBFC] border-2 border-[#E67E22]/30 text-[#1A1F2E] text-sm font-medium focus:outline-none focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/30"
          >
            {sections.map((section) => (
              <option key={section} value={section}>
                Sección {section}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <Button className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-bold text-sm sm:text-base py-2">
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </Card>
  )
}
