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
      <Card className="border-2 border-[#E67E22] bg-white p-6 sm:p-8 space-y-6 shadow-md">
        <div className="border-b-2 border-[#E67E22] pb-3 mb-2">
          <h2 className="text-2xl font-bold text-[#E67E22]">Acceso a SocIAleye</h2>
          <p className="text-sm text-[#6B7280] mt-1">Ingresa con tus credenciales institucionales</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1A1F2E]">Email Institucional</label>
            <Input
              type="email"
              placeholder="profesor@colegio.edu.pe"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#FAFBFC] border-2 border-[#E67E22]/30 text-[#1A1F2E] placeholder:text-[#6B7280] focus:border-[#E67E22]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1A1F2E]">Contraseña</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#FAFBFC] border-2 border-[#E67E22]/30 text-[#1A1F2E] placeholder:text-[#6B7280] focus:border-[#E67E22]"
            />
          </div>

          {error && (
            <div className="flex gap-2 p-3 rounded-lg bg-[#D63031]/10 border-2 border-[#D63031]">
              <AlertCircle className="w-5 h-5 text-[#D63031] flex-shrink-0 mt-0.5 font-bold" />
              <p className="text-sm text-[#D63031] font-medium">{error}</p>
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-bold py-2 text-base">
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>
      </Card>

      <Card className="border-2 border-[#E67E22]/30 bg-gradient-to-r from-[#FEF3E2] to-white p-4 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-6 bg-[#E67E22] rounded"></div>
          <p className="text-sm font-bold text-[#1A1F2E]">Credenciales de Demostración:</p>
        </div>
        <div className="space-y-2.5 text-xs">
          <p className="bg-white p-2 rounded border-l-4 border-[#E67E22]">
            <span className="text-[#E67E22] font-bold">👨‍💼 Administrador:</span> <span className="text-[#6B7280]">admin@colegio.edu.pe / admin123</span>
          </p>
          <p className="bg-white p-2 rounded border-l-4 border-[#1B5E8F]">
            <span className="text-[#1B5E8F] font-bold">👨‍🏫 Profesor:</span> <span className="text-[#6B7280]">profesor@colegio.edu.pe / prof123</span>
          </p>
          <p className="bg-white p-2 rounded border-l-4 border-[#2D7A4F]">
            <span className="text-[#2D7A4F] font-bold">👨‍⚕️ Psicólogo:</span> <span className="text-[#6B7280]">psicologo@colegio.edu.pe / psico123</span>
          </p>
        </div>
      </Card>
    </div>
  )
}
