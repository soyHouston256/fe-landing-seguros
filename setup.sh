#!/bin/bash

# Script de instalación rápida para Pacífico Health Insurance

echo "🚀 Configurando proyecto Pacífico Health Insurance..."

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js primero."
    exit 1
fi

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Mostrar comandos disponibles
echo "✅ ¡Proyecto configurado exitosamente!"
echo ""
echo "📋 Comandos disponibles:"
echo "  npm run dev     - Inicia servidor de desarrollo"
echo "  npm run build   - Construye para producción"
echo "  npm run preview - Vista previa del build"
echo ""
echo "🎯 Para empezar, ejecuta: npm run dev"
echo "🌐 El sitio estará disponible en: http://localhost:4321"
