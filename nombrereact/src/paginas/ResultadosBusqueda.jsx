import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import usePageTitle from '../componentes/usePageTitle';
import hotelService from '../servicios/HotelService';
import motelService from '../servicios/MotelService';

function ResultadosBusqueda() {
  const [searchParams] = useSearchParams();
  const terminoBusqueda = searchParams.get('q') || '';
  const tipoFiltro = searchParams.get('tipo') || 'todos';
  
  usePageTitle(`Resultados para "${terminoBusqueda}" - InnovaHost`);
  
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [totalResultados, setTotalResultados] = useState(0);

  // Función para formatear precio de manera segura
  const formatearPrecio = (precio) => {
    if (precio === null || precio === undefined) return '0.00';
    const precioNumerico = parseFloat(precio);
    if (isNaN(precioNumerico)) return '0.00';
    return precioNumerico.toFixed(2);
  };

  // Función para obtener imagen de manera segura
  const obtenerImagen = (resultado) => {
    if (resultado.foto) return resultado.foto;
    if (resultado.imagenes && resultado.imagenes.length > 0) return resultado.imagenes[0];
    return 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };

  useEffect(() => {
    console.log('useEffect ejecutado con:', { terminoBusqueda, tipoFiltro });
    
    const buscarAlojamientos = async () => {
      try {
        setCargando(true);
        console.log('Iniciando búsqueda...');
        
        // Simular búsqueda en diferentes tipos de alojamiento
        const resultadosBusqueda = await realizarBusquedaGeneral(terminoBusqueda, tipoFiltro);
        console.log('Resultados de búsqueda obtenidos:', resultadosBusqueda);
        setResultados(resultadosBusqueda);
        setTotalResultados(resultadosBusqueda.length);
        
      } catch (error) {
        console.error('Error en la búsqueda:', error);
        setResultados([]);
        setTotalResultados(0);
      } finally {
        console.log('Búsqueda completada');
        setCargando(false);
      }
    };

    if (terminoBusqueda) {
      console.log('Término de búsqueda válido, ejecutando búsqueda...');
      buscarAlojamientos();
    } else {
      console.log('Sin término de búsqueda, omitiendo búsqueda');
      setCargando(false);
    }
  }, [terminoBusqueda, tipoFiltro]);

  // Función para realizar búsqueda solo en BD
  const realizarBusquedaGeneral = async (termino, tipo) => {
    console.log('Realizando búsqueda SOLO en BD para:', termino, 'tipo:', tipo);
    const resultados = [];
    
    try {
      // Buscar en hoteles de la BD
      if (tipo === 'todos' || tipo === 'hotel') {
        console.log('Buscando hoteles en BD...');
        const hoteles = await hotelService.buscarHoteles(termino);
        console.log('Hoteles encontrados en BD:', hoteles);
        const hotelesConTipo = hoteles.map(hotel => ({
          ...hotel,
          tipoAlojamiento: 'Hotel',
          icono: '🏨'
        }));
        resultados.push(...hotelesConTipo);
      }
      
      // Buscar en moteles de la BD
      if (tipo === 'todos' || tipo === 'motel') {
        console.log('Buscando moteles en BD...');
        const moteles = await motelService.buscarMoteles(termino);
        console.log('Moteles encontrados en BD:', moteles);
        const motelesConTipo = moteles.map(motel => ({
          ...motel,
          tipoAlojamiento: 'Motel',
          icono: '🏩'
        }));
        resultados.push(...motelesConTipo);
      }
      
    } catch (error) {
      console.error('Error en búsqueda en BD:', error);
    }
    
    console.log('Resultados SOLO de BD:', resultados);
    return resultados;
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Buscando resultados...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header de resultados */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Resultados de búsqueda
          </h1>
          <p className="text-gray-600">
            {totalResultados > 0 
              ? `${totalResultados} resultado${totalResultados !== 1 ? 's' : ''} para "${terminoBusqueda}"`
              : `No se encontraron resultados para "${terminoBusqueda}"`
            }
            {tipoFiltro !== 'todos' && (
              <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {tipoFiltro}
              </span>
            )}
          </p>
        </div>

        {/* Resultados */}
        {resultados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resultados.map((resultado) => (
              <div key={`${resultado.tipoAlojamiento}-${resultado.id}`} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={obtenerImagen(resultado)} 
                    alt={resultado.nombre}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-sm font-medium">
                    {resultado.icono} {resultado.tipoAlojamiento}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {resultado.nombre}
                    </h3>
                    <div className="flex items-center">
                      {Array(Math.floor(resultado.calificacion || 5)).fill(0).map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">★</span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {resultado.ciudad}, {resultado.estado}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-green-600 font-semibold">
                      ${formatearPrecio(resultado.precio)} / noche
                    </div>
                    
                    <Link
                      to={resultado.tipoAlojamiento === 'Hotel' ? `/hoteles/${resultado.id}` : resultado.tipoAlojamiento === 'Motel' ? `/moteles/${resultado.id}` : '#'}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-gray-500 mb-6">
              Intenta con diferentes palabras clave o filtra por otro tipo de alojamiento
            </p>
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultadosBusqueda;
