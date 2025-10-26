"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIChatbotProps {
  pageContext?: string
}

export function AIChatbot({ pageContext = "Dashboard general" }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hola, soy el asistente de SocIAleye. Estoy aquí para ayudarte con consultas sobre ${pageContext}. ¿En qué puedo asistirte?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Add custom scrollbar styles
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(30, 41, 59, 0.5);
        border-radius: 4px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #475569;
        border-radius: 4px;
        transition: background 0.2s ease;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #64748b;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Context-aware responses based on page
    if (pageContext.includes("Dashboard")) {
      if (lowerMessage.includes("filtro") || lowerMessage.includes("grado")) {
        return "Puedes usar los filtros en la parte superior para seleccionar el nivel (Primaria/Secundaria), grado específico y sección. Esto actualizará automáticamente todas las estadísticas y datos mostrados."
      }
      if (lowerMessage.includes("estudiante") || lowerMessage.includes("alerta")) {
        return "En el dashboard puedes ver un resumen de todos los estudiantes y sus alertas. Haz clic en cualquier estudiante para ver más detalles sobre sus métricas sociométricas y alertas tempranas."
      }
    }

    if (pageContext.includes("Mapa Sociométrico")) {
      if (lowerMessage.includes("nodo") || lowerMessage.includes("círculo")) {
        return "Cada círculo representa un estudiante. Los colores indican su nivel de aceptación: verde (alta), amarillo (media), rojo (baja). Las líneas sólidas son relaciones positivas y las punteadas son rechazos."
      }
      if (lowerMessage.includes("relación") || lowerMessage.includes("conexión")) {
        return "Las conexiones entre estudiantes muestran sus relaciones sociales. Puedes hacer clic en cualquier nodo para ver detalles específicos del estudiante y sus interacciones."
      }
    }

    if (pageContext.includes("Alertas")) {
      if (lowerMessage.includes("filtro") || lowerMessage.includes("severidad")) {
        return "Usa los filtros de severidad (Alta, Media, Baja) y estado (Activa, Resuelta, Pendiente) para encontrar las alertas que necesitas. Esto te ayudará a priorizar las intervenciones."
      }
      if (lowerMessage.includes("acción") || lowerMessage.includes("hacer")) {
        return "Para cada alerta, puedes: 1) Ver detalles del estudiante, 2) Generar una cita con el psicólogo, 3) Marcar como resuelta, 4) Agregar notas personalizadas."
      }
    }

    if (pageContext.includes("Admin")) {
      if (lowerMessage.includes("excel") || lowerMessage.includes("importar")) {
        return "Para importar estudiantes desde Excel: 1) Ve a 'Importar Datos', 2) Selecciona el archivo Excel, 3) Mapea las columnas correctamente, 4) Confirma la importación. El sistema validará automáticamente los datos."
      }
      if (lowerMessage.includes("grupo") || lowerMessage.includes("sección")) {
        return "Puedes crear y gestionar grupos/secciones desde el panel de control. Cada grupo puede tener múltiples estudiantes y será visible en los filtros del dashboard."
      }
      if (lowerMessage.includes("configuración")) {
        return "Las configuraciones incluyen: tema de diseño, parámetros del agente de IA, permisos de usuarios, y configuraciones de alertas. Accede a 'Configuraciones' en el menú principal."
      }
    }

    // Generic responses
    if (lowerMessage.includes("ayuda") || lowerMessage.includes("help")) {
      return "Puedo ayudarte con: navegación de la plataforma, interpretación de datos, uso de filtros, generación de citas, y más. ¿Hay algo específico que necesites?"
    }

    if (lowerMessage.includes("cita") || lowerMessage.includes("psicólogo")) {
      return "Para generar una cita con el psicólogo: 1) Selecciona un estudiante, 2) Haz clic en 'Generar Cita', 3) Elige fecha y hora disponible, 4) Confirma. El psicólogo recibirá la solicitud."
    }

    return "Entiendo tu pregunta. Para obtener ayuda más específica, intenta preguntar sobre: filtros, estudiantes, alertas, citas, o configuraciones. ¿Hay algo en particular que necesitas?"
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 500)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center transition-all z-40 hover:scale-110"
        aria-label="Abrir chat"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 h-96 border-slate-700 bg-slate-800 shadow-2xl flex flex-col z-50 max-w-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-700 flex-shrink-0">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-white text-sm sm:text-base truncate">Asistente SocIAleye</h3>
              <p className="text-xs text-slate-400 truncate">{pageContext}</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors flex-shrink-0 ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={messagesContainerRef}
            className="custom-scrollbar flex-1 overflow-y-auto p-3 sm:p-4 space-y-4"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#475569 rgba(30, 41, 59, 0.5)'
            }}
          >
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm ${
                    message.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-slate-700 text-slate-100 rounded-bl-none"
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-slate-100 px-3 sm:px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-slate-700 flex gap-2 flex-shrink-0">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Escribe tu pregunta..."
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 text-sm"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  )
}