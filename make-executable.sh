#!/bin/bash

echo "🎯 Configurando permisos de archivos ejecutables..."

# Hacer ejecutables los scripts
chmod +x setup.sh
chmod +x test-api.sh

echo "✅ Permisos configurados correctamente"
echo ""
echo "📋 Scripts disponibles:"
echo "  ./setup.sh   - Configuración inicial del proyecto"
echo "  ./test-api.sh - Pruebas de la API de leads"
