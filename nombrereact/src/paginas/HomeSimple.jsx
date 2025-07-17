import { Link } from "react-router-dom";
import { useState } from "react";

function HomeSimple() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
        }}
      >
        <div className="text-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            🏨 InnovaHost
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Descubre el mejor lugar para tu estancia. Hoteles y moteles de calidad con la mejor atención y ubicación.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/hoteles" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              🏨 Explorar Hoteles
            </Link>
            <Link 
              to="/moteles" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              🏩 Ver Moteles
            </Link>
          </div>
        </div>
      </section>

      {/* Servicios destacados */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            ¿Por qué elegir InnovaHost?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4 text-center">🎯</div>
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Mejor Ubicación</h3>
              <p className="text-gray-600 text-center">
                Hoteles y moteles estratégicamente ubicados en las mejores zonas de cada ciudad.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4 text-center">⭐</div>
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Calidad Garantizada</h3>
              <p className="text-gray-600 text-center">
                Solo trabajamos con establecimientos de alta calidad que cumplen nuestros estándares.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4 text-center">💰</div>
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Mejores Precios</h3>
              <p className="text-gray-600 text-center">
                Encuentra las mejores tarifas y ofertas exclusivas solo disponibles en nuestra plataforma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hoteles Destacados */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Hoteles Destacados
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Hotel 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div 
                className="h-48 bg-cover bg-center"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"}}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Hotel Majestic Plaza</h3>
                <p className="text-gray-600 mb-2">📍 Cancún, Quintana Roo</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">$1,250</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                    <span className="ml-1 text-gray-600">(4.8)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div 
                className="h-48 bg-cover bg-center"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"}}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Resort Paradise Bay</h3>
                <p className="text-gray-600 mb-2">📍 Playa del Carmen, Quintana Roo</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">$2,100</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                    <span className="ml-1 text-gray-600">(4.9)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div 
                className="h-48 bg-cover bg-center"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"}}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Hotel Vista Hermosa</h3>
                <p className="text-gray-600 mb-2">📍 Puerto Vallarta, Jalisco</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">$980</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                    <span className="ml-1 text-gray-600">(4.5)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/hoteles" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300 inline-block"
            >
              Ver Todos los Hoteles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeSimple;
