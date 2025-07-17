import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BuscadorGeneral() {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('todos');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado con:', { terminoBusqueda, tipoFiltro });
    
    if (terminoBusqueda.trim()) {
      // Navegar a una página de resultados de búsqueda con parámetros
      const params = new URLSearchParams();
      params.set('q', terminoBusqueda.trim());
      params.set('tipo', tipoFiltro);
      
      const url = `/buscar?${params.toString()}`;
      console.log('Navegando a:', url);
      
      navigate(url);
    } else {
      console.log('No hay término de búsqueda');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mx-4 -mt-16 relative z-20 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Buscar Alojamiento
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Campo de búsqueda */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Qué estás buscando?
            </label>
            <input
              type="text"
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              placeholder="Buscar hotel, motel, habitación, ciudad..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          
          {/* Filtro por tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de alojamiento
            </label>
            <select
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="todos">Todos</option>
              <option value="hotel">Hoteles</option>
            </select>
          </div>
        </div>
        
        {/* Botón de búsqueda */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Buscar
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default BuscadorGeneral;
