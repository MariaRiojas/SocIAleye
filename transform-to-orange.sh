#!/bin/bash

# =====================================================
# SCRIPT CORREGIDO - TEMA OSCURO CON ACENTOS NARANJAS
# Mantiene fondo oscuro (slate/stone) + botones naranja
# Color principal: #F97316 (orange-500)
# =====================================================

echo "🍊 Transformación a Tema Oscuro con Acentos Naranjas..."
echo "Manteniendo fondo oscuro profesional"
echo ""

PROJECT_DIR="${1:-.}"

if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ Error: Directorio $PROJECT_DIR no encontrado"
    exit 1
fi

echo "📁 Trabajando en: $PROJECT_DIR"
echo ""

# Función para reemplazos
replace_in_files() {
    local old="$1"
    local new="$2"
    local desc="$3"
    
    find "$PROJECT_DIR" -type f \( -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" \) \
        ! -path "*/node_modules/*" \
        ! -path "*/.next/*" \
        ! -path "*/out/*" \
        -exec grep -l "$old" {} \; 2>/dev/null | while read file; do
        sed -i "s/$old/$new/g" "$file" 2>/dev/null
    done
    echo "  ✅ $desc"
}

# =====================================================
# 1. CAMBIAR SOLO COLORES DE ACENTO (no fondos)
# =====================================================

echo "🎨 Cambiando colores de ACENTO (azul -> naranja)..."
echo ""

# --- BOTONES Y ELEMENTOS INTERACTIVOS ---
echo "🔘 Botones..."

# Backgrounds de botones: blue -> orange
replace_in_files 'bg-blue-600' 'bg-orange-600' "bg-blue-600 -> bg-orange-600"
replace_in_files 'bg-blue-700' 'bg-orange-700' "bg-blue-700 -> bg-orange-700"
replace_in_files 'bg-blue-500' 'bg-orange-500' "bg-blue-500 -> bg-orange-500"
replace_in_files 'bg-blue-400' 'bg-orange-400' "bg-blue-400 -> bg-orange-400"

# Hover de botones
replace_in_files 'hover:bg-blue-600' 'hover:bg-orange-600' "hover:bg-blue-600 -> hover:bg-orange-600"
replace_in_files 'hover:bg-blue-700' 'hover:bg-orange-700' "hover:bg-blue-700 -> hover:bg-orange-700"
replace_in_files 'hover:bg-blue-500' 'hover:bg-orange-500' "hover:bg-blue-500 -> hover:bg-orange-500"

# Active states
replace_in_files 'active:bg-blue-' 'active:bg-orange-' "active:bg-blue-* -> active:bg-orange-*"

# --- TEXTO DE ACENTO ---
echo ""
echo "✏️ Texto de acento..."

replace_in_files 'text-blue-300' 'text-orange-300' "text-blue-300 -> text-orange-300"
replace_in_files 'text-blue-400' 'text-orange-400' "text-blue-400 -> text-orange-400"
replace_in_files 'text-blue-500' 'text-orange-500' "text-blue-500 -> text-orange-500"
replace_in_files 'text-blue-600' 'text-orange-600' "text-blue-600 -> text-orange-600"

replace_in_files 'hover:text-blue-300' 'hover:text-orange-300' "hover:text-blue-300 -> hover:text-orange-300"
replace_in_files 'hover:text-blue-400' 'hover:text-orange-400' "hover:text-blue-400 -> hover:text-orange-400"

replace_in_files 'group-hover:text-blue-300' 'group-hover:text-orange-300' "group-hover:text-blue-300 -> group-hover:text-orange-300"

# --- BORDES DE ACENTO ---
echo ""
echo "🔲 Bordes de acento..."

replace_in_files 'border-blue-500' 'border-orange-500' "border-blue-500 -> border-orange-500"
replace_in_files 'border-blue-600' 'border-orange-600' "border-blue-600 -> border-orange-600"
replace_in_files 'border-blue-400' 'border-orange-400' "border-blue-400 -> border-orange-400"

replace_in_files 'hover:border-blue-' 'hover:border-orange-' "hover:border-blue-* -> hover:border-orange-*"

# --- FOCUS RINGS ---
echo ""
echo "🎯 Focus rings..."

replace_in_files 'focus:ring-blue-' 'focus:ring-orange-' "focus:ring-blue-* -> focus:ring-orange-*"
replace_in_files 'ring-blue-' 'ring-orange-' "ring-blue-* -> ring-orange-*"
replace_in_files 'focus:border-blue-' 'focus:border-orange-' "focus:border-blue-* -> focus:border-orange-*"
replace_in_files 'focus-visible:ring-blue-' 'focus-visible:ring-orange-' "focus-visible:ring-blue-* -> focus-visible:ring-orange-*"

# --- GRADIENTES (solo los de acento) ---
echo ""
echo "🌈 Gradientes..."

replace_in_files 'from-blue-500' 'from-orange-500' "from-blue-500 -> from-orange-500"
replace_in_files 'from-blue-600' 'from-orange-600' "from-blue-600 -> from-orange-600"
replace_in_files 'to-cyan-500' 'to-amber-500' "to-cyan-500 -> to-amber-500"
replace_in_files 'to-blue-400' 'to-orange-400' "to-blue-400 -> to-orange-400"

# Gradientes para roles
replace_in_files 'from-blue-500 to-cyan-500' 'from-orange-500 to-amber-500' "Gradiente admin"
replace_in_files 'from-green-500 to-emerald-500' 'from-orange-600 to-orange-400' "Gradiente teacher"
replace_in_files 'from-purple-500 to-pink-500' 'from-orange-700 to-orange-500' "Gradiente psychologist"

# --- COLORES HEX EN CÓDIGO ---
echo ""
echo "🔢 Colores HEX hardcoded..."

replace_in_files '"#3B82F6"' '"#F97316"' '#3B82F6 -> #F97316'
replace_in_files "'#3B82F6'" "'#F97316'" "#3B82F6 -> #F97316 (single quotes)"
replace_in_files '"#2563EB"' '"#EA580C"' '#2563EB -> #EA580C'
replace_in_files "'#2563EB'" "'#EA580C'" "#2563EB -> #EA580C (single quotes)"
replace_in_files '"#1D4ED8"' '"#C2410C"' '#1D4ED8 -> #C2410C'
replace_in_files '"#60A5FA"' '"#FB923C"' '#60A5FA -> #FB923C'

# --- BADGES Y ESTADOS ---
echo ""
echo "🏷️ Badges y estados..."

replace_in_files 'bg-blue-500/20' 'bg-orange-500/20' "bg-blue-500/20 -> bg-orange-500/20"
replace_in_files 'text-blue-400' 'text-orange-400' "text-blue-400 -> text-orange-400"
replace_in_files 'border-blue-500/30' 'border-orange-500/30' "border-blue-500/30 -> border-orange-500/30"

# =====================================================
# 2. NO TOCAR FONDOS OSCUROS (slate-800, slate-900)
# =====================================================

echo ""
echo "⚠️  Manteniendo fondos oscuros (slate-800, slate-900)..."
echo "    Los fondos NO se modifican para mantener tema oscuro"

# =====================================================
# 3. ACTUALIZACIONES ESPECÍFICAS
# =====================================================

echo ""
echo "🧩 Actualizaciones específicas..."

# Sidebar header gradient (si existe)
replace_in_files 'bg-gradient-to-r from-slate-800' 'bg-gradient-to-r from-slate-800' "Manteniendo fondo sidebar"

# Card borders - mantener slate pero añadir acento naranja donde corresponda
replace_in_files 'border-l-blue-' 'border-l-orange-' "border-l-blue-* -> border-l-orange-*"
replace_in_files 'border-t-blue-' 'border-t-orange-' "border-t-blue-* -> border-t-orange-*"

echo ""
echo "✅ Transformación completada!"
echo ""

# =====================================================
# RESUMEN
# =====================================================

echo "📊 RESUMEN DE CAMBIOS:"
echo "======================"
echo ""
echo "✅ CAMBIADO (Acentos):"
echo "  • Botones: blue-600 -> orange-600"
echo "  • Hover: blue-700 -> orange-700"
echo "  • Texto destacado: blue-400 -> orange-400"
echo "  • Bordes activos: blue-500 -> orange-500"
echo "  • Focus rings: blue -> orange"
echo "  • Gradientes: blue/cyan -> orange/amber"
echo "  • HEX codes: #3B82F6 -> #F97316"
echo ""
echo "❌ NO CAMBIADO (Fondos):"
echo "  • bg-slate-900 (fondo principal)"
echo "  • bg-slate-800 (cards)"
echo "  • bg-slate-700 (elementos)"
echo "  • text-slate-400 (texto secundario)"
echo "  • border-slate-600 (bordes)"
echo ""
echo "🎨 Resultado esperado:"
echo "  • Fondo: Oscuro profesional (slate)"
echo "  • Sidebar: Naranja en header + iconos"
echo "  • Botones: Naranja brillante (#F97316)"
echo "  • Cards: Fondo oscuro con bordes sutiles"
echo "  • Texto: Blanco/gris sobre fondo oscuro"
echo ""
echo "⚠️  IMPORTANTE:"
echo "  1. Reemplaza app/globals.css con globals-dark-orange.css"
echo "  2. Verifica que no haya restos de 'blue-' en botones"
echo "  3. El fondo DEBE ser oscuro (slate-900)"
echo ""
echo "🍊 ¡Tema oscuro con acentos naranjas institucionales listo!"