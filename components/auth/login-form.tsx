"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulación de autenticación
    if (email && password) {
      // Guardar datos de sesión en localStorage
      localStorage.setItem("user", JSON.stringify({ email, role: "teacher" }))
      router.push("/dashboard")
    } else {
      setError("Por favor completa todos los campos")
    }
    setLoading(false)
  }

  return (
    <Card className="border-slate-700 bg-slate-800/50 backdrop-blur p-8 space-y-6">
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">Email</label>
          <Input
            type="email"
            placeholder="profesor@colegio.edu.pe"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">Contraseña</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
          />
        </div>

        {error && (
          <div className="flex gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
      </form>

      <div className="text-center text-xs text-slate-400">
        <p>Demo: usa cualquier email y contraseña</p>
      </div>
    </Card>
  )
}
