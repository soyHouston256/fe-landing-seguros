#!/bin/bash

# Script para probar la API de leads

echo "🧪 Probando la API de Pacífico Health Insurance..."
echo ""

# Verificar si el servidor está corriendo
echo "1. Verificando si el servidor está activo..."
curl -s http://localhost:4321/api/lead > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Servidor activo en puerto 4321"
else
    echo "❌ Servidor no activo. Ejecuta 'npm run dev' primero"
    exit 1
fi

echo ""

# Probar GET (obtener leads)
echo "2. Obteniendo leads existentes..."
curl -s http://localhost:4321/api/lead | jq '.'
echo ""

# Probar POST (crear lead)
echo "3. Creando un lead de prueba..."
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "lastname": "Usuario",
    "documentType": "DNI",
    "documentNumber": "12345678",
    "phone": "987654321",
    "email": "test@example.com"
  }' \
  http://localhost:4321/api/lead | jq '.'

echo ""
echo "4. Verificando que el lead se guardó..."
curl -s http://localhost:4321/api/lead | jq '.'

echo ""
echo "🎉 ¡Pruebas completadas!"
echo ""
echo "📋 Para usar el formulario:"
echo "  1. Abre http://localhost:4321 en tu navegador"
echo "  2. Llena el formulario en la página principal"
echo "  3. Los datos se guardarán automáticamente"
