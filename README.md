# Pacífico Health Insurance Landing Page

Este es un proyecto **Astro** completo que replica la landing page de seguros de salud de Pacífico con **funcionalidad de guardado de leads**. Está diseñado para ser fácil de entender, mantener y usar en producción.

## 🚀 Estructura del Proyecto

```
pacifico-health-insurance/
├── public/                 # Archivos estáticos (imágenes, favicons, etc.)
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Header.astro   # Navegación principal
│   │   ├── Hero.astro     # Sección principal con formulario FUNCIONAL
│   │   ├── Benefits.astro # Sección de beneficios del seguro
│   │   └── Footer.astro   # Pie de página
│   ├── layouts/
│   │   └── Layout.astro   # Layout base con HTML estructura
│   ├── pages/
│   │   ├── index.astro    # Página principal
│   │   ├── admin.astro    # Panel admin para ver leads
│   │   └── api/
│   │       └── lead.ts    # API para guardar/obtener leads
│   └── styles/            # Estilos adicionales (si necesitas)
├── astro.config.mjs       # Configuración de Astro (server mode)
├── tailwind.config.mjs    # Configuración de Tailwind CSS
├── test-api.sh           # Script para probar la API
└── package.json           # Dependencias del proyecto
```

## 🎨 Características

### ✅ UI/UX
- **Modular**: Cada sección está en su propio componente
- **Responsive**: Adaptado para mobile, tablet y desktop
- **Tailwind CSS**: Styling moderno y consistente
- **Accesible**: Estructura semántica y navegación por teclado
- **Performante**: Optimizado con Astro para carga rápida

### ✅ Funcionalidad Backend
- **API REST**: Endpoints para guardar y obtener leads
- **Validaciones**: Frontend y backend validation
- **Estados de UI**: Loading, success, error feedback
- **Persistencia**: Leads guardados en memoria (fácil migrar a DB)
- **Panel Admin**: Vista para administrar leads guardados

## 🛠️ Comandos

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                        |
| `npm run dev`             | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Construye el sitio para producción en `./dist/`     |
| `npm run preview`         | Vista previa del build local antes de deployment    |
| `chmod +x test-api.sh && ./test-api.sh` | Prueba la API de leads |

## 🎯 Cómo usar

### 1. Configuración inicial
```bash
cd pacifico-health-insurance
npm install
npm run dev
```

### 2. Usar el formulario
1. Abre `http://localhost:4321` en tu navegador
2. Llena el formulario en la sección principal
3. Los datos se validan y guardan automáticamente
4. Recibes feedback inmediato (success/error)

### 3. Ver leads guardados
1. Ve a `http://localhost:4321/admin`
2. Ver estadísticas y lista de leads
3. Exportar datos a CSV
4. Auto-refresh cada 30 segundos

### 4. Probar la API directamente
```bash
# Obtener todos los leads
curl http://localhost:4321/api/lead

# Crear un nuevo lead
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Max",
    "lastname": "Ramirez",
    "documentType": "DNI",
    "documentNumber": "46972239",
    "phone": "918981291",
    "email": "max@gmail.com"
  }' \
  http://localhost:4321/api/lead
```

## 📋 API Endpoints

### `POST /api/lead`
Guarda un nuevo lead.

**Body:**
```json
{
  "name": "string",
  "lastname": "string", 
  "documentType": "DNI|CE|Pasaporte",
  "documentNumber": "string",
  "phone": "string",
  "email": "string"
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Lead guardado exitosamente",
  "leadId": "1234567890"
}
```

### `GET /api/lead`
Obtiene todos los leads guardados.

**Respuesta:**
```json
{
  "success": true,
  "leads": [...],
  "total": 5
}
```

## 🔧 Validaciones

### Frontend (JavaScript)
- Email válido
- Documento mínimo 8 dígitos
- Teléfono mínimo 9 dígitos
- Todos los campos requeridos
- Feedback visual en tiempo real

### Backend (API)
- Validación de tipos de datos
- Duplicados por email/documento
- Formato de email
- Longitud mínima de campos
- Content-Type validation

## 🎨 Personalización

### Colores
Los colores están definidos en `tailwind.config.mjs`:
```js
colors: {
  'pacifico-blue': '#4A90E2',
  'pacifico-light-blue': '#6BB6FF', 
  'pacifico-dark-blue': '#2C5282',
  'pacifico-pink': '#E53E8C',
  'pacifico-gray': '#F7FAFC',
}
```

### Componentes
Cada componente es independiente:

1. **Header.astro**: Logo y navegación
2. **Hero.astro**: Formulario principal con validaciones
3. **Benefits.astro**: Beneficios del seguro
4. **Footer.astro**: Información de contacto

### Base de datos
Actualmente usa un array en memoria. Para migrar a DB real:

1. Instala tu driver de DB (MySQL, PostgreSQL, MongoDB, etc.)
2. Modifica `src/pages/api/lead.ts`
3. Reemplaza el array `leads` con queries a tu DB

## 📱 Responsive Design

- **Mobile**: Formulario optimizado touch
- **Tablet**: Layout adaptativo
- **Desktop**: Experiencia completa

## 🚀 Producción

### Para deployment estático (sin API):
```bash
# Cambiar astro.config.mjs a output: 'static'
npm run build
# Subir ./dist/ a tu hosting
```

### Para deployment con servidor (con API):
```bash
# Mantener astro.config.mjs con output: 'server'
npm run build
# Usar adapter específico (Vercel, Netlify, Node.js, etc.)
```

## 🔍 Debugging

### Logs
Los leads se logean en la consola del servidor:
```bash
# En terminal donde ejecutas npm run dev
Nuevo lead guardado: { name: "...", email: "..." }
Total leads: 5
```

### Testing
```bash
# Probar API completa
./test-api.sh

# O manualmente
curl http://localhost:4321/api/lead
```

## 📈 Próximos pasos

1. **Base de datos real**: Migrar de memoria a PostgreSQL/MySQL
2. **Autenticación**: Proteger panel admin
3. **Email automation**: Enviar confirmación automática
4. **CRM integration**: Conectar con Salesforce/HubSpot
5. **Analytics**: Google Analytics, pixels de tracking
6. **A/B testing**: Diferentes versiones del formulario

## 🎉 ¡Listo para usar!

El proyecto incluye todo lo necesario para:
- ✅ Capturar leads reales
- ✅ Validar datos
- ✅ Gestionar información
- ✅ Escalar a producción

¡Solo necesitas `npm run dev` y empezar a recibir leads! 🚀
