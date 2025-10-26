"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const demoAccounts = {
    admin: { email: "admin@colegio.edu.pe", password: "admin123", role: "admin" as const },
    teacher: { email: "profesor@colegio.edu.pe", password: "prof123", role: "teacher" as const },
    psychologist: { email: "psicologo@colegio.edu.pe", password: "psico123", role: "psychologist" as const },
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    console.log("[v0] Login attempt with email:", email)

    // Validate credentials
    const account = Object.values(demoAccounts).find((acc) => acc.email === email && acc.password === password)

    if (account) {
      console.log("[v0] Login successful for role:", account.role)
      login(email, account.role)
      router.push("/dashboard")
    } else {
      console.log("[v0] Login failed - invalid credentials")
      setError("Credenciales inválidas. Verifica email y contraseña.")
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-700 bg-slate-800/50 backdrop-blur p-6 sm:p-8 space-y-6">
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
      </Card>

      <Card className="border-slate-700 bg-slate-800/30 backdrop-blur p-4">
        <p className="text-xs font-semibold text-slate-300 mb-3">Credenciales de Demo:</p>
        <div className="space-y-2 text-xs text-slate-400">
          <p>
            <span className="text-blue-400 font-medium">Administrador:</span> admin@colegio.edu.pe / admin123
          </p>
          <p>
            <span className="text-green-400 font-medium">Profesor:</span> profesor@colegio.edu.pe / prof123
          </p>
          <p>
            <span className="text-purple-400 font-medium">Psicólogo:</span> psicologo@colegio.edu.pe / psico123
          </p>
        </div>
      </Card>
    </div>
  )
}
