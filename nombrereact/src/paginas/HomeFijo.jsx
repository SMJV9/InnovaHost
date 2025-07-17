import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../componentes/usePageTitle';

function HomeFijo() {
  // Hook personalizado para cambiar título de la página
  usePageTitle('Inicio - InnovaHost | El mejor sitio para reservaciones');

  // Datos estáticos para evitar el bucle infinito
  const hoteles = [
    {
      id: 1,
      nombre: "Hotel Majestic Plaza",
      ciudad: "Cancún",
      estado: "Quintana Roo",
      precio: 1250.00,
      calificacion: 4.8,
      foto: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      nombre: "Resort Paradise Bay",
      ciudad: "Playa del Carmen",
      estado: "Quintana Roo",
      precio: 2100.00,
      calificacion: 4.9,
      foto: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      nombre: "Hotel Vista Mar",
      ciudad: "Puerto Vallarta",
      estado: "Jalisco",
      precio: 1800.00,
      calificacion: 4.7,
      foto: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-white">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              InnovaHost
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Tu destino perfecto te está esperando
            </p>
            <Link
              to="/hoteles"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 inline-block"
            >
              Explorar Hoteles
            </Link>
          </div>
        </div>
      </div>

      {/* Sección de Hoteles Destacados */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Hoteles Destacados
            </h2>
            <p className="text-xl text-gray-600">
              Descubre los mejores hoteles con ofertas exclusivas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hoteles.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={hotel.foto}
                  alt={hotel.nombre}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {hotel.nombre}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    📍 {hotel.ciudad}, {hotel.estado}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-green-600">
                      ${hotel.precio.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-gray-600">{hotel.calificacion}</span>
                    </div>
                  </div>
                  <Link
                    to={`/hotel/${hotel.id}`}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 block text-center"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/hoteles"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 inline-block"
            >
              Ver Todos los Hoteles
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Servicios */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas para una experiencia inolvidable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🏨</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hoteles de Lujo</h3>
              <p className="text-gray-600">
                Disfruta de la mejor hospitalidad en nuestros hoteles premium
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🏩</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Moteles Cómodos</h3>
              <p className="text-gray-600">
                Comodidad y privacidad en nuestros moteles bien ubicados
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Servicios Premium</h3>
              <p className="text-gray-600">
                Amenidades de primera clase para una estancia perfecta
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeFijo;
