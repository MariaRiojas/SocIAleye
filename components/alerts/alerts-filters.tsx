"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface AlertsFiltersProps {
  filters: {
    level: string
    grade: string
    section: string
    severity: string
    status: string
  }
  onFiltersChange: (filters: any) => void
}

export function AlertsFilters({ filters, onFiltersChange }: AlertsFiltersProps) {
  const levels = ["primaria", "secundaria"]
  const primaryGrades = ["1", "2", "3", "4", "5", "6"]
  const secondaryGrades = ["1", "2", "3", "4", "5"]
  const sections = ["A", "B", "C", "D"]
  const severities = ["all", "high", "medium", "low"]
  const statuses = ["active", "resolved", "monitoring"]

  const grades = filters.level === "primaria" ? primaryGrades : secondaryGrades

  return (
    <Card className="border-slate-700 bg-slate-800/50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Nivel</label>
          <div className="flex gap-2">
            {levels.map((level) => (
              <Button
                key={level}
                variant={filters.level === level ? "default" : "outline"}
                size="sm"
                onClick={() => onFiltersChange({ ...filters, level, grade: "1" })}
                className={
                  filters.level === level ? "bg-blue-600 hover:bg-blue-700" : "border-slate-600 text-slate-300"
                }
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Grado</label>
          <select
            value={filters.grade}
            onChange={(e) => onFiltersChange({ ...filters, grade: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm"
          >
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                {filters.level === "primaria" ? `${grade}° Primaria` : `${grade}° Secundaria`}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Sección</label>
          <select
            value={filters.section}
            onChange={(e) => onFiltersChange({ ...filters, section: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm"
          >
            {sections.map((section) => (
              <option key={section} value={section}>
                Sección {section}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Severidad</label>
          <select
            value={filters.severity}
            onChange={(e) => onFiltersChange({ ...filters, severity: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm"
          >
            <option value="all">Todas</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Estado</label>
          <select
            value={filters.status}
            onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm"
          >
            <option value="active">Activas</option>
            <option value="resolved">Resueltas</option>
            <option value="monitoring">Monitoreo</option>
          </select>
        </div>

        <div className="flex items-end">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Filtrar</Button>
        </div>
      </div>
    </Card>
  )
}
