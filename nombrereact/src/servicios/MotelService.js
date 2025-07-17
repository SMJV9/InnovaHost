// Servicio para manejar las operaciones de moteles con la API de Laravel
const API_BASE_URL = 'http://localhost:8000/api';

class MotelService {
    
    /**
     * Obtener todos los moteles con filtros
     * @param {Object} filtros - Objeto con los filtros a aplicar
     * @returns {Promise} - Promesa con los datos de los moteles
     */
    async obtenerMoteles(filtros = {}) {
        try {
            const params = new URLSearchParams();
            
            // Agregar filtros a los parámetros
            if (filtros.busqueda) params.append('busqueda', filtros.busqueda);
            if (filtros.estado) params.append('estado', filtros.estado);
            if (filtros.ciudad) params.append('ciudad', filtros.ciudad);
            if (filtros.precio) params.append('precio', filtros.precio);
            if (filtros.calificacion) params.append('calificacion', filtros.calificacion);
            if (filtros.orden) params.append('orden', filtros.orden);
            if (filtros.porPagina) params.append('por_pagina', filtros.porPagina);
            if (filtros.pagina) params.append('page', filtros.pagina);
            if (filtros.disponible !== undefined) params.append('disponible', filtros.disponible);

            const url = `${API_BASE_URL}/moteles${params.toString() ? '?' + params.toString() : ''}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Error al obtener los moteles');
            }

            // Normalizar datos de todos los moteles
            if (data.data && Array.isArray(data.data)) {
                data.data = data.data.map(motel => this.normalizarDatosMotel(motel));
            }

            return data;
        } catch (error) {
            console.error('Error en obtenerMoteles:', error);
            throw error;
        }
    }

    /**
     * Obtener un motel específico por ID
     * @param {number|string} id - ID del motel
     * @returns {Promise} - Promesa con los datos del motel
     */
    async obtenerMotel(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/moteles/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Motel no encontrado');
                }
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Error al obtener el motel');
            }

            // Normalizar datos del motel
            return this.normalizarDatosMotel(data.data);
        } catch (error) {
            console.error('Error en obtenerMotel:', error);
            throw error;
        }
    }

    /**
     * Obtener moteles destacados
     * @returns {Promise} - Promesa con los moteles destacados
     */
    async obtenerMotelesDestacados() {
        try {
            const response = await fetch(`${API_BASE_URL}/moteles/destacados`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Error al obtener moteles destacados');
            }

            // Normalizar datos de todos los moteles destacados
            if (data.data && Array.isArray(data.data)) {
                return data.data.map(motel => this.normalizarDatosMotel(motel));
            }

            return data.data;
        } catch (error) {
            console.error('Error en obtenerMotelesDestacados:', error);
            throw error;
        }
    }

    /**
     * Buscar moteles por término
     * @param {string} termino - Término de búsqueda
     * @returns {Promise} - Promesa con los resultados de búsqueda
     */
    async buscarMoteles(termino) {
        try {
            if (!termino || termino.trim() === '') {
                return [];
            }

            const response = await fetch(`${API_BASE_URL}/moteles/buscar?q=${encodeURIComponent(termino)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Error en la búsqueda');
            }

            // Normalizar datos de todos los moteles encontrados
            if (data.data && Array.isArray(data.data)) {
                return data.data.map(motel => this.normalizarDatosMotel(motel));
            }

            return data.data;
        } catch (error) {
            console.error('Error en buscarMoteles:', error);
            throw error;
        }
    }

    /**
     * Obtener ubicaciones disponibles (estados y ciudades)
     * @returns {Promise} - Promesa con las ubicaciones
     */
    async obtenerUbicaciones() {
        try {
            const response = await fetch(`${API_BASE_URL}/moteles/ubicaciones`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Error al obtener ubicaciones');
            }

            return data.data;
        } catch (error) {
            console.error('Error en obtenerUbicaciones:', error);
            throw error;
        }
    }

    /**
     * Formatear precio para mostrar
     * @param {number} precio - Precio a formatear
     * @returns {string} - Precio formateado
     */
    formatearPrecio(precio) {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(precio);
    }

    /**
     * Obtener la primera imagen de un motel
     * @param {Object} motel - Objeto del motel
     * @returns {string} - URL de la primera imagen
     */
    obtenerPrimeraImagen(motel) {
        if (motel.imagenes && Array.isArray(motel.imagenes) && motel.imagenes.length > 0) {
            return motel.imagenes[0];
        }
        return motel.foto || motel.imagen || 'https://via.placeholder.com/400x300?text=No+Image';
    }

    /**
     * Verificar disponibilidad de motel
     * @param {Object} motel - Objeto del motel
     * @returns {boolean} - True si está disponible
     */
    estaDisponible(motel) {
        return motel.disponible !== false;
    }

    /**
     * Verificar si el motel es destacado
     * @param {Object} motel - Objeto del motel
     * @returns {boolean} - True si es destacado
     */
    esDestacado(motel) {
        return motel.destacado === true;
    }

    /**
     * Normalizar datos del motel (API vs Mock)
     * @param {Object} datos - Datos del motel a normalizar
     * @returns {Object} - Motel normalizado
     */
    normalizarDatosMotel(datos) {
        // Asegurar que siempre tengamos un array de imágenes
        let imagenes = [];
        
        if (datos.imagenes && Array.isArray(datos.imagenes)) {
            imagenes = [...datos.imagenes];
        }
        
        // Si hay una imagen principal y no está en el array, agregarla al inicio
        const imagenPrincipal = datos.foto || datos.imagen;
        if (imagenPrincipal && !imagenes.includes(imagenPrincipal)) {
            imagenes.unshift(imagenPrincipal);
        }
        
        // Si no hay imágenes, usar la imagen principal
        if (imagenes.length === 0 && imagenPrincipal) {
            imagenes = [imagenPrincipal];
        }
        
        // Asegurar que servicios sea un array
        let servicios = [];
        if (datos.servicios) {
            if (Array.isArray(datos.servicios)) {
                servicios = datos.servicios;
            } else if (typeof datos.servicios === 'string') {
                try {
                    servicios = JSON.parse(datos.servicios);
                } catch (e) {
                    servicios = [datos.servicios];
                }
            }
        }
        
        // Asegurar que características sea un array
        let caracteristicas = [];
        if (datos.caracteristicas) {
            if (Array.isArray(datos.caracteristicas)) {
                caracteristicas = datos.caracteristicas;
            } else if (typeof datos.caracteristicas === 'string') {
                try {
                    caracteristicas = JSON.parse(datos.caracteristicas);
                } catch (e) {
                    caracteristicas = [datos.caracteristicas];
                }
            }
        }
        
        return {
            ...datos,
            imagenes,
            servicios,
            caracteristicas,
            // Fallbacks para campos obligatorios
            precio: datos.precio || 0,
            calificacion: datos.calificacion || 0,
            resenas: datos.resenas || datos.reviews || 0,
            disponible: datos.disponible !== false,
            destacado: datos.destacado === true
        };
    }
}

// Exportar una instancia única del servicio
const motelService = new MotelService();
export default motelService;
