import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import usePageTitle from '../componentes/usePageTitle';
import { useAuth } from '../contextos/AuthContext';

const Servicios = () => {
    // Hook personalizado para cambiar título de la página
    usePageTitle('Servicios - InnovaHost | Descubre nuestros servicios premium');

    // Hooks de navegación y autenticación
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    // Estado para los filtros y búsqueda
    const [busqueda, setBusqueda] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroPrecio, setFiltroPrecio] = useState('');
    const [filtroDisponibilidad, setFiltroDisponibilidad] = useState('');
    const [vistaActual, setVistaActual] = useState('grid'); // 'grid' o 'list'
    const [ordenarPor, setOrdenarPor] = useState('popularidad');

    // Estado para datos simulados (más adelante se puede conectar a API)
    const [servicios, setServicios] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [paginacion, setPaginacion] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 12,
        total: 0
    });

    // Datos simulados de servicios
    const serviciosMock = [
        {
            id: 1,
            nombre: 'Spa & Wellness',
            categoria: 'Relajación',
            precio: 850,
            duracion: '90 minutos',
            descripcion: 'Experiencia completa de relajación con masajes terapéuticos, sauna y tratamientos faciales en un ambiente de lujo.',
            imagen: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            incluye: ['Masaje relajante', 'Sauna', 'Jacuzzi', 'Tratamiento facial', 'Aromterapia'],
            disponible: true,
            destacado: true,
            horarios: '9:00 AM - 9:00 PM',
            popularidad: 245
        },
        {
            id: 2,
            nombre: 'Restaurante Gourmet',
            categoria: 'Gastronomía',
            precio: 450,
            duracion: '2 horas',
            descripcion: 'Experiencia culinaria única con menú degustación de cocina internacional y maridaje de vinos.',
            imagen: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            incluye: ['Menú degustación 5 platos', 'Maridaje de vinos', 'Chef privado', 'Ambiente romántico'],
            disponible: true,
            destacado: true,
            horarios: '6:00 PM - 11:00 PM',
            popularidad: 198
        },
        {
            id: 3,
            nombre: 'Centro de Fitness',
            categoria: 'Deporte',
            precio: 200,
            duracion: 'Acceso diario',
            descripcion: 'Gimnasio completamente equipado con entrenador personal disponible y clases grupales.',
            imagen: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            incluye: ['Acceso a gimnasio', 'Entrenador personal', 'Clases grupales', 'Piscina olímpica'],
            disponible: true,
            destacado: false,
            horarios: '5:00 AM - 11:00 PM',
            popularidad: 156
        },
        {
            id: 4,
            nombre: 'Servicio de Concierge',
            categoria: 'Asistencia',
            precio: 300,
            duracion: '24 horas',
            descripcion: 'Asistencia personalizada para reservas, tours, transporte y cualquier necesidad durante su estancia.',
            imagen: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            incluye: ['Reservas de espectáculos', 'Tours personalizados', 'Transporte privado', 'Asistencia 24/7'],
            disponible: true,
            destacado: false,
            horarios: '24 horas',
            popularidad: 134
        },
        {
            id: 5,
            nombre: 'Piscina VIP',
            categoria: 'Recreación',
            precio: 180,
            duracion: '4 horas',
            descripcion: 'Acceso exclusivo a piscina privada con servicio de bar y área de descanso premium.',
            imagen: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            incluye: ['Piscina privada', 'Servicio de bar', 'Camastros premium', 'Música ambiente'],
            disponible: true,
            destacado: true,
            horarios: '10:00 AM - 8:00 PM',
            popularidad: 189
        },
        {
            id: 6,
            nombre: 'Sala de Conferencias',
            categoria: 'Negocios',
            precio: 650,
            duracion: '8 horas',
            descripcion: 'Espacio profesional equipado con tecnología de punta para reuniones y eventos corporativos.',
            imagen: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            incluye: ['Proyector 4K', 'Sistema de sonido', 'WiFi premium', 'Servicio de catering'],
            disponible: false,
            destacado: false,
            horarios: '8:00 AM - 6:00 PM',
            popularidad: 87
        },
        {
            id: 7,
            nombre: 'Servicio de Habitación Premium',
            categoria: 'Hospitalidad',
            precio: 120,
            duracion: 'Según solicitud',
            descripcion: 'Servicio de habitación 24/7 con menú gourmet y atención personalizada.',
            imagen: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            incluye: ['Menú gourmet', 'Servicio 24/7', 'Atención personalizada', 'Bebidas premium'],
            disponible: true,
            destacado: false,
            horarios: '24 horas',
            popularidad: 167
        },
        {
            id: 8,
            nombre: 'Tour Gastronómico',
            categoria: 'Turismo',
            precio: 380,
            duracion: '5 horas',
            descripcion: 'Recorrido por los mejores restaurantes locales con degustaciones y experiencias culturales.',
            imagen: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            incluye: ['Guía especializado', 'Degustaciones', 'Transporte incluido', 'Experiencia cultural'],
            disponible: true,
            destacado: true,
            horarios: '11:00 AM - 4:00 PM',
            popularidad: 213
        }
    ];

    // Función para cargar servicios desde la API
    const cargarServicios = async () => {
        try {
            setCargando(true);
            setError(null);

            // Construir parámetros de consulta
            const params = new URLSearchParams();
            
            if (busqueda) params.append('busqueda', busqueda);
            if (filtroCategoria) params.append('categoria', filtroCategoria);
            if (filtroPrecio) params.append('precio', filtroPrecio);
            if (filtroDisponibilidad === 'disponible') params.append('disponible', 'true');
            if (filtroDisponibilidad === 'no-disponible') params.append('disponible', 'false');
            if (ordenarPor !== 'popularidad') params.append('orden', ordenarPor);
            
            params.append('por_pagina', '12');

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/servicios?${params.toString()}`);
            
            if (!response.ok) {
                throw new Error('Error al cargar los servicios');
            }

            const data = await response.json();

            if (data.success) {
                setServicios(data.data);
                setPaginacion(data.pagination);
            } else {
                throw new Error(data.message || 'Error al cargar los servicios');
            }

        } catch (error) {
            console.error('Error cargando servicios:', error);
            setError('Error al cargar los servicios. Por favor, intenta de nuevo.');
            setServicios([]);
        } finally {
            setCargando(false);
        }
    };

    // Función para cargar categorías desde la API
    const cargarCategorias = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/servicios/categorias`);
            
            if (!response.ok) {
                throw new Error('Error al cargar categorías');
            }

            const data = await response.json();

            if (data.success) {
                setCategorias(data.data);
            } else {
                throw new Error(data.message || 'Error al cargar categorías');
            }
        } catch (error) {
            console.error('Error cargando categorías:', error);
            // En caso de error, usar datos mock como fallback
            const categoriasUnicas = [...new Set(serviciosMock.map(servicio => servicio.categoria))];
            setCategorias(categoriasUnicas);
        }
    };

    // Cargar datos iniciales
    useEffect(() => {
        cargarCategorias();
    }, []);

    // Recargar servicios cuando cambien los filtros
    useEffect(() => {
        cargarServicios();
    }, [busqueda, filtroCategoria, filtroPrecio, filtroDisponibilidad, ordenarPor]);

    // Función para manejar errores de imagen
    const manejarErrorImagen = (e) => {
        e.target.src = 'https://via.placeholder.com/800x600/6366f1/ffffff?text=Servicio+Imagen+No+Disponible';
    };

    // Función para formatear precio
    const formatearPrecio = (precio) => {
        return `$${precio.toLocaleString('es-MX')}`;
    };

    // Limpiar filtros
    const limpiarFiltros = () => {
        setBusqueda('');
        setFiltroCategoria('');
        setFiltroPrecio('');
        setFiltroDisponibilidad('');
        setOrdenarPor('popularidad');
    };

    // Manejar click del botón "Contratar"
    const manejarContratacion = (servicio) => {
        if (!isAuthenticated()) {
            // Si no está logueado, redirigir al login
            navigate('/login');
        } else {
            // Si está logueado, redirigir al detalle del servicio
            navigate(`/servicios/${servicio.id}`);
        }
    };

    // Función para obtener icono de categoría
    const obtenerIconoCategoria = (categoria) => {
        switch (categoria) {
            case 'Relajación': return '🧘‍♀️';
            case 'Gastronomía': return '🍽️';
            case 'Deporte': return '💪';
            case 'Asistencia': return '🛎️';
            case 'Recreación': return '🏊‍♂️';
            case 'Negocios': return '💼';
            case 'Hospitalidad': return '🏨';
            case 'Turismo': return '🗺️';
            default: return '✨';
        }
    };

    // Loading component
    if (cargando && servicios.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16" style={{
                    backgroundImage: "url('https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "multiply"
                }}>
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Servicios Premium
                        </h1>
                        <p className="text-xl mb-8 opacity-90">
                            Descubre experiencias únicas que harán tu estancia inolvidable
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando servicios...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16" style={{
                backgroundImage: "url('https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "multiply",
                backgroundAttachment: "fixed"
            }}>
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Servicios Premium
                    </h1>
                    <p className="text-xl mb-8 opacity-90">
                        Descubre experiencias únicas que harán tu estancia inolvidable
                    </p>
                    
                    {/* Barra de búsqueda principal */}
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Buscar servicio
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nombre o descripción"
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Categoría
                                </label>
                                <select
                                    value={filtroCategoria}
                                    onChange={(e) => setFiltroCategoria(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                >
                                    <option value="">Todas las categorías</option>
                                    {categorias.map(categoria => (
                                        <option key={categoria} value={categoria}>{categoria}</option>
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
                                    <option value="economico">Económico (&lt; $250)</option>
                                    <option value="medio">Medio ($250 - $500)</option>
                                    <option value="alto">Alto (&gt; $500)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Disponibilidad
                                </label>
                                <select
                                    value={filtroDisponibilidad}
                                    onChange={(e) => setFiltroDisponibilidad(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                >
                                    <option value="">Todos</option>
                                    <option value="disponible">Disponibles</option>
                                    <option value="no-disponible">No disponibles</option>
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
                            {paginacion.total} servicios encontrados
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
                            <option value="precio-asc">Precio: menor a mayor</option>
                            <option value="precio-desc">Precio: mayor a menor</option>
                            <option value="alfabetico">Alfabético</option>
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

                {/* Lista de servicios */}
                {!cargando && servicios.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">✨</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            No se encontraron servicios
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
                        {servicios.map((servicio) => (
                            <div 
                                key={servicio.id} 
                                className={`bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                                    vistaActual === 'list' ? 'md:flex' : ''
                                }`}
                            >
                                {/* Imagen */}
                                <div className={`relative ${vistaActual === 'list' ? 'md:w-1/3' : ''}`}>
                                    <img
                                        src={servicio.imagen}
                                        alt={servicio.nombre}
                                        onError={manejarErrorImagen}
                                        className={`w-full object-cover transition-all duration-300 group-hover:brightness-110 ${
                                            vistaActual === 'list' ? 'h-48 md:h-full' : 'h-48'
                                        }`}
                                    />
                                    {servicio.destacado && (
                                        <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                            ⭐ Destacado
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                                        {obtenerIconoCategoria(servicio.categoria)} {servicio.categoria}
                                    </div>
                                    {!servicio.disponible && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">No disponible</span>
                                        </div>
                                    )}
                                </div>

                                {/* Información */}
                                <div className={`p-6 ${vistaActual === 'list' ? 'md:w-2/3' : ''}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {servicio.nombre}
                                        </h3>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-green-600">
                                                {formatearPrecio(servicio.precio)}
                                            </div>
                                            <div className="text-sm text-gray-500">{servicio.duracion}</div>
                                        </div>
                                    </div>

                                    <div className="text-gray-600 mb-3">
                                        🕒 {servicio.horarios}
                                    </div>

                                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                                        {servicio.descripcion}
                                    </p>

                                    {/* Incluye */}
                                    {servicio.incluye && Array.isArray(servicio.incluye) && servicio.incluye.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {servicio.incluye.slice(0, 3).map((item, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                            {servicio.incluye.length > 3 && (
                                                <span className="text-blue-600 text-xs">
                                                    +{servicio.incluye.length - 3} más
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Botones */}
                                    <div className="flex space-x-3">
                                        <Link
                                            to={`/servicio/${servicio.id}`}
                                            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            Ver detalles
                                        </Link>
                                        <button
                                            onClick={() => manejarContratacion(servicio)}
                                            disabled={!servicio.disponible}
                                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                                                servicio.disponible
                                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            {servicio.disponible ? 'Contratar' : 'No disponible'}
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

export default Servicios;
