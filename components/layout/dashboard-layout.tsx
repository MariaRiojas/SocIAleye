"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, Map, AlertTriangle, Home, Settings, Calendar, Users } from "lucide-react"
import Link from "next/link"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Cerrar sidebar al cambiar de ruta en móvil
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const baseNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/sociometric-map", label: "Mapa Sociométrico", icon: Map },
    { href: "/alerts", label: "Alertas Tempranas", icon: AlertTriangle },
    { href: "/profiles", label: "Perfiles", icon: Users },
    { href: "/reports", label: "Reportes", icon: AlertTriangle },
  ]

  const adminNavItems = [
    ...baseNavItems,
    { href: "/cyberbullying", label: "Ciberbullying", icon: AlertTriangle },
    { href: "/admin", label: "Panel Admin", icon: Settings },
  ]

  const teacherNavItems = [
    ...baseNavItems,
    { href: "/cyberbullying", label: "Ciberbullying", icon: AlertTriangle },
    { href: "/appointments", label: "Citas", icon: Calendar },
  ]

  const psychologistNavItems = [
    ...baseNavItems,
    { href: "/cyberbullying", label: "Ciberbullying", icon: AlertTriangle },
    { href: "/appointments", label: "Mis Citas", icon: Calendar },
  ]

  const getNavItems = () => {
    switch (user?.role) {
      case "admin":
        return adminNavItems
      case "teacher":
        return teacherNavItems
      case "psychologist":
        return psychologistNavItems
      default:
        return baseNavItems
    }
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

  const getRoleColor = () => {
    switch (user?.role) {
      case "admin":
        return "from-blue-500 to-cyan-500"
      case "teacher":
        return "from-green-500 to-emerald-500"
      case "psychologist":
        return "from-purple-500 to-pink-500"
      default:
        return "from-slate-500 to-slate-600"
    }
  }

  const isActiveRoute = (href: string) => {
    return pathname === href
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      {/* Sidebar - Solo iconos colapsado, expandible en móvil */}
      <aside
        className={`
          fixed left-0 top-0 h-screen bg-slate-800 border-r border-slate-700 
          transition-all duration-300 z-50 flex flex-col
          ${sidebarOpen ? "w-64" : "w-16"}
        `}
      >
        {/* Header del Sidebar */}
        <div className="flex-shrink-0 p-3 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen ? (
            <>
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getRoleColor()} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-white block text-sm truncate">SocIAleye</span>
                  <span className="text-xs text-slate-400 block truncate">{getRoleLabel()}</span>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-full p-2 hover:bg-slate-700 rounded-lg transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5 text-slate-400 mx-auto" />
            </button>
          )}
        </div>

        {/* Navegación - Scrollable */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
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
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    }
                    ${!sidebarOpen && "justify-center"}
                  `}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </button>
              </Link>
            )
          })}
        </nav>

        {/* Botón de Logout - Fixed en la parte inferior */}
        <div className="flex-shrink-0 p-3 border-t border-slate-700 bg-slate-800">
          <Button
            onClick={handleLogout}
            variant="outline"
            className={`
              w-full border-slate-600 text-slate-300 hover:bg-slate-700 
              hover:text-white hover:border-slate-500 bg-transparent text-sm 
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

      {/* Main Content */}
      <main className="ml-16 min-h-screen">
        <div className="h-screen overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full">{children}</div>
        </div>
      </main>
    </div>
  )
}
