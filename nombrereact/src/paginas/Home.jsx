import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import usePageTitle from "../componentes/usePageTitle";
import hotelService from "../servicios/HotelService";
import { useAuth } from "../contextos/AuthContext";
import BuscadorGeneral from "../componentes/BuscadorGeneral";

function Home() {
  // Hook personalizado para cambiar título de la página
  usePageTitle('Inicio - InnovaHost | El mejor sitio para reservaciones');

  // Hook de autenticación
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Estado para hoteles destacados de la API
  const [hoteles, setHoteles] = useState([]);
  const [cargandoHoteles, setCargandoHoteles] = useState(true);

  // Cargar hoteles destacados desde la API
  useEffect(() => {
    const cargarHotelesDestacados = async () => {
      try {
        setCargandoHoteles(true);
        console.log('Cargando hoteles destacados...');
        const hotelesDestacados = await hotelService.obtenerHotelesDestacados();
        console.log('Hoteles destacados recibidos:', hotelesDestacados);
        // Limitar a 7 hoteles para el carrusel
        setHoteles(Array.isArray(hotelesDestacados) ? hotelesDestacados.slice(0, 7) : []);
      } catch (error) {
        console.error('Error cargando hoteles destacados:', error);
        // En caso de error, usar datos de fallback
        const datosTemporales = [
          {
            id: 1,
            nombre: "Hotel Majestic Plaza",
            ciudad: "Cancún",
            estado: "Quintana Roo",
            precio: 1250.00,
            calificacion: 4.8,
            foto: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            imagenes: ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
          },
          {
            id: 2,
            nombre: "Resort Paradise Bay",
            ciudad: "Playa del Carmen",
            estado: "Quintana Roo",
            precio: 2100.00,
            calificacion: 4.9,
            foto: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            imagenes: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
          },
          {
            id: 3,
            nombre: "Hotel Vista Hermosa",
            ciudad: "Puerto Vallarta",
            estado: "Jalisco",
            precio: 980.00,
            calificacion: 4.5,
            foto: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            imagenes: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
          },
          {
            id: 4,
            nombre: "Grand Hotel Metropolitan",
            ciudad: "Ciudad de México",
            estado: "CDMX",
            precio: 1450.00,
            calificacion: 4.7,
            foto: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            imagenes: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
          }
        ];
        setHoteles(datosTemporales);
      } finally {
        setCargandoHoteles(false);
      }
    };

    cargarHotelesDestacados();
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const itemsPerView = 4; // Número de hoteles visibles a la vez
  const autoPlayInterval = 4000; // 4 segundos

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsPerView >= hoteles.length ? 0 : prevIndex + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, hoteles.length - itemsPerView) : Math.max(0, prevIndex - itemsPerView)
    );
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Si llegamos al final, volvemos al inicio
        if (prevIndex + itemsPerView >= hoteles.length) {
          return 0;
        }
        return prevIndex + itemsPerView;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, hoteles.length, itemsPerView, autoPlayInterval]);

  // Pausar auto-play al hacer hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Pausar auto-play al interactuar manualmente
  const handleManualNavigation = (callback) => {
    setIsAutoPlaying(false);
    callback();
    // Reanudar auto-play después de 5 segundos de inactividad
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Manejar click del botón "Reservar ahora"
  const handleReservarClick = () => {
    if (isAuthenticated()) {
      // Si está logueado, redirigir a la página de hoteles
      navigate('/hoteles');
    } else {
      // Si no está logueado, redirigir al login
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative h-screen w-full flex items-center justify-center text-center text-white" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-bold mb-4">InnovaHost</h1>
          <p className="text-2xl mb-8">El mejor sitio para reservaciones de hoteles, moteles y más.</p>
          <button 
            onClick={handleReservarClick}
            className="bg-white text-black px-8 py-3 rounded-lg shadow-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Reservar ahora
          </button>
        </div>
      </section>

      {/* Buscador General */}
      <section className="relative">
        <BuscadorGeneral />
      </section>

      {/* Hoteles Destacados */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-900">Hoteles Destacados</h2>
        </div>
        
        {cargandoHoteles ? (
          // Loading state
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando hoteles destacados...</p>
            </div>
          </div>
        ) : hoteles.length === 0 ? (
          // No hotels state
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">🏨</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No hay hoteles destacados disponibles
            </h3>
            <p className="text-gray-500">
              Por favor, intenta de nuevo más tarde
            </p>
          </div>
        ) : (
          // Hotels carousel
          <div 
            className="relative w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
          {/* Botón Anterior */}
          <button 
            onClick={() => handleManualNavigation(prevSlide)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
            disabled={currentIndex === 0}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Botón Siguiente */}
          <button 
            onClick={() => handleManualNavigation(nextSlide)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
            disabled={currentIndex + itemsPerView >= hoteles.length}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicador de Auto-play */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`bg-white shadow-lg rounded-full p-2 transition-colors ${
                isAutoPlaying ? 'text-green-600 hover:bg-green-50' : 'text-gray-600 hover:bg-gray-50'
              }`}
              title={isAutoPlaying ? 'Pausar rotación automática' : 'Iniciar rotación automática'}
            >
              {isAutoPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>

          {/* Carrusel */}
          <div className="overflow-hidden w-full">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {hoteles.map((hotel) => (
                <div key={hotel.id} className="w-1/4 flex-shrink-0 px-4">
                  {/* Tarjeta completa con efecto hover */}
                  <div className="group cursor-pointer transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
                    {/* Imagen */}
                    <div className="mb-4 overflow-hidden rounded-lg shadow-lg">
                      <img 
                        src={hotelService.obtenerPrimeraImagen(hotel)} 
                        alt={`Hotel ${hotel.nombre}`} 
                        className="w-full h-48 object-cover transition-all duration-500 ease-in-out group-hover:brightness-110"
                      />
                    </div>
                    {/* Card */}
                    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center mx-2 transition-all duration-300 group-hover:bg-gray-50">
                      <div className="flex gap-1 mb-2">
                        {Array(Math.floor(hotel.calificacion || 5)).fill(0).map((_, i) => (
                          <span key={i} className="text-yellow-400 transition-all duration-300 group-hover:text-yellow-500">&#9733;</span>
                        ))}
                      </div>
                      <Link 
                        to={`/hotel/${hotel.id}`}
                        className="font-bold text-lg transition-colors duration-300 group-hover:text-blue-600 text-center"
                      >
                        {hotel.nombre}
                      </Link>
                      <div className="text-gray-500 text-sm mb-2 transition-colors duration-300 group-hover:text-gray-600">
                        {hotel.ciudad}, {hotel.estado}
                      </div>
                      <div className="text-green-600 font-semibold">
                        {hotelService.formatearPrecio(hotel.precio)} / noche
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Indicadores de página */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array(Math.ceil(hoteles.length / itemsPerView)).fill(0).map((_, index) => (
              <button
                key={index}
                onClick={() => handleManualNavigation(() => setCurrentIndex(index * itemsPerView))}
                className={`w-3 h-3 rounded-full transition-colors ${
                  Math.floor(currentIndex / itemsPerView) === index 
                    ? 'bg-gray-800' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 px-4">
          <div>
            <div className="font-bold mb-2">Sobre InnovaHost</div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Quiénes somos</li>
              <li>Nuestro equipo</li>
              <li>Opiniones de clientes</li>
              <li>Misión y visión</li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-2">Atención al cliente</div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Centro de ayuda</li>
              <li>Cancelaciones y reembolsos</li>
              <li>Preguntas frecuentes</li>
              <li>Soporte 24/7</li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-2">Legal</div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Términos y condiciones</li>
              <li>Política de privacidad</li>
              <li>Política de cookies</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-6 text-gray-600">
          <a href="#"><i className="fab fa-x-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
        </div>
      </footer>
    </div>
  );
}

export default Home;