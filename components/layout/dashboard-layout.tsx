"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, Map, AlertTriangle, Home, Settings, Calendar } from "lucide-react"
import Link from "next/link"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const baseNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/sociometric-map", label: "Mapa Sociométrico", icon: Map },
    { href: "/alerts", label: "Alertas Tempranas", icon: AlertTriangle },
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

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <aside
        className={`fixed left-0 top-0 h-screen bg-slate-800 border-r border-slate-700 transition-all duration-300 z-40 ${
          sidebarOpen ? "w-64" : "w-20"
        } md:relative md:translate-x-0 ${!sidebarOpen && "md:w-20"}`}
      >
        <div className="p-3 sm:p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getRoleColor()} flex items-center justify-center flex-shrink-0`}
              >
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div className="min-w-0">
                <span className="font-bold text-white block text-sm truncate">SocIAleye</span>
                <span className="text-xs text-slate-400 truncate">{getRoleLabel()}</span>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-slate-700 rounded-lg transition flex-shrink-0"
          >
            {sidebarOpen ? <X className="w-5 h-5 text-slate-400" /> : <Menu className="w-5 h-5 text-slate-400" />}
          </button>
        </div>

        <nav className="p-2 sm:p-4 space-y-1 sm:space-y-2">
          {getNavItems().map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <button className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-slate-700 transition text-slate-300 hover:text-white text-sm">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="font-medium truncate">{item.label}</span>}
                </button>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-3 right-3 sm:left-4 sm:right-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent text-sm"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="ml-2">Cerrar Sesión</span>}
          </Button>
        </div>
      </aside>

      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-0" : "md:ml-0"}`}>
        <div className="p-4 sm:p-6 md:p-8 w-full">{children}</div>
      </main>
    </div>
  )
}
