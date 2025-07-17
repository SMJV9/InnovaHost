import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import usePageTitle from '../componentes/usePageTitle';

function ResultadosBusquedaSimple() {
  const [searchParams] = useSearchParams();
  const terminoBusqueda = searchParams.get('q') || '';
  const tipoFiltro = searchParams.get('tipo') || 'todos';
  
  usePageTitle(`Resultados para "${terminoBusqueda}" - InnovaHost`);
  
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    console.log('=== DEBUGGEO ===');
    console.log('Parámetros URL:', { terminoBusqueda, tipoFiltro });
    
    // Datos de prueba simples
    const datosPrueba = [
      {
        id: 1,
        nombre: "Hotel Test Cancún",
        ciudad: "Cancún",
        estado: "Quintana Roo",
        precio: 1250.00,
        calificacion: 4.8,
        foto: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tipoAlojamiento: 'Hotel',
        icono: '🏨'
      },
      {
        id: 2,
        nombre: "Hotel Test CDMX",
        ciudad: "Ciudad de México",
        estado: "CDMX",
        precio: 980.00,
        calificacion: 4.5,
        foto: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tipoAlojamiento: 'Hotel',
        icono: '🏨'
      }
    ];

    // Filtrar datos
    const resultadosFiltrados = datosPrueba.filter(item => 
      item.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      item.ciudad.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      item.estado.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
    
    console.log('Resultados filtrados:', resultadosFiltrados);
    
    setTimeout(() => {
      setResultados(resultadosFiltrados);
      setCargando(false);
    }, 1000);
    
  }, [terminoBusqueda, tipoFiltro]);

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
            Resultados de búsqueda (Prueba)
          </h1>
          <p className="text-gray-600">
            {resultados.length > 0 
              ? `${resultados.length} resultado${resultados.length !== 1 ? 's' : ''} para "${terminoBusqueda}"`
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
              <div key={resultado.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={resultado.foto} 
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
                      ${resultado.precio?.toFixed(2)} / noche
                    </div>
                    
                    <Link
                      to={`/hotel/${resultado.id}`}
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

export default ResultadosBusquedaSimple;
