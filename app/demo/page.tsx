import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { SociometricMap } from "@/components/sociometric-map"
import { StudentProfileCard } from "@/components/student-profile-card"
import { DataLayersDashboard } from "@/components/data-layers-dashboard"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Volver</span>
          </Link>
          <h1 className="text-2xl font-bold">Demo - SocIAleye</h1>
          <div className="w-20" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Section 1: Sociometric Map */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">1. Mapa Sociométrico Interactivo</h2>
            <p className="text-muted-foreground">
              Visualización en tiempo real de las dinámicas sociales del aula. Los nodos representan estudiantes, las
              líneas sólidas conexiones positivas y las punteadas rechazos.
            </p>
          </div>
          <SociometricMap />
        </section>

        {/* Section 2: Student Profile */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">2. Ficha Individual del Estudiante</h2>
            <p className="text-muted-foreground">
              Análisis detallado con resumen sociométrico, alertas tempranas y recomendaciones personalizadas basadas en
              IA.
            </p>
          </div>
          <StudentProfileCard
            name="Juan Pérez"
            acceptanceLevel="low"
            choicesReceived={2}
            choicesEmitted={1}
            rejectionsReceived={3}
            emotionalState="concerning"
            academicPerformance="average"
            alerts={[
              {
                type: "isolation",
                message: "Aislamiento progresivo detectado en los últimos 2 meses",
                severity: "high",
              },
              {
                type: "rejection",
                message: "Rechazos concentrados del mismo grupo de 3 estudiantes",
                severity: "high",
              },
              {
                type: "emotional",
                message: "Cambio brusco en el estado emocional reportado",
                severity: "medium",
              },
            ]}
          />
        </section>

        {/* Section 3: Data Layers */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">3. Análisis Multicapa con IA</h2>
            <p className="text-muted-foreground">
              Integración de 5 capas de datos procesadas por algoritmos avanzados para generar insights profundos sobre
              el bienestar estudiantil.
            </p>
          </div>
          <DataLayersDashboard />
        </section>

        {/* CTA Section */}
        <section className="py-12 border-t border-border space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">¿Listo para transformar tu colegio?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              SocIAleye te proporciona las herramientas necesarias para detectar y prevenir el bullying antes de que
              cause daño.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Solicitar Demo Completa
            </Button>
            <Button size="lg" variant="outline">
              Descargar Presentación
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
