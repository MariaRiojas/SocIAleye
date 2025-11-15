"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SociometricFiltersProps {
  filters: {
    level: string
    grade: string
    section: string
  }
  onFiltersChange: (filters: any) => void
}

export function SociometricMapFilters({ filters, onFiltersChange }: SociometricFiltersProps) {
  const levels = ["primaria", "secundaria"]
  const primaryGrades = ["1", "2", "3", "4", "5", "6"]
  const secondaryGrades = ["1", "2", "3", "4", "5"]
  const sections = ["A", "B", "C", "D"]

  const grades = filters.level === "primaria" ? primaryGrades : secondaryGrades

  return (
    <Card className="border-stone-700 bg-stone-800/50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-300">Nivel</label>
          <div className="flex gap-2">
            {levels.map((level) => (
              <Button
                key={level}
                variant={filters.level === level ? "default" : "outline"}
                size="sm"
                onClick={() => onFiltersChange({ ...filters, level, grade: "1" })}
                className={
                  filters.level === level ? "bg-orange-600 hover:bg-orange-700" : "border-stone-600 text-stone-300"
                }
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-300">Grado</label>
          <select
            value={filters.grade}
            onChange={(e) => onFiltersChange({ ...filters, grade: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-stone-700 border border-stone-600 text-white text-sm"
          >
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                {filters.level === "primaria" ? `${grade}° Primaria` : `${grade}° Secundaria`}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-300">Sección</label>
          <select
            value={filters.section}
            onChange={(e) => onFiltersChange({ ...filters, section: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-stone-700 border border-stone-600 text-white text-sm"
          >
            {sections.map((section) => (
              <option key={section} value={section}>
                Sección {section}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <Button className="w-full bg-orange-600 hover:bg-orange-700">Aplicar</Button>
        </div>
      </div>
    </Card>
  )
}
