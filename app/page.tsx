import { LoginForm } from "@/components/auth/login-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold text-white">SocIAleye</span>
          </div>
          <p className="text-slate-400">Plataforma de Prevención de Bullying Escolar</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
