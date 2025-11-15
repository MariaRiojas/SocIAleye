import { LoginForm } from "@/components/auth/login-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFBFC] via-white to-[#F5F7FA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#E67E22] to-[#D35400] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-3xl font-bold text-[#E67E22]">SocIAleye</span>
          </div>
          <p className="text-[#6B7280] font-medium text-lg">Plataforma de Prevención de Bullying Escolar</p>
          <p className="text-[#D1D5DB] text-sm mt-2">Sistema Integral de Detección y Análisis</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
