import React from 'react';
import usePageTitle from '../componentes/usePageTitle';

function SobreNosotros() {
  // Hook personalizado para cambiar título de la página
  usePageTitle('Sobre Nosotros - InnovaHost | Conoce nuestra historia');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sobre <span className="text-yellow-400">InnovaHost</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Innovando en hospitalidad desde 2020, creando experiencias únicas para viajeros de todo el mundo
          </p>
        </div>
      </div>

      {/* Historia Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
              <p className="text-lg text-gray-700 mb-6">
                InnovaHost nació de la visión de revolucionar la industria hotelera, combinando 
                la calidez humana con la tecnología más avanzada. Desde nuestros inicios en 2020, 
                hemos crecido de una pequeña startup a una plataforma líder en reservaciones.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Con más de 10,000 propiedades afiliadas y millones de huéspedes satisfechos, 
                seguimos comprometidos con ofrecer experiencias excepcionales que superen las 
                expectativas de nuestros clientes.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">10,000+</div>
                  <div className="text-gray-600">Propiedades</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">5M+</div>
                  <div className="text-gray-600">Huéspedes</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Historia de InnovaHost"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Misión y Visión</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Misión</h3>
              </div>
              <p className="text-gray-700 text-center">
                Conectar viajeros con experiencias hoteleras excepcionales a través de una 
                plataforma innovadora, segura y fácil de usar, garantizando la satisfacción 
                total de nuestros usuarios.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Visión</h3>
              </div>
              <p className="text-gray-700 text-center">
                Ser la plataforma de reservaciones hoteleras más confiable y reconocida 
                globalmente, estableciendo nuevos estándares en la industria del turismo 
                y la hospitalidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Valores</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Los principios que guían cada decisión y acción en InnovaHost
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excelencia</h3>
              <p className="text-gray-600">
                Nos esforzamos por la perfección en cada detalle, desde la tecnología 
                hasta el servicio al cliente.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Confianza</h3>
              <p className="text-gray-600">
                Construimos relaciones duraderas basadas en transparencia, 
                honestidad y cumplimiento de promesas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovación</h3>
              <p className="text-gray-600">
                Adoptamos nuevas tecnologías y metodologías para mejorar 
                continuamente la experiencia del usuario.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Equipo</h2>
            <p className="text-lg text-gray-600">
              Profesionales apasionados por crear experiencias excepcionales
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-blue-100 shadow-lg">
                <img
                  src="/team/julio.png"
                  alt="Julio Vasquez - CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Julio Vasquez</h3>
              <p className="text-blue-600 mb-3 font-semibold">CEO & Fundador</p>
              <p className="text-gray-600">
                Visionario con más de 15 años de experiencia en la industria hotelera y tecnológica. 
                Lidera la estrategia de innovación y crecimiento de InnovaHost.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-blue-100 shadow-lg">
                <img
                  src="/team/karo.png"
                  alt="Karolina Arvizu - CTO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Karolina Arvizu</h3>
              <p className="text-blue-600 mb-3 font-semibold">CTO</p>
              <p className="text-gray-600">
                Experta en desarrollo de software y arquitectura de sistemas escalables. 
                Dirige el equipo técnico y la innovación tecnológica de la plataforma.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-blue-100 shadow-lg">
                <img
                  src="/team/ruacho.png"
                  alt="Juan Ruacho - COO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Juan Ruacho</h3>
              <p className="text-blue-600 mb-3 font-semibold">COO</p>
              <p className="text-gray-600">
                Especialista en operaciones y optimización de procesos con enfoque en la experiencia del cliente. 
                Supervisa las operaciones diarias y la calidad del servicio.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SobreNosotros;