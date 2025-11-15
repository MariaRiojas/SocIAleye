"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Settings, Users, Upload, Palette } from "lucide-react"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("groups")

  if (user?.role !== "admin") {
    router.push("/dashboard")
    return null
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Panel de Administración</h1>
          <p className="text-sm sm:text-base text-stone-400">
            Gestiona grupos, importa datos y configura la plataforma
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="bg-stone-800 border border-stone-700 flex flex-wrap">
            <TabsTrigger value="groups" className="flex gap-2 text-xs sm:text-sm">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Gestionar Grupos</span>
              <span className="sm:hidden">Grupos</span>
            </TabsTrigger>
            <TabsTrigger value="import" className="flex gap-2 text-xs sm:text-sm">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Importar Datos</span>
              <span className="sm:hidden">Importar</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex gap-2 text-xs sm:text-sm">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Configuraciones</span>
              <span className="sm:hidden">Config</span>
            </TabsTrigger>
            <TabsTrigger value="design" className="flex gap-2 text-xs sm:text-sm">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Diseño</span>
              <span className="sm:hidden">Diseño</span>
            </TabsTrigger>
          </TabsList>

          {/* Gestionar Grupos */}
          <TabsContent value="groups" className="space-y-4">
            <Card className="border-stone-700 bg-stone-800/50 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Gestionar Grupos y Secciones</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {["Primaria 1-A", "Primaria 1-B", "Primaria 2-A", "Secundaria 1-A"].map((group) => (
                    <Card key={group} className="border-stone-600 bg-stone-700/30 p-3 sm:p-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-medium text-white text-sm sm:text-base truncate">{group}</p>
                          <p className="text-xs sm:text-sm text-stone-400">28 estudiantes</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-stone-600 text-stone-300 bg-transparent text-xs flex-shrink-0"
                        >
                          Editar
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm">Crear Nuevo Grupo</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Importar Datos */}
          <TabsContent value="import" className="space-y-4">
            <Card className="border-stone-700 bg-stone-800/50 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Importar Estudiantes desde Excel</h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-stone-600 rounded-lg p-6 sm:p-8 text-center">
                  <Upload className="w-10 sm:w-12 h-10 sm:h-12 text-stone-400 mx-auto mb-3" />
                  <p className="text-sm sm:text-base text-stone-300 mb-2">
                    Arrastra tu archivo Excel aquí o haz clic para seleccionar
                  </p>
                  <p className="text-xs text-stone-500 mb-4">Formato: .xlsx, .xls (máx. 5MB)</p>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white text-sm">Seleccionar Archivo</Button>
                </div>
                <div className="bg-stone-700/30 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-stone-300 mb-2 font-medium">Columnas esperadas:</p>
                  <ul className="text-xs text-stone-400 space-y-1">
                    <li>• Nombre completo</li>
                    <li>• Email</li>
                    <li>• Grado</li>
                    <li>• Sección</li>
                    <li>• Fecha de nacimiento</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Configuraciones */}
          <TabsContent value="settings" className="space-y-4">
            <Card className="border-stone-700 bg-stone-800/50 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Configuraciones del Agente IA</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs sm:text-sm font-medium text-stone-300">Sensibilidad de Alertas</label>
                  <input type="range" min="0" max="100" defaultValue="70" className="w-full mt-2" />
                  <p className="text-xs text-stone-400 mt-1">
                    Ajusta qué tan sensible es el sistema para detectar riesgos
                  </p>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-stone-300">Intervalo de Análisis</label>
                  <select className="w-full mt-2 bg-stone-700 border border-stone-600 text-white rounded px-3 py-2 text-sm">
                    <option>Diario</option>
                    <option>Semanal</option>
                    <option>Mensual</option>
                  </select>
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm">
                  Guardar Configuraciones
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Diseño */}
          <TabsContent value="design" className="space-y-4">
            <Card className="border-stone-700 bg-stone-800/50 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Configuraciones de Diseño</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs sm:text-sm font-medium text-stone-300">Tema</label>
                  <select className="w-full mt-2 bg-stone-700 border border-stone-600 text-white rounded px-3 py-2 text-sm">
                    <option>Oscuro (Actual)</option>
                    <option>Claro</option>
                    <option>Automático</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-stone-300">Color Primario</label>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {["#F97316", "#10B981", "#F59E0B", "#EF4444"].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded border-2 border-stone-600"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm">Guardar Diseño</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Chatbot */}
    </DashboardLayout>
  )
}
