import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../componentes/usePageTitle';
import hotelService from '../servicios/HotelService';

const Hoteles = () => {
    // Hook personalizado para cambiar título de la página
    usePageTitle('Hoteles - InnovaHost | Encuentra tu hotel ideal');

    // Estado para los filtros y búsqueda
    const [busqueda, setBusqueda] = useState('');
    const [filtroUbicacion, setFiltroUbicacion] = useState('');
    const [filtroPrecio, setFiltroPrecio] = useState('');
    const [filtroCalificacion, setFiltroCalificacion] = useState('');
    const [vistaActual, setVistaActual] = useState('grid'); // 'grid' o 'list'
    const [ordenarPor, setOrdenarPor] = useState('popularidad');

    // Estado para datos de la API
    const [hoteles, setHoteles] = useState([]);
    const [ubicaciones, setUbicaciones] = useState({ estados: [], ciudades: {} });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [paginacion, setPaginacion] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 12,
        total: 0
    });

    // Función para cargar hoteles desde la API
    const cargarHoteles = async () => {
        try {
            setCargando(true);
            setError(null);

            const filtros = {
                busqueda: busqueda || undefined,
                estado: filtroUbicacion || undefined,
                precio: filtroPrecio || undefined,
                calificacion: filtroCalificacion || undefined,
                orden: ordenarPor,
                porPagina: 12,
                pagina: paginacion.current_page
            };

            const response = await hotelService.obtenerHoteles(filtros);
            setHoteles(response.data);
            setPaginacion(response.pagination);

        } catch (error) {
            console.error('Error cargando hoteles:', error);
            setError('Error al cargar los hoteles. Por favor, intenta de nuevo.');
            setHoteles([]);
        } finally {
            setCargando(false);
        }
    };

    // Función para cargar ubicaciones
    const cargarUbicaciones = async () => {
        try {
            const data = await hotelService.obtenerUbicaciones();
            setUbicaciones(data);
        } catch (error) {
            console.error('Error cargando ubicaciones:', error);
        }
    };

    // Cargar datos iniciales
    useEffect(() => {
        cargarUbicaciones();
    }, []);

    // Recargar hoteles cuando cambien los filtros
    useEffect(() => {
        cargarHoteles();
    }, [busqueda, filtroUbicacion, filtroPrecio, filtroCalificacion, ordenarPor]);

    // Función para renderizar estrellas
    const renderEstrellas = (calificacion) => {
        const estrellas = [];
        const estrellasCompletas = Math.floor(calificacion);
        const tieneMediaEstrella = calificacion % 1 !== 0;

        for (let i = 0; i < estrellasCompletas; i++) {
            estrellas.push(
                <span key={i} className="text-yellow-400">★</span>
            );
        }

        if (tieneMediaEstrella) {
            estrellas.push(
                <span key="media" className="text-yellow-400">☆</span>
            );
        }

        const estrellasVacias = 5 - Math.ceil(calificacion);
        for (let i = 0; i < estrellasVacias; i++) {
            estrellas.push(
                <span key={`vacia-${i}`} className="text-gray-300">★</span>
            );
        }

        return estrellas;
    };

    // Limpiar filtros
    const limpiarFiltros = () => {
        setBusqueda('');
        setFiltroUbicacion('');
        setFiltroPrecio('');
        setFiltroCalificacion('');
        setOrdenarPor('popularidad');
    };

    // Loading component
    if (cargando && hoteles.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Encuentra tu Hotel Ideal
                        </h1>
                        <p className="text-xl mb-8 opacity-90">
                            Descubre los mejores hoteles con las mejores ofertas
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando hoteles...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Encuentra tu Hotel Ideal
                    </h1>
                    <p className="text-xl mb-8 opacity-90">
                        Descubre los mejores hoteles con las mejores ofertas
                    </p>
                    
                    {/* Barra de búsqueda principal */}
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Buscar hotel
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nombre o ubicación"
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Estado
                                </label>
                                <select
                                    value={filtroUbicacion}
                                    onChange={(e) => setFiltroUbicacion(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                >
                                    <option value="">Todos los estados</option>
                                    {ubicaciones.estados.map(estado => (
                                        <option key={estado} value={estado}>{estado}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Precio
                                </label>
                                <select
                                    value={filtroPrecio}
                                    onChange={(e) => setFiltroPrecio(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                >
                                    <option value="">Cualquier precio</option>
                                    <option value="economico">Económico (&lt; $1,000)</option>
                                    <option value="medio">Medio ($1,000 - $1,500)</option>
                                    <option value="alto">Alto (&gt; $1,500)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Calificación
                                </label>
                                <select
                                    value={filtroCalificacion}
                                    onChange={(e) => setFiltroCalificacion(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                >
                                    <option value="">Cualquier calificación</option>
                                    <option value="4.5">4.5+ estrellas</option>
                                    <option value="4.0">4.0+ estrellas</option>
                                    <option value="3.5">3.5+ estrellas</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filtros y controles */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="flex flex-wrap items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <span className="text-gray-700 font-medium">
                            {paginacion.total} hoteles encontrados
                        </span>
                        <button
                            onClick={limpiarFiltros}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {/* Ordenar por */}
                        <select
                            value={ordenarPor}
                            onChange={(e) => setOrdenarPor(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="popularidad">Más popular</option>
                            <option value="calificacion">Mejor calificación</option>
                            <option value="precio-asc">Precio: menor a mayor</option>
                            <option value="precio-desc">Precio: mayor a menor</option>
                        </select>
                        
                        {/* Vista */}
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setVistaActual('grid')}
                                className={`px-3 py-2 ${vistaActual === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setVistaActual('list')}
                                className={`px-3 py-2 ${vistaActual === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Error message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                {/* Loading indicator */}
                {cargando && (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-600 mt-2">Actualizando...</p>
                    </div>
                )}

                {/* Lista de hoteles */}
                {!cargando && hoteles.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🏨</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            No se encontraron hoteles
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Intenta ajustar tus filtros de búsqueda
                        </p>
                        <button
                            onClick={limpiarFiltros}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                ) : (
                    <div className={vistaActual === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                        {hoteles.map((hotel) => (
                            <div 
                                key={hotel.id} 
                                className={`bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                                    vistaActual === 'list' ? 'md:flex' : ''
                                }`}
                            >
                                {/* Imagen */}
                                <div className={`relative ${vistaActual === 'list' ? 'md:w-1/3' : ''}`}>
                                    <img
                                        src={hotelService.obtenerPrimeraImagen(hotel)}
                                        alt={hotel.nombre}
                                        className={`w-full object-cover transition-all duration-300 group-hover:brightness-110 ${
                                            vistaActual === 'list' ? 'h-48 md:h-full' : 'h-48'
                                        }`}
                                    />
                                    {hotelService.esDestacado(hotel) && (
                                        <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                            ⭐ Destacado
                                        </div>
                                    )}
                                    {!hotelService.estaDisponible(hotel) && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">No disponible</span>
                                        </div>
                                    )}
                                </div>

                                {/* Información */}
                                <div className={`p-6 ${vistaActual === 'list' ? 'md:w-2/3' : ''}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {hotel.nombre}
                                        </h3>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-green-600">
                                                {hotelService.formatearPrecio(hotel.precio)}
                                            </div>
                                            <div className="text-sm text-gray-500">por noche</div>
                                        </div>
                                    </div>

                                    <div className="text-gray-600 mb-3">
                                        📍 {hotel.ciudad}, {hotel.estado}
                                    </div>

                                    <div className="flex items-center mb-3">
                                        <div className="flex items-center mr-2">
                                            {renderEstrellas(hotel.calificacion)}
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {hotel.calificacion} ({hotel.resenas} reseñas)
                                        </span>
                                    </div>

                                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                                        {hotel.descripcion}
                                    </p>

                                    {/* Servicios */}
                                    {hotel.servicios && Array.isArray(hotel.servicios) && hotel.servicios.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {hotel.servicios.slice(0, 4).map((servicio, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                                >
                                                    {servicio}
                                                </span>
                                            ))}
                                            {hotel.servicios.length > 4 && (
                                                <span className="text-blue-600 text-xs">
                                                    +{hotel.servicios.length - 4} más
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Botones */}
                                    <div className="flex space-x-3">
                                        <Link
                                            to={`/hotel/${hotel.id}`}
                                            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            Ver detalles
                                        </Link>
                                        <button
                                            disabled={!hotelService.estaDisponible(hotel)}
                                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                                                hotelService.estaDisponible(hotel)
                                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            {hotelService.estaDisponible(hotel) ? 'Reservar' : 'No disponible'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hoteles;
