import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import usePageTitle from '../componentes/usePageTitle';
import hotelService from '../servicios/HotelService';
import climaService from '../servicios/climaService';
import { useAuth } from '../contextos/AuthContext';

const DetalleHotel = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    
    // Estado para el hotel
    const [hotel, setHotel] = useState(null);
    const [imagenActual, setImagenActual] = useState(0);
    const [fechaEntrada, setFechaEntrada] = useState('');
    const [fechaSalida, setFechaSalida] = useState('');
    const [huespedes, setHuespedes] = useState(1);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarTodasReseñas, setMostrarTodasReseñas] = useState(false);
    
    // Estado para el clima
    const [clima, setClima] = useState(null);
    const [cargandoClima, setCargandoClima] = useState(false);

    // Hook personalizado para cambiar título de la página
    usePageTitle(hotel ? `${hotel.nombre} - InnovaHost` : 'Hotel - InnovaHost');

    // Función para cargar el clima
    const cargarClima = async (ciudad) => {
        if (!ciudad) return;
        
        try {
            console.log('Cargando clima para ciudad:', ciudad);
            setCargandoClima(true);
            const datosClima = await climaService.obtenerClimaPorCiudad(ciudad);
            console.log('Datos de clima recibidos:', datosClima);
            setClima(datosClima);
        } catch (error) {
            console.error('Error cargando clima:', error);
            // No mostramos error crítico por el clima, solo log
        } finally {
            setCargandoClima(false);
        }
    };

    // Función para convertir código de icono a emoji
    const obtenerEmojiClima = (iconCode) => {
        const iconMap = {
            '01d': '☀️', // cielo claro día
            '01n': '🌙', // cielo claro noche
            '02d': '⛅', // pocas nubes día
            '02n': '☁️', // pocas nubes noche
            '03d': '☁️', // nubes dispersas
            '03n': '☁️', // nubes dispersas noche
            '04d': '☁️', // nubes rotas
            '04n': '☁️', // nubes rotas noche
            '09d': '🌧️', // lluvia ligera día
            '09n': '🌧️', // lluvia ligera noche
            '10d': '🌦️', // lluvia día
            '10n': '🌧️', // lluvia noche
            '11d': '⛈️', // tormenta día
            '11n': '⛈️', // tormenta noche
            '13d': '❄️', // nieve día
            '13n': '❄️', // nieve noche
            '50d': '🌫️', // niebla día
            '50n': '🌫️'  // niebla noche
        };
        return iconMap[iconCode] || '🌤️';
    };

    // Cargar hotel desde la API
    useEffect(() => {
        const cargarHotel = async () => {
            try {
                setCargando(true);
                setError(null);
                const hotelData = await hotelService.obtenerHotel(id);
                setHotel(hotelData);
                
                // Cargar clima para la ciudad del hotel
                if (hotelData.ciudad) {
                    cargarClima(hotelData.ciudad);
                }
                
                // Establecer imagen de fondo para el navbar
                const imagen = hotelData.foto || (hotelData.imagenes && hotelData.imagenes[0]);
                if (imagen) {
                    window.dispatchEvent(new CustomEvent('setNavbarBackground', {
                        detail: { image: imagen }
                    }));
                }
            } catch (error) {
                console.error('Error cargando hotel:', error);
                if (error.message === 'Hotel no encontrado') {
                    navigate('/hoteles');
                } else {
                    setError('Error al cargar el hotel. Por favor, intenta de nuevo.');
                }
            } finally {
                setCargando(false);
            }
        };

        if (id) {
            cargarHotel();
        }

        // Cleanup: limpiar imagen de fondo cuando se desmonte el componente
        return () => {
            window.dispatchEvent(new CustomEvent('setNavbarBackground', {
                detail: { image: null }
            }));
        };
    }, [id, navigate]);

    // Función para renderizar estrellas
    const renderEstrellas = (calificacion) => {
        const estrellas = [];
        const estrellasCompletas = Math.floor(calificacion);
        const tieneMediaEstrella = calificacion % 1 !== 0;

        for (let i = 0; i < estrellasCompletas; i++) {
            estrellas.push(
                <span key={i} className="text-yellow-400 text-xl">★</span>
            );
        }

        if (tieneMediaEstrella) {
            estrellas.push(
                <span key="media" className="text-yellow-400 text-xl">☆</span>
            );
        }

        const estrellasVacias = 5 - Math.ceil(calificacion);
        for (let i = 0; i < estrellasVacias; i++) {
            estrellas.push(
                <span key={`vacia-${i}`} className="text-gray-300 text-xl">★</span>
            );
        }

        return estrellas;
    };

    // Función para manejar reserva
    const manejarReserva = (e) => {
        e.preventDefault();
        
        // Verificar si el usuario está autenticado
        if (!isAuthenticated()) {
            // Si no está logueado, redirigir al login
            navigate('/login');
            return;
        }
        
        // Aquí irían las validaciones y lógica de reserva
        alert('Funcionalidad de reserva en desarrollo. Usuario autenticado correctamente.');
    };

    // Obtener las imágenes del hotel
    const obtenerImagenes = () => {
        if (hotel.imagenes && Array.isArray(hotel.imagenes) && hotel.imagenes.length > 0) {
            return hotel.imagenes;
        }
        return hotel.foto ? [hotel.foto] : ['https://via.placeholder.com/800x600?text=No+Image'];
    };

    // Obtener reseñas de ejemplo
    const obtenerReseñasEjemplo = () => {
        return [
            {
                nombre: "María González",
                fecha: "Hace 2 semanas",
                calificacion: 5,
                comentario: "¡Excelente hotel! El servicio fue excepcional desde el momento en que llegamos. Las habitaciones están muy limpias y cómodas. La ubicación es perfecta y el personal muy amable. Definitivamente regresaríamos.",
                respuesta: "¡Muchas gracias por su reseña, María! Nos alegra mucho saber que disfrutó su estadía. Esperamos recibirla nuevamente pronto."
            },
            {
                nombre: "Carlos Rodríguez",
                fecha: "Hace 1 mes",
                calificacion: 4,
                comentario: "Muy buena experiencia en general. El hotel está bien ubicado y las instalaciones son buenas. El desayuno buffet tiene buena variedad. Solo como sugerencia, sería genial si tuvieran más opciones de entretenimiento nocturno.",
                respuesta: "Gracias por sus comentarios, Carlos. Tomamos nota de su sugerencia sobre entretenimiento nocturno para futuras mejoras."
            },
            {
                nombre: "Ana Martínez",
                fecha: "Hace 3 semanas",
                calificacion: 5,
                comentario: "Hotel increíble para unas vacaciones en familia. Los niños se divirtieron mucho en la piscina y las actividades. El personal del hotel fue muy atento con nosotros. Habitaciones espaciosas y muy limpias.",
            },
            {
                nombre: "Roberto Silva",
                fecha: "Hace 2 meses",
                calificacion: 4,
                comentario: "Buen hotel con excelente relación calidad-precio. La comida del restaurante es deliciosa y el spa muy relajante. La vista desde la habitación era espectacular. Recomendado para una escapada romántica.",
            },
            {
                nombre: "Laura Fernández",
                fecha: "Hace 1 mes",
                calificacion: 5,
                comentario: "Una experiencia maravillosa. Desde la recepción hasta el servicio de limpieza, todo el personal fue excepcional. Las instalaciones están en perfecto estado y la comida es exquisita. ¡Vale cada peso!",
                respuesta: "¡Qué alegría leer su reseña, Laura! Compartiremos sus comentarios con todo nuestro equipo. ¡Gracias por elegirnos!"
            }
        ];
    };

    // Obtener distribución de calificaciones basada en la calificación del hotel
    const obtenerDistribucionCalificaciones = () => {
        if (!hotel) return {};
        
        const calificacion = hotel.calificacion;
        
        // Generar distribución realista basada en la calificación del hotel
        if (calificacion >= 4.5) {
            return { 5: 70, 4: 20, 3: 7, 2: 2, 1: 1 };
        } else if (calificacion >= 4.0) {
            return { 5: 50, 4: 35, 3: 10, 2: 3, 1: 2 };
        } else if (calificacion >= 3.5) {
            return { 5: 30, 4: 40, 3: 20, 2: 7, 1: 3 };
        } else if (calificacion >= 3.0) {
            return { 5: 20, 4: 30, 3: 30, 2: 15, 1: 5 };
        } else {
            return { 5: 10, 4: 20, 3: 25, 2: 25, 1: 20 };
        }
    };

    if (cargando) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando hotel...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">{error}</h3>
                    <Link
                        to="/hoteles"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Volver a hoteles
                    </Link>
                </div>
            </div>
        );
    }

    if (!hotel) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando hotel...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white/95 backdrop-blur-sm border-b shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <nav className="flex items-center space-x-2 text-sm">
                        <Link to="/" className="text-blue-600 hover:text-blue-800">Inicio</Link>
                        <span className="text-gray-400">/</span>
                        <Link to="/hoteles" className="text-blue-600 hover:text-blue-800">Hoteles</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-600">{hotel.nombre}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Columna principal */}
                    <div className="lg:col-span-2">
                        {/* Galería de imágenes */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                            <div className="relative">
                                <img
                                    src={obtenerImagenes()[imagenActual]}
                                    alt={hotel.nombre}
                                    className="w-full h-96 object-cover"
                                />
                                
                                {/* Botones de navegación */}
                                {obtenerImagenes().length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setImagenActual(imagenActual === 0 ? obtenerImagenes().length - 1 : imagenActual - 1)}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => setImagenActual(imagenActual === obtenerImagenes().length - 1 ? 0 : imagenActual + 1)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </>
                                )}

                                {/* Indicadores */}
                                {obtenerImagenes().length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                        {obtenerImagenes().map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setImagenActual(index)}
                                                className={`w-3 h-3 rounded-full ${
                                                    index === imagenActual ? 'bg-white' : 'bg-white bg-opacity-50'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Miniaturas */}
                            {obtenerImagenes().length > 1 && (
                                <div className="flex space-x-4 p-4 overflow-x-auto">
                                    {obtenerImagenes().map((imagen, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setImagenActual(index)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                                index === imagenActual ? 'border-blue-500' : 'border-gray-200'
                                            }`}
                                        >
                                            <img
                                                src={imagen}
                                                alt={`Vista ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Información del hotel */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 border border-white/20">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.nombre}</h1>
                                    <div className="flex items-center mb-2">
                                        {renderEstrellas(hotel.calificacion)}
                                        <span className="ml-2 text-gray-600">
                                            {hotel.calificacion} ({hotel.resenas} reseñas)
                                        </span>
                                    </div>
                                    <p className="text-gray-600">📍 {hotel.ciudad}, {hotel.estado}</p>
                                </div>
                                {hotelService.esDestacado(hotel) && (
                                    <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        ⭐ Destacado
                                    </div>
                                )}
                            </div>

                            <p className="text-gray-700 mb-6">{hotel.descripcion_larga || hotel.descripcion}</p>

                            {/* Servicios */}
                            {hotel.servicios && Array.isArray(hotel.servicios) && hotel.servicios.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Servicios y amenidades</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {hotel.servicios.map((servicio, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-gray-700">{servicio}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Características */}
                            {hotel.caracteristicas && Array.isArray(hotel.caracteristicas) && hotel.caracteristicas.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Características de las habitaciones</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {hotel.caracteristicas.map((caracteristica, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span className="text-gray-700">{caracteristica}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Información de contacto */}
                            <div className="border-t pt-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Información de contacto</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-600 mb-1"><strong>Dirección:</strong></p>
                                        <p className="text-gray-700">{hotel.direccion}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1"><strong>Teléfono:</strong></p>
                                        <p className="text-gray-700">{hotel.telefono}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1"><strong>Email:</strong></p>
                                        <p className="text-gray-700">{hotel.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1"><strong>Check-in / Check-out:</strong></p>
                                        <p className="text-gray-700">{hotel.checkin} / {hotel.checkout}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar de reserva */}
                    <div className="lg:col-span-1">
                        {/* Información del clima */}
                        {clima && (
                            <div className="mb-6 p-4 clima-widget rounded-xl shadow-lg text-white relative">
                                <div className="relative z-10">
                                    <h4 className="text-sm font-medium opacity-90 mb-1">
                                        {hotel.ciudad}, {hotel.estado}
                                    </h4>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-4xl clima-icon">
                                            {obtenerEmojiClima(clima.icono)}
                                        </span>
                                        <div>
                                            <div className="text-3xl font-bold temperatura-principal">
                                                {Math.round(clima.temperatura)}°C
                                            </div>
                                            <div className="text-sm opacity-80 capitalize">
                                                {clima.descripcion}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="clima-stat-card bg-white bg-opacity-20 rounded-lg p-2">
                                            <div className="text-xs opacity-80">Sensación</div>
                                            <div className="font-semibold">
                                                {Math.round(clima.sensacionTermica || clima.temperatura + 2)}°C
                                            </div>
                                        </div>
                                        <div className="clima-stat-card bg-white bg-opacity-20 rounded-lg p-2">
                                            <div className="text-xs opacity-80">Humedad</div>
                                            <div className="font-semibold">{clima.humedad}%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {cargandoClima && (
                            <div className="mb-6 p-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shadow-lg">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                    <span className="text-sm font-medium">Cargando información del clima...</span>
                                </div>
                            </div>
                        )}

                        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 sticky top-20 border border-white/20">
                            <div className="text-center mb-6">
                                <div className="text-3xl font-bold text-green-600 mb-1">
                                    {hotelService.formatearPrecio(hotel.precio)}
                                </div>
                                <div className="text-gray-500">por noche</div>
                            </div>

                            <form onSubmit={manejarReserva} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Fecha de entrada
                                    </label>
                                    <input
                                        type="date"
                                        value={fechaEntrada}
                                        onChange={(e) => setFechaEntrada(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Fecha de salida
                                    </label>
                                    <input
                                        type="date"
                                        value={fechaSalida}
                                        onChange={(e) => setFechaSalida(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Número de huéspedes
                                    </label>
                                    <select
                                        value={huespedes}
                                        onChange={(e) => setHuespedes(parseInt(e.target.value))}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value={1}>1 huésped</option>
                                        <option value={2}>2 huéspedes</option>
                                        <option value={3}>3 huéspedes</option>
                                        <option value={4}>4 huéspedes</option>
                                        <option value={5}>5+ huéspedes</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!hotelService.estaDisponible(hotel)}
                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                                        hotelService.estaDisponible(hotel)
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    {hotelService.estaDisponible(hotel) ? 'Reservar ahora' : 'No disponible'}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-gray-500 text-sm mb-2">
                                    Cancelación gratuita hasta 24 horas antes
                                </p>
                                <p className="text-gray-500 text-sm">
                                    No se requiere pago por adelantado
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de Reseñas */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 mt-8 border border-white/20">
                    <div className="flex items-center mb-6">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Reseñas de huéspedes</h2>
                    </div>
                    
                    {/* Resumen de calificaciones */}
                    <div className="bg-gray-50/80 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-200/50">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600 mb-1">
                                    {hotel.calificacion}
                                </div>
                                <div className="flex justify-center mb-2">
                                    {renderEstrellas(hotel.calificacion)}
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Basado en {Math.floor(Math.random() * 500) + 100} reseñas
                                </p>
                            </div>
                            
                            <div className="flex-1 ml-8">
                                <div className="space-y-2">
                                    {[5, 4, 3, 2, 1].map((rating) => {
                                        const distribucion = obtenerDistribucionCalificaciones();
                                        const percentage = distribucion[rating] || 0;
                                        return (
                                            <div key={rating} className="flex items-center text-sm">
                                                <span className="w-3 text-gray-600">{rating}</span>
                                                <span className="text-yellow-400 mx-1">★</span>
                                                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                                                    <div 
                                                        className="bg-yellow-400 h-2 rounded-full transition-all duration-1000 ease-out" 
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-gray-600 w-8">{percentage}%</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lista de reseñas individuales */}
                    <div className="space-y-6">
                        {obtenerReseñasEjemplo()
                            .slice(0, mostrarTodasReseñas ? obtenerReseñasEjemplo().length : 3)
                            .map((reseña, index) => (
                            <div 
                                key={index} 
                                className={`border-b border-gray-200 pb-6 last:border-b-0 transition-all duration-500 ease-in-out ${
                                    index >= 3 ? 'animate-fadeIn' : ''
                                }`}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                                        {reseña.nombre.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{reseña.nombre}</h4>
                                                <p className="text-sm text-gray-500 flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {reseña.fecha}
                                                </p>
                                            </div>
                                            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                                                {renderEstrellas(reseña.calificacion)}
                                                <span className="ml-2 text-sm font-medium text-gray-700">
                                                    {reseña.calificacion}/5
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed mb-3">{reseña.comentario}</p>
                                        {reseña.respuesta && (
                                            <div className="mt-4 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-400">
                                                <div className="flex items-center mb-2">
                                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0h3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                    </div>
                                                    <span className="ml-2 font-medium text-blue-900">Respuesta del hotel</span>
                                                </div>
                                                <p className="text-blue-800 text-sm leading-relaxed">{reseña.respuesta}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Botón para ver más reseñas */}
                    {obtenerReseñasEjemplo().length > 3 && (
                        <div className="text-center mt-8">
                            <button 
                                onClick={() => setMostrarTodasReseñas(!mostrarTodasReseñas)}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center mx-auto"
                            >
                                {mostrarTodasReseñas ? (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                        Ver menos reseñas
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                        Ver todas las reseñas ({obtenerReseñasEjemplo().length})
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetalleHotel;
