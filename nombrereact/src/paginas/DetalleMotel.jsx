import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import usePageTitle from '../componentes/usePageTitle';
import motelService from '../servicios/MotelService';
import climaService from '../servicios/climaService';
import { useAuth } from '../contextos/AuthContext';

const DetalleMotel = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    
    // Estados
    const [motel, setMotel] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [imagenActual, setImagenActual] = useState(0);
    const [fechaEntrada, setFechaEntrada] = useState('');
    const [fechaSalida, setFechaSalida] = useState('');
    const [huespedes, setHuespedes] = useState(2);
    const [mostrarFormularioReserva, setMostrarFormularioReserva] = useState(false);
    
    // Estado para el clima
    const [clima, setClima] = useState(null);
    const [cargandoClima, setCargandoClima] = useState(false);

    // Hook personalizado para cambiar título de la página
    usePageTitle(motel ? `${motel.nombre} - Detalle Motel | InnovaHost` : 'Cargando...');

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

    // Datos simulados de moteles (mismo que en Moteles.jsx)
    const motelesMock = [
        {
            id: 1,
            nombre: 'Motel Las Palmas',
            ciudad: 'Ciudad de México',
            estado: 'CDMX',
            precio: 450,
            calificacion: 4.2,
            resenas: 156,
            descripcion: 'Motel cómodo y discreto con habitaciones equipadas y servicios de calidad para tu descanso.',
            descripcionLarga: 'Ubicado en el corazón de la Ciudad de México, Motel Las Palmas ofrece una experiencia única de descanso y relajación. Con más de 20 años de experiencia, nos especializamos en brindar servicios de alta calidad en un ambiente discreto y elegante. Nuestras habitaciones están completamente equipadas con las mejores amenidades para garantizar su comodidad.',
            imagen: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
            imagenes: [
                'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
            ],
            servicios: ['WiFi gratuito', 'Parking privado', 'TV por cable', 'Aire acondicionado', 'Servicio a la habitación', 'Seguridad 24h'],
            disponible: true,
            destacado: true,
            direccion: 'Av. Insurgentes Sur 1234, Roma Norte, CDMX',
            telefono: '+52 55 1234-5678',
            email: 'reservas@motellaspalmas.com',
            politicas: {
                checkin: '2:00 PM',
                checkout: '12:00 PM',
                cancelacion: 'Cancelación gratuita hasta 24 horas antes',
                mascotas: 'No se permiten mascotas',
                fumadores: 'Habitaciones para no fumadores'
            },
            ubicacion: {
                lat: 19.4326,
                lng: -99.1332
            }
        },
        {
            id: 2,
            nombre: 'Motel Costa Azul',
            ciudad: 'Guadalajara',
            estado: 'Jalisco',
            precio: 380,
            calificacion: 3.9,
            resenas: 89,
            descripcion: 'Motel con ubicación conveniente y habitaciones limpias para una estancia cómoda.',
            descripcionLarga: 'Motel Costa Azul se encuentra estratégicamente ubicado en Guadalajara, ofreciendo fácil acceso a los principales puntos de interés de la ciudad. Con un enfoque en la limpieza y el confort, nuestras instalaciones han sido renovadas recientemente para brindar la mejor experiencia a nuestros huéspedes.',
            imagen: 'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
            imagenes: [
                'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
            ],
            servicios: ['WiFi', 'Estacionamiento', 'TV', 'Baño privado', 'Aire acondicionado'],
            disponible: true,
            destacado: false,
            direccion: 'Av. López Mateos 567, Guadalajara, Jalisco',
            telefono: '+52 33 2345-6789',
            email: 'info@motelcostaazul.com',
            politicas: {
                checkin: '3:00 PM',
                checkout: '11:00 AM',
                cancelacion: 'Cancelación gratuita hasta 12 horas antes',
                mascotas: 'Se permiten mascotas pequeñas',
                fumadores: 'Habitaciones para fumadores disponibles'
            },
            ubicacion: {
                lat: 20.6597,
                lng: -103.3496
            }
        },
        {
            id: 3,
            nombre: 'Motel El Oasis',
            ciudad: 'Monterrey',
            estado: 'Nuevo León',
            precio: 520,
            calificacion: 4.5,
            resenas: 234,
            descripcion: 'Motel de lujo con habitaciones temáticas y servicios premium para una experiencia única.',
            descripcionLarga: 'El Oasis representa el pináculo del lujo en la industria de moteles. Con habitaciones temáticas diseñadas por reconocidos arquitectos y servicios premium que incluyen spa, jacuzzi privado y room service gourmet, ofrecemos una experiencia inolvidable que supera las expectativas más exigentes.',
            imagen: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
            imagenes: [
                'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
            ],
            servicios: ['WiFi premium', 'Jacuzzi', 'TV smart', 'Minibar', 'Room service', 'Spa', 'Parking valet', 'Seguridad 24h'],
            disponible: true,
            destacado: true,
            direccion: 'Av. Constitución 890, Centro, Monterrey, NL',
            telefono: '+52 81 3456-7890',
            email: 'reservas@moteloasis.com',
            politicas: {
                checkin: '1:00 PM',
                checkout: '1:00 PM',
                cancelacion: 'Cancelación gratuita hasta 48 horas antes',
                mascotas: 'No se permiten mascotas',
                fumadores: 'Habitaciones para no fumadores únicamente'
            },
            ubicacion: {
                lat: 25.6866,
                lng: -100.3161
            }
        }
    ];

    // Función para normalizar datos del motel (API vs Mock)
    const normalizarDatosMotel = (datos) => {
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
        
        return {
            ...datos,
            imagen: imagenPrincipal || (imagenes.length > 0 ? imagenes[0] : null),
            imagenes: imagenes.length > 0 ? imagenes : ['https://via.placeholder.com/800x600/6366f1/ffffff?text=Sin+Imagen'],
            servicios: servicios
        };
    };

    // Función para cargar detalles del motel
    const cargarDetalleMotel = async () => {
        try {
            setCargando(true);
            setError(null);

            const motelData = await motelService.obtenerMotel(id);
            setMotel(motelData);
        } catch (error) {
            console.error('Error cargando detalles del motel:', error);
            if (error.message === 'Motel no encontrado') {
                setError('Motel no encontrado');
            } else {
                setError('Error al cargar los detalles del motel');
            }
        } finally {
            setCargando(false);
        }
    };

    // Cargar datos al montar el componente
    useEffect(() => {
        cargarDetalleMotel();
    }, [id]);

    // Cargar clima cuando se obtiene el motel
    useEffect(() => {
        if (motel && motel.ciudad) {
            cargarClima(motel.ciudad);
        }
    }, [motel]);

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

    // Función para formatear precio
    const formatearPrecio = (precio) => {
        return `$${precio.toLocaleString('es-MX')}`;
    };

    // Función para manejar errores de imagen
    const manejarErrorImagen = (e) => {
        e.target.src = 'https://via.placeholder.com/800x600/6366f1/ffffff?text=Imagen+No+Disponible';
    };

    // Función para manejar reserva
    const manejarReserva = () => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        setMostrarFormularioReserva(true);
    };

    // Función para procesar reserva
    const procesarReserva = (e) => {
        e.preventDefault();
        
        if (!fechaEntrada || !fechaSalida) {
            alert('Por favor selecciona las fechas de entrada y salida');
            return;
        }

        // Aquí iría la lógica para procesar la reserva
        alert(`Reserva procesada para ${motel.nombre} del ${fechaEntrada} al ${fechaSalida} para ${huespedes} huésped(es)`);
        setMostrarFormularioReserva(false);
    };

    // Loading
    if (cargando) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando detalles del motel...</p>
                </div>
            </div>
        );
    }

    // Error
    if (error || !motel) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {error || 'Motel no encontrado'}
                    </h2>
                    <p className="text-gray-600 mb-4">
                        El motel que buscas no existe o no está disponible
                    </p>
                    <Link 
                        to="/moteles"
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Volver a moteles
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <nav className="text-sm">
                        <Link to="/" className="text-purple-600 hover:text-purple-800">Inicio</Link>
                        <span className="mx-2 text-gray-500">/</span>
                        <Link to="/moteles" className="text-purple-600 hover:text-purple-800">Moteles</Link>
                        <span className="mx-2 text-gray-500">/</span>
                        <span className="text-gray-500">{motel.nombre}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Columna principal - Información del motel */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Galería de imágenes */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="relative">
                                <img
                                    src={motel.imagenes[imagenActual]}
                                    alt={motel.nombre}
                                    onError={manejarErrorImagen}
                                    className="w-full h-96 object-cover"
                                />
                                {motel.destacado && (
                                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        ⭐ Destacado
                                    </div>
                                )}
                                
                                {/* Navegación de imágenes */}
                                {motel.imagenes.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setImagenActual(imagenActual > 0 ? imagenActual - 1 : motel.imagenes.length - 1)}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                                        >
                                            ←
                                        </button>
                                        <button
                                            onClick={() => setImagenActual(imagenActual < motel.imagenes.length - 1 ? imagenActual + 1 : 0)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                                        >
                                            →
                                        </button>
                                    </>
                                )}
                            </div>
                            
                            {/* Thumbnails */}
                            {motel.imagenes.length > 1 && (
                                <div className="p-4 flex space-x-3 overflow-x-auto">
                                    {motel.imagenes.map((imagen, index) => (
                                        <img
                                            key={index}
                                            src={imagen}
                                            alt={`${motel.nombre} ${index + 1}`}
                                            onError={manejarErrorImagen}
                                            onClick={() => setImagenActual(index)}
                                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all ${
                                                index === imagenActual 
                                                    ? 'ring-2 ring-purple-600 opacity-100' 
                                                    : 'opacity-70 hover:opacity-100'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Información principal */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{motel.nombre}</h1>
                                    <div className="flex items-center mb-2">
                                        <div className="flex items-center mr-3">
                                            {renderEstrellas(motel.calificacion)}
                                        </div>
                                        <span className="text-gray-600">
                                            {motel.calificacion} ({motel.resenas} reseñas)
                                        </span>
                                    </div>
                                    <p className="text-gray-600 flex items-center">
                                        📍 {motel.direccion}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-green-600">
                                        {formatearPrecio(motel.precio)}
                                    </div>
                                    <div className="text-sm text-gray-500">por noche</div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="text-lg font-semibold mb-3">Descripción</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {motel.descripcionLarga}
                                </p>
                            </div>
                        </div>

                        {/* Servicios */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">Servicios incluidos</h3>
                            {motel.servicios && Array.isArray(motel.servicios) && motel.servicios.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {motel.servicios.map((servicio, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <span className="text-green-500">✓</span>
                                            <span className="text-gray-700">{servicio}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No hay servicios disponibles</p>
                            )}
                        </div>

                        {/* Políticas */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">Políticas del motel</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-medium text-gray-800">Check-in:</p>
                                    <p className="text-gray-600">{motel.politicas.checkin}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">Check-out:</p>
                                    <p className="text-gray-600">{motel.politicas.checkout}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">Cancelación:</p>
                                    <p className="text-gray-600">{motel.politicas.cancelacion}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">Mascotas:</p>
                                    <p className="text-gray-600">{motel.politicas.mascotas}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="font-medium text-gray-800">Política de fumadores:</p>
                                    <p className="text-gray-600">{motel.politicas.fumadores}</p>
                                </div>
                            </div>
                        </div>

                        {/* Información de contacto */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">Información de contacto</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <span className="text-purple-600">📞</span>
                                    <span className="text-gray-700">{motel.telefono}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-purple-600">✉️</span>
                                    <span className="text-gray-700">{motel.email}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-purple-600">📍</span>
                                    <span className="text-gray-700">{motel.direccion}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Formulario de reserva */}
                    <div className="lg:col-span-1">
                        {/* Información del clima */}
                        {clima && (
                            <div className="mb-6 p-4 clima-widget rounded-xl shadow-lg text-white relative">
                                <div className="relative z-10">
                                    <h4 className="text-sm font-medium opacity-90 mb-1">
                                        {motel.ciudad}, {motel.estado}
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

                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                            <h3 className="text-xl font-semibold mb-4">Reservar ahora</h3>
                            
                            {!mostrarFormularioReserva ? (
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600 mb-1">
                                            {formatearPrecio(motel.precio)}
                                        </div>
                                        <div className="text-sm text-gray-500">por noche</div>
                                    </div>
                                    
                                    <button
                                        onClick={manejarReserva}
                                        disabled={!motel.disponible}
                                        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                                            motel.disponible
                                                ? 'bg-purple-600 text-white hover:bg-purple-700'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    >
                                        {motel.disponible 
                                            ? (isAuthenticated() ? 'Reservar ahora' : 'Iniciar sesión para reservar')
                                            : 'No disponible'
                                        }
                                    </button>
                                    
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500">
                                            Reserva sin costo adicional
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={procesarReserva} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fecha de entrada
                                        </label>
                                        <input
                                            type="date"
                                            value={fechaEntrada}
                                            onChange={(e) => setFechaEntrada(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fecha de salida
                                        </label>
                                        <input
                                            type="date"
                                            value={fechaSalida}
                                            onChange={(e) => setFechaSalida(e.target.value)}
                                            min={fechaEntrada || new Date().toISOString().split('T')[0]}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Huéspedes
                                        </label>
                                        <select
                                            value={huespedes}
                                            onChange={(e) => setHuespedes(parseInt(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            {[1, 2, 3, 4, 5, 6].map(num => (
                                                <option key={num} value={num}>
                                                    {num} {num === 1 ? 'huésped' : 'huéspedes'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div className="border-t pt-4">
                                        <div className="text-lg font-semibold text-center mb-3">
                                            Total: {formatearPrecio(motel.precio)}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <button
                                            type="submit"
                                            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                                        >
                                            Confirmar reserva
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setMostrarFormularioReserva(false)}
                                            className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleMotel;
