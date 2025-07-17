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
        {
            id: 1,
            nombre: "El Dorado",
            imagen: "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            ubicacion: "Hermosillo",
            estado: "Sonora",
            precio: 1500,
            calificacion: 4.5,
            resenas: 245,
            descripcion: "Hotel de lujo con vista panorámica de la ciudad, spa completo y restaurante gourmet.",
            servicios: ["WiFi", "Piscina", "Spa", "Restaurante", "Gimnasio", "Estacionamiento"],
            disponible: true,
            destacado: true
        },
        {
            id: 2,
            nombre: "El Nora",
            imagen: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            ubicacion: "Sonoyta",
            estado: "Sonora",
            precio: 850,
            calificacion: 4.2,
            resenas: 178,
            descripcion: "Hotel boutique con ambiente acogedor, perfecto para escapadas de fin de semana.",
            servicios: ["WiFi", "Desayuno", "Estacionamiento", "Aire acondicionado"],
            disponible: true,
            destacado: false
        },
        {
            id: 3,
            nombre: "Esmeralda",
            imagen: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            ubicacion: "Puerto Peñasco",
            estado: "Sonora",
            precio: 2200,
            calificacion: 4.8,
            resenas: 892,
            descripcion: "Resort frente al mar con actividades acuáticas y entretenimiento nocturno.",
            servicios: ["WiFi", "Piscina", "Playa privada", "Restaurante", "Bar", "Spa", "Actividades acuáticas"],
            disponible: true,
            destacado: true
        },
        {
            id: 4,
            nombre: "Lucerna",
            imagen: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            ubicacion: "Puerto Peñasco",
            estado: "Sonora",
            precio: 1800,
            calificacion: 4.6,
            resenas: 456,
            descripcion: "Hotel de negocios con instalaciones modernas y centro de convenciones.",
            servicios: ["WiFi", "Centro de negocios", "Restaurante", "Gimnasio", "Estacionamiento", "Sala de juntas"],
            disponible: true,
            destacado: false
        },
        {
            id: 5,
            nombre: "City Express",
            imagen: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            ubicacion: "Hermosillo",
            estado: "Sonora",
            precio: 1200,
            calificacion: 4.3,
            resenas: 634,
            descripcion: "Hotel moderno en el centro de la ciudad, ideal para viajeros de negocios.",
            servicios: ["WiFi", "Desayuno", "Centro de negocios", "Gimnasio", "Estacionamiento"],
            disponible: true,
            destacado: false
        },
        {
            id: 6,
            nombre: "San Sebastian",
            imagen: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            ubicacion: "Hermosillo",
            estado: "Sonora",
            precio: 950,
            calificacion: 4.1,
            resenas: 289,
            descripcion: "Hotel familiar con ambiente tradicional y excelente servicio personalizado.",
            servicios: ["WiFi", "Restaurante", "Piscina", "Estacionamiento", "Jardín"],
            disponible: true,
            destacado: false
        },
        {
            id: 7,
            nombre: "Sleep Inn",
            imagen: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            ubicacion: "Mexicali",
            estado: "Baja California",
            precio: 750,
            calificacion: 4.0,
            resenas: 156,
            descripcion: "Hotel económico con todas las comodidades básicas para una estancia confortable.",
            servicios: ["WiFi", "Desayuno", "Estacionamiento", "Aire acondicionado"],
            disponible: false,
            destacado: false
        },
        {
            id: 8,
            nombre: "Grand Plaza",
            imagen: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            ubicacion: "Tijuana",
            estado: "Baja California",
            precio: 1600,
            calificacion: 4.4,
            resenas: 378,
            descripcion: "Hotel de lujo en el corazón de la ciudad con vistas espectaculares.",
            servicios: ["WiFi", "Piscina", "Spa", "Restaurante", "Bar", "Gimnasio", "Estacionamiento"],
            disponible: true,
            destacado: true
        }
    ]);

    // Hoteles filtrados
    const [hotelesFiltrados, setHotelesFiltrados] = useState(todosHoteles);

    // Función para filtrar hoteles
    useEffect(() => {
        let hotelesTemp = [...todosHoteles];

        // Filtro por búsqueda
        if (busqueda) {
            hotelesTemp = hotelesTemp.filter(hotel =>
                hotel.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                hotel.ubicacion.toLowerCase().includes(busqueda.toLowerCase()) ||
                hotel.estado.toLowerCase().includes(busqueda.toLowerCase())
            );
        }

        // Filtro por ubicación
        if (filtroUbicacion) {
            hotelesTemp = hotelesTemp.filter(hotel => hotel.estado === filtroUbicacion);
        }

        // Filtro por precio
        if (filtroPrecio) {
            switch (filtroPrecio) {
                case 'economico':
                    hotelesTemp = hotelesTemp.filter(hotel => hotel.precio < 1000);
                    break;
                case 'medio':
                    hotelesTemp = hotelesTemp.filter(hotel => hotel.precio >= 1000 && hotel.precio < 1500);
                    break;
                case 'alto':
                    hotelesTemp = hotelesTemp.filter(hotel => hotel.precio >= 1500);
                    break;
                default:
                    break;
            }
        }

        // Filtro por calificación
        if (filtroCalificacion) {
            const minCalificacion = parseFloat(filtroCalificacion);
            hotelesTemp = hotelesTemp.filter(hotel => hotel.calificacion >= minCalificacion);
        }

        // Ordenar
        switch (ordenarPor) {
            case 'precio-asc':
                hotelesTemp.sort((a, b) => a.precio - b.precio);
                break;
            case 'precio-desc':
                hotelesTemp.sort((a, b) => b.precio - a.precio);
                break;
            case 'calificacion':
                hotelesTemp.sort((a, b) => b.calificacion - a.calificacion);
                break;
            case 'popularidad':
                hotelesTemp.sort((a, b) => b.resenas - a.resenas);
                break;
            default:
                break;
        }

        setHotelesFiltrados(hotelesTemp);
    }, [busqueda, filtroUbicacion, filtroPrecio, filtroCalificacion, ordenarPor, todosHoteles]);

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
                                    <option value="Sonora">Sonora</option>
                                    <option value="Baja California">Baja California</option>
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
                            {hotelesFiltrados.length} hoteles encontrados
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

                {/* Lista de hoteles */}
                {hotelesFiltrados.length === 0 ? (
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
                        {hotelesFiltrados.map((hotel) => (
                            <div 
                                key={hotel.id} 
                                className={`bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                                    vistaActual === 'list' ? 'md:flex' : ''
                                }`}
                            >
                                {/* Imagen */}
                                <div className={`relative ${vistaActual === 'list' ? 'md:w-1/3' : ''}`}>
                                    <img
                                        src={hotel.imagen}
                                        alt={hotel.nombre}
                                        className={`w-full object-cover transition-all duration-300 group-hover:brightness-110 ${
                                            vistaActual === 'list' ? 'h-48 md:h-full' : 'h-48'
                                        }`}
                                    />
                                    {hotel.destacado && (
                                        <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                            ⭐ Destacado
                                        </div>
                                    )}
                                    {!hotel.disponible && (
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
                                                ${hotel.precio.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-500">por noche</div>
                                        </div>
                                    </div>

                                    <div className="text-gray-600 mb-3">
                                        📍 {hotel.ubicacion}, {hotel.estado}
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

                                    {/* Botones */}
                                    <div className="flex space-x-3">
                                        <Link
                                            to={`/hotel/${hotel.id}`}
                                            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            Ver detalles
                                        </Link>
                                        <button
                                            disabled={!hotel.disponible}
                                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                                                hotel.disponible
                                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            {hotel.disponible ? 'Reservar' : 'No disponible'}
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
