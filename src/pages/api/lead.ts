// API endpoint para guardar leads
import type { APIRoute } from 'astro';

// Interfaz para los datos del lead
interface LeadData {
  name: string;
  lastname: string;
  documentType: string;
  documentNumber: string;
  phone: string;
  email: string;
}

// Simulamos una base de datos en memoria para este ejemplo
// En producción, esto se conectaría a una base de datos real
const leads: LeadData[] = [];

export const POST: APIRoute = async ({ request }) => {
  try {
    // Verificar que el content-type sea JSON
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Content-Type debe ser application/json' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Obtener los datos del body
    const data: LeadData = await request.json();

    // Validar campos requeridos
    const requiredFields = ['name', 'lastname', 'documentType', 'documentNumber', 'phone', 'email'];
    const missingFields = requiredFields.filter(field => !data[field as keyof LeadData]);

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Campos requeridos faltantes: ${missingFields.join(', ')}` 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Formato de email inválido' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validar número de documento
    if (data.documentNumber.length < 8) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Número de documento debe tener al menos 8 dígitos' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Verificar si el lead ya existe (por email o documento)
    const existingLead = leads.find(
      lead => lead.email === data.email || lead.documentNumber === data.documentNumber
    );

    if (existingLead) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Ya existe un registro con este email o número de documento' 
        }),
        { 
          status: 409, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Crear el lead con timestamp
    const newLead = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    // Guardar en nuestra "base de datos" (array en memoria)
    leads.push(data);

    // Log para debugging
    console.log('Nuevo lead guardado:', newLead);
    console.log('Total leads:', leads.length);

    // Respuesta exitosa
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Lead guardado exitosamente',
        leadId: newLead.id
      }),
      { 
        status: 201, 
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error procesando lead:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Error interno del servidor' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Endpoint GET para obtener todos los leads (útil para debugging)
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({ 
      success: true, 
      leads: leads,
      total: leads.length 
    }),
    { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' }
    }
  );
};
