import axios  from 'axios';

export async function authRegistro(request) {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}registro`,
            request,
            { headers: { 'Content-Type': 'application/json' } }
        );
        // Devuelve tanto el status como los datos
        return { status: response.status, data: response.data };
    } catch (error) {
        console.log("Error en el registro:", error);
        // Manejo de errores mejorado
        if (error.response) {
            // El servidor respondió con un error
            return { 
                status: error.response.status, 
                data: error.response.data,
                errors: error.response.data.errors || []
            };
        } else if (error.request) {
            // La petición fue hecha pero no hubo respuesta
            return { 
                status: 0, 
                data: { message: 'Error de conexión' },
                errors: ['No se pudo conectar con el servidor']
            };
        } else {
            // Algo pasó configurando la petición
            return { 
                status: 500, 
                data: { message: 'Error interno' },
                errors: ['Error interno del cliente']
            };
        }
    }
}

export async function authLogin(request) {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}login`,
            request,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log("Error en el login:", error);
        
        if (error.response) {
            // El servidor respondió con un error
            throw new Error(error.response.data.error || 'Credenciales incorrectas');
        } else if (error.request) {
            // La petición fue hecha pero no hubo respuesta
            throw new Error('Error de conexión con el servidor');
        } else {
            // Algo pasó configurando la petición
            throw new Error('Error interno del cliente');
        }
    }
}