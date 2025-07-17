import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import usePageTitle from '../componentes/usePageTitle';
import motelService from '../servicios/MotelService';
import { useAuth } from '../contextos/AuthContext';

const Moteles = () => {
    // Hook personalizado para cambiar título de la página
    usePageTitle('Moteles - InnovaHost | Encuentra tu motel ideal');

    // Hooks de navegación y autenticación
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    // Estado para los filtros y búsqueda
    const [busqueda, setBusqueda] = useState('');
    const [filtroUbicacion, setFiltroUbicacion] = useState('');
    const [filtroPrecio, setFiltroPrecio] = useState('');
    const [filtroCalificacion, setFiltroCalificacion] = useState('');
    const [vistaActual, setVistaActual] = useState('grid'); // 'grid' o 'list'
    const [ordenarPor, setOrdenarPor] = useState('popularidad');

    // Estado para datos de la API
    const [moteles, setMoteles] = useState([]);
    const [ubicaciones, setUbicaciones] = useState({ estados: [], ciudades: {} });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [paginacion, setPaginacion] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 12,
        total: 0
    });

    // Datos simulados de moteles
    // Función para cargar moteles desde la API
    const cargarMoteles = async () => {
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

            const response = await motelService.obtenerMoteles(filtros);
            setMoteles(response.data);
            setPaginacion(response.pagination);

        } catch (error) {
            console.error('Error cargando moteles:', error);
            setError('Error al cargar los moteles. Por favor, intenta de nuevo.');
            setMoteles([]);
        } finally {
            setCargando(false);
        }
    };

    // Función para cargar ubicaciones desde la API
    const cargarUbicaciones = async () => {
        try {
            const data = await motelService.obtenerUbicaciones();
            setUbicaciones(data);
        } catch (error) {
            console.error('Error cargando ubicaciones:', error);
        }
    };

    // Cargar datos iniciales
    useEffect(() => {
        cargarUbicaciones();
    }, []);

    // Recargar moteles cuando cambien los filtros
    useEffect(() => {
        cargarMoteles();
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


    // Función para manejar errores de imagen
    const manejarErrorImagen = (e) => {
        e.target.src = 'https://via.placeholder.com/800x600/6366f1/ffffff?text=Motel+Imagen+No+Disponible';
    };



    // Limpiar filtros
    const limpiarFiltros = () => {
        setBusqueda('');
        setFiltroUbicacion('');
        setFiltroPrecio('');
        setFiltroCalificacion('');
        setOrdenarPor('popularidad');
    };

    // Manejar click del botón "Reservar"
    const manejarReserva = (motel) => {
        if (!isAuthenticated()) {
            // Si no está logueado, redirigir al login
            navigate('/login');
        } else {
            // Si está logueado, redirigir al detalle del motel
            navigate(`/moteles/${motel.id}`);
        }
    };

    // Loading component
    if (cargando && moteles.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16" style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "multiply"
                }}>
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Encuentra tu Motel Ideal
                        </h1>
                        <p className="text-xl mb-8 opacity-90">
                            Descubre los mejores moteles con precios accesibles
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando moteles...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "multiply",
                backgroundAttachment: "fixed"
            }}>
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Encuentra tu Motel Ideal
                    </h1>
                    <p className="text-xl mb-8 opacity-90">
                        Descubre los mejores moteles con precios accesibles
                    </p>
                    
                    {/* Barra de búsqueda principal */}
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Buscar motel
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nombre o ubicación"
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Estado
                                </label>
                                <select
                                    value={filtroUbicacion}
                                    onChange={(e) => setFiltroUbicacion(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                                >
                                    <option value="">Cualquier precio</option>
                                    <option value="economico">Económico (&lt; $400)</option>
                                    <option value="medio">Medio ($400 - $600)</option>
                                    <option value="alto">Alto (&gt; $600)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Calificación
                                </label>
                                <select
                                    value={filtroCalificacion}
                                    onChange={(e) => setFiltroCalificacion(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
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
                            {paginacion.total} moteles encontrados
                        </span>
                        <button
                            onClick={limpiarFiltros}
                            className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {/* Ordenar por */}
                        <select
                            value={ordenarPor}
                            onChange={(e) => setOrdenarPor(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                                className={`px-3 py-2 ${vistaActual === 'grid' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setVistaActual('list')}
                                className={`px-3 py-2 ${vistaActual === 'list' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
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
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                        <p className="text-gray-600 mt-2">Actualizando...</p>
                    </div>
                )}

                {/* Lista de moteles */}
                {!cargando && moteles.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🏨</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            No se encontraron moteles
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Intenta ajustar tus filtros de búsqueda
                        </p>
                        <button
                            onClick={limpiarFiltros}
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                ) : (
                    <div className={vistaActual === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                        {moteles.map((motel) => (
                            <div 
                                key={motel.id} 
                                className={`bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                                    vistaActual === 'list' ? 'md:flex' : ''
                                }`}
                            >
                                {/* Imagen */}
                                <div className={`relative ${vistaActual === 'list' ? 'md:w-1/3' : ''}`}>
                                    <img
                                        src={motelService.obtenerPrimeraImagen(motel)}
                                        alt={motel.nombre}
                                        onError={manejarErrorImagen}
                                        className={`w-full object-cover transition-all duration-300 group-hover:brightness-110 ${
                                            vistaActual === 'list' ? 'h-48 md:h-full' : 'h-48'
                                        }`}
                                    />
                                    {motelService.esDestacado(motel) && (
                                        <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                            ⭐ Destacado
                                        </div>
                                    )}
                                    {!motelService.estaDisponible(motel) && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">No disponible</span>
                                        </div>
                                    )}
                                </div>

                                {/* Información */}
                                <div className={`p-6 ${vistaActual === 'list' ? 'md:w-2/3' : ''}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                            {motel.nombre}
                                        </h3>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-green-600">
                                                {motelService.formatearPrecio(motel.precio)}
                                            </div>
                                            <div className="text-sm text-gray-500">por noche</div>
                                        </div>
                                    </div>

                                    <div className="text-gray-600 mb-3">
                                        📍 {motel.ciudad}, {motel.estado}
                                    </div>

                                    <div className="flex items-center mb-3">
                                        <div className="flex items-center mr-2">
                                            {renderEstrellas(motel.calificacion)}
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {motel.calificacion} ({motel.resenas} reseñas)
                                        </span>
                                    </div>

                                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                                        {motel.descripcion}
                                    </p>

                                    {/* Servicios */}
                                    {motel.servicios && Array.isArray(motel.servicios) && motel.servicios.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {motel.servicios.slice(0, 4).map((servicio, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                                                >
                                                    {servicio}
                                                </span>
                                            ))}
                                            {motel.servicios.length > 4 && (
                                                <span className="text-purple-600 text-xs">
                                                    +{motel.servicios.length - 4} más
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Botones */}
                                    <div className="flex space-x-3">
                                        <Link
                                            to={`/motel/${motel.id}`}
                                            className="flex-1 bg-purple-600 text-white text-center py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                                        >
                                            Ver detalles
                                        </Link>
                                        <button
                                            onClick={() => manejarReserva(motel)}
                                            disabled={!motel.disponible}
                                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                                                motel.disponible
                                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            {motel.disponible ? 'Reservar' : 'No disponible'}
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

export default Moteles;
