// Servicio para manejar las operaciones de hoteles con la API de Laravel
const API_BASE_URL = 'http://localhost:8000/api';

class HotelService {
    
    /**
     * Obtener todos los hoteles con filtros
     * @param {Object} filtros - Objeto con los filtros a aplicar
     * @returns {Promise} - Promesa con los datos de los hoteles
     */
    async obtenerHoteles(filtros = {}) {
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

            const url = `${API_BASE_URL}/hoteles${params.toString() ? '?' + params.toString() : ''}`;
            
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
                throw new Error(data.message || 'Error al obtener los hoteles');
            }

            // Normalizar datos de todos los hoteles
            if (data.data && Array.isArray(data.data)) {
                data.data = data.data.map(hotel => this.normalizarDatosHotel(hotel));
            }

            return data;
        } catch (error) {
            console.error('Error en obtenerHoteles:', error);
            throw error;
        }
    }

    /**
     * Obtener un hotel específico por ID
     * @param {number|string} id - ID del hotel
     * @returns {Promise} - Promesa con los datos del hotel
     */
    async obtenerHotel(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/hoteles/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Hotel no encontrado');
                }
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Error al obtener el hotel');
            }

            return data.data;
        } catch (error) {
            console.error('Error en obtenerHotel:', error);
            throw error;
        }
    }

    /**
     * Obtener hoteles destacados
     * @returns {Promise} - Promesa con los hoteles destacados
     */
    async obtenerHotelesDestacados() {
        try {
            const response = await fetch(`${API_BASE_URL}/hoteles/destacados`, {
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
                throw new Error(data.message || 'Error al obtener hoteles destacados');
            }

            // Normalizar datos de todos los hoteles destacados
            if (data.data && Array.isArray(data.data)) {
                return data.data.map(hotel => this.normalizarDatosHotel(hotel));
            }

            return data.data;
        } catch (error) {
            console.error('Error en obtenerHotelesDestacados:', error);
            throw error;
        }
    }

    /**
     * Buscar hoteles por término
     * @param {string} termino - Término de búsqueda
     * @returns {Promise} - Promesa con los resultados de búsqueda
     */
    async buscarHoteles(termino) {
        try {
            if (!termino || termino.trim() === '') {
                return [];
            }

            const response = await fetch(`${API_BASE_URL}/hoteles/buscar?q=${encodeURIComponent(termino)}`, {
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

            // Normalizar datos de todos los hoteles encontrados
            if (data.data && Array.isArray(data.data)) {
                return data.data.map(hotel => this.normalizarDatosHotel(hotel));
            }

            return data.data;
        } catch (error) {
            console.error('Error en buscarHoteles:', error);
            throw error;
        }
    }

    /**
     * Obtener ubicaciones disponibles (estados y ciudades)
     * @returns {Promise} - Promesa con las ubicaciones
     */
    async obtenerUbicaciones() {
        try {
            const response = await fetch(`${API_BASE_URL}/hoteles/ubicaciones`, {
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
     * Obtener la primera imagen de un hotel
     * @param {Object} hotel - Objeto del hotel
     * @returns {string} - URL de la primera imagen
     */
    obtenerPrimeraImagen(hotel) {
        if (hotel.imagenes && Array.isArray(hotel.imagenes) && hotel.imagenes.length > 0) {
            return hotel.imagenes[0];
        }
        return hotel.foto || 'https://via.placeholder.com/400x300?text=No+Image';
    }

    /**
     * Verificar disponibilidad de hotel
     * @param {Object} hotel - Objeto del hotel
     * @returns {boolean} - True si está disponible
     */
    estaDisponible(hotel) {
        return hotel.disponible === true || hotel.disponible === 1;
    }

    /**
     * Verificar si es hotel destacado
     * @param {Object} hotel - Objeto del hotel
     * @returns {boolean} - True si es destacado
     */
    esDestacado(hotel) {
        return hotel.destacado === true || hotel.destacado === 1;
    }

    /**
     * Buscar hoteles por término de búsqueda
     * @param {string} termino - Término de búsqueda
     * @returns {Promise} - Promesa con los hoteles encontrados
     */
    async buscarHoteles(termino) {
        try {
            console.log('Buscando hoteles en BD con término:', termino);
            
            // Usar el endpoint específico de búsqueda
            const response = await fetch(`${API_BASE_URL}/hoteles/buscar?q=${encodeURIComponent(termino)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            console.log('Respuesta de la API:', response.status);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Datos recibidos de la API:', data);
            
            if (!data.success) {
                throw new Error(data.message || 'Error al buscar hoteles');
            }

            // Normalizar datos de todos los hoteles encontrados y retornar SOLO los hoteles de la BD, sin fallback
            const hoteles = data.data || data.hoteles || [];
            if (Array.isArray(hoteles)) {
                return hoteles.map(hotel => this.normalizarDatosHotel(hotel));
            }
            return [];
            
        } catch (error) {
            console.error('Error buscando hoteles en BD:', error);
            console.log('No se usarán datos de fallback - solo BD');
            
            // Retornar array vacío si hay error - NO datos de ejemplo
            return [];
        }
    }

    /**
     * Obtener un hotel específico por ID
     * @param {string|number} id - ID del hotel
     * @returns {Promise} - Promesa con los datos del hotel
     */
    async obtenerHotel(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/hoteles/${id}`, {
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
                throw new Error(data.message || 'Error al obtener el hotel');
            }

            // Normalizar datos del hotel
            return this.normalizarDatosHotel(data.data);
        } catch (error) {
            console.error('Error en obtenerHotel:', error);
            throw error;
        }
    }

    /**
     * Normalizar datos del hotel (API vs Mock)
     * @param {Object} datos - Datos del hotel a normalizar
     * @returns {Object} - Hotel normalizado
     */
    normalizarDatosHotel(datos) {
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
            imagen: imagenPrincipal || (imagenes.length > 0 ? imagenes[0] : null),
            imagenes: imagenes.length > 0 ? imagenes : ['https://via.placeholder.com/800x600/3b82f6/ffffff?text=Sin+Imagen'],
            servicios: servicios,
            caracteristicas: caracteristicas
        };
    }
}

// Crear instancia única del servicio
const hotelService = new HotelService();

export default hotelService;
