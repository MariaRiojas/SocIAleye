"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import {
  LayoutDashboard,
  Network,
  AlertTriangle,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  const getNavItems = () => {
    const baseItems = [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Mapa Sociométrico", href: "/sociometric-map", icon: Network },
      { label: "Alertas Tempranas", href: "/alerts", icon: AlertTriangle },
      { label: "Gestión de Estudiantes", href: "/students", icon: Users },
      { label: "Ciberbullying", href: "/cyberbullying", icon: Shield },
    ]

    if (user?.role === "admin") {
      baseItems.push({ label: "Panel Admin", href: "/admin", icon: Settings })
    }

    return baseItems
  }

  const getRoleLabel = () => {
    switch (user?.role) {
      case "admin":
        return "Administrador"
      case "teacher":
        return "Profesor"
      case "psychologist":
        return "Psicólogo"
      default:
        return "Usuario"
    }
  }

  const isActiveRoute = (href: string) => {
    return pathname === href
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ===== SIDEBAR CON HEADER NARANJA ===== */}
      <aside
        className={`
          fixed left-0 top-0 h-screen bg-slate-800 border-r border-slate-700 
          transition-all duration-300 z-50 flex flex-col
          ${sidebarOpen ? "w-64" : "w-16"}
        `}
      >
        {/* Header del Sidebar - GRADIENTE NARANJA */}
        <div className="flex-shrink-0 border-b border-slate-700">
          {sidebarOpen ? (
            <div className="p-3 bg-gradient-to-r from-orange-600 to-orange-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-white block text-sm truncate">SocIAleye</span>
                    <span className="text-xs text-orange-100 block truncate">{getRoleLabel()}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-gradient-to-b from-orange-600 to-orange-500">
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-full p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Abrir menú"
              >
                <Menu className="w-5 h-5 text-white mx-auto" />
              </button>
            </div>
          )}
        </div>

        {/* Navegación - Con acentos naranjas */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto overflow-x-hidden">
          {getNavItems().map((item) => {
            const Icon = item.icon
            const isActive = isActiveRoute(item.href)
            return (
              <Link key={item.href} href={item.href}>
                <button
                  className={`
                    w-full flex items-center gap-3 px-3 py-3 rounded-lg 
                    transition-all duration-200 text-sm font-medium
                    ${
                      isActive
                        ? "bg-orange-500/20 text-orange-400 border-l-4 border-orange-500 shadow-lg shadow-orange-500/10"
                        : "text-slate-300 hover:bg-slate-700 hover:text-orange-300"
                    }
                    ${!sidebarOpen && "justify-center"}
                  `}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-orange-400" : ""}`} />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </button>
              </Link>
            )
          })}
        </nav>

        {/* Botón de Logout */}
        <div className="flex-shrink-0 p-3 border-t border-slate-700 bg-slate-800">
          <Button
            onClick={handleLogout}
            variant="outline"
            className={`
              w-full border-slate-600 text-slate-300 hover:bg-slate-700 
              hover:text-orange-400 hover:border-orange-500/50 bg-transparent text-sm 
              transition-colors
              ${!sidebarOpen && "px-2"}
            `}
            title={!sidebarOpen ? "Cerrar Sesión" : undefined}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="ml-2 truncate">Cerrar Sesión</span>}
          </Button>
        </div>
      </aside>

      {/* ===== CONTENIDO PRINCIPAL CON FONDO OSCURO ===== */}
      <main className="ml-16 min-h-screen bg-slate-900">
        <div className="h-screen overflow-y-auto bg-slate-900">
          <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}