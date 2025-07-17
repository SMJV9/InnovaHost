import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContext';
import { useState, useEffect } from 'react';

const Layout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Detectar scroll para cambiar el fondo del navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para que las páginas hijas puedan establecer la imagen de fondo
  useEffect(() => {
    const handleBackgroundChange = (event) => {
      setBackgroundImage(event.detail.image);
    };

    window.addEventListener('setNavbarBackground', handleBackgroundChange);
    return () => window.removeEventListener('setNavbarBackground', handleBackgroundChange);
  }, []);

  // Limpiar imagen de fondo cuando cambia la ruta
  useEffect(() => {
    setBackgroundImage(null);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    // Redirigir a la página principal después del logout
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  return (
   <div 
    className="bg-white min-h-screen flex flex-col transition-all duration-500 ease-in-out"
    style={{
      backgroundImage: backgroundImage 
        ? `linear-gradient(rgba(255, 255, 255, 0.90), rgba(255, 255, 255, 0.90)), url(${backgroundImage})` 
        : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}
   >
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled 
            ? 'shadow-lg border-b border-gray-200' 
            : 'border-b border-gray-200'
        }`}
        style={{
          backgroundColor: scrolled && backgroundImage 
            ? 'transparent' 
            : scrolled 
              ? 'rgba(255, 255, 255, 0.95)' 
              : 'rgb(255, 255, 255)',
          backgroundImage: scrolled && backgroundImage 
            ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})` 
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backdropFilter: scrolled && !backgroundImage ? 'blur(10px)' : 'none'
        }}
      >
        <div className="w-full navbar-container">
          <div className="flex items-center h-20 max-w-full">
            {/* Logo - Pegado a la izquierda */}
            <div className="flex-shrink-0 logo-container">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300 cursor-pointer">
                <svg 
                  className={`w-10 h-10 transition-colors duration-300 ${
                    scrolled && backgroundImage ? 'text-white' : 'text-black'
                  }`} 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M4 21V7l8-6 8 6v14H4zm2-2h2v-3h8v3h2V8.5l-6-4.5-6 4.5V19zm4-5h1v1H10v-1zm3 0h1v1h-1v-1zm-3-2h1v1H10v-1zm3 0h1v1h-1v-1zm-3-2h1v1H10v-1zm3 0h1v1h-1v-1z"/>
                </svg>
                <span className={`font-bold text-2xl transition-colors duration-300 whitespace-nowrap ${
                  scrolled && backgroundImage ? 'text-white text-shadow' : 'text-gray-900'
                }`}>
                  {user?.user_type === 'admin' && location.pathname.includes('/admin') 
                    ? 'Dashboard Administrativo' 
                    : 'InnovaHost'
                  }
                </span>
              </Link>
            </div>
            
            {/* Navigation Links - Centro - Solo mostrar si no es admin en dashboard */}
            {!(user?.user_type === 'admin' && location.pathname.includes('/admin')) && (
              <div className="hidden lg:flex space-x-6 mx-auto">
                <Link to="/" className={`font-medium hover:text-blue-400 transition-colors navbar-element px-3 py-2 rounded-md ${
                  scrolled && backgroundImage ? 'text-white text-shadow hover:bg-white hover:bg-opacity-10' : 'text-gray-900 hover:bg-gray-100'
                }`}>Inicio</Link>
                <Link to="/hoteles" className={`font-medium hover:text-blue-400 transition-colors navbar-element px-3 py-2 rounded-md ${
                  scrolled && backgroundImage ? 'text-gray-200 text-shadow hover:bg-white hover:bg-opacity-10' : 'text-gray-700 hover:bg-gray-100'
                }`}>Hoteles</Link>
                <Link to="/moteles" className={`font-medium hover:text-blue-400 transition-colors navbar-element px-3 py-2 rounded-md ${
                  scrolled && backgroundImage ? 'text-gray-200 text-shadow hover:bg-white hover:bg-opacity-10' : 'text-gray-700 hover:bg-gray-100'
                }`}>Moteles</Link>
                <Link to="/servicios" className={`font-medium hover:text-blue-400 transition-colors navbar-element px-3 py-2 rounded-md ${
                  scrolled && backgroundImage ? 'text-gray-200 text-shadow hover:bg-white hover:bg-opacity-10' : 'text-gray-700 hover:bg-gray-100'
                }`}>Servicios</Link>
                <Link to="/contacto" className={`font-medium hover:text-blue-400 transition-colors navbar-element px-3 py-2 rounded-md ${
                  scrolled && backgroundImage ? 'text-gray-200 text-shadow hover:bg-white hover:bg-opacity-10' : 'text-gray-700 hover:bg-gray-100'
                }`}>Contactos</Link>
                <Link to="/sobre-nosotros" className={`font-medium hover:text-blue-400 transition-colors navbar-element px-3 py-2 rounded-md ${
                  scrolled && backgroundImage ? 'text-gray-200 text-shadow hover:bg-white hover:bg-opacity-10' : 'text-gray-700 hover:bg-gray-100'
                }`}>Acerca de</Link>
              </div>
            )}

            {/* Espaciador para dashboard admin */}
            {user?.user_type === 'admin' && location.pathname.includes('/admin') && (
              <div className="flex-1"></div>
            )}
            
            {/* Auth buttons - Fijos a la derecha */}
            <div className="flex-shrink-0 pr-4">
              <div className="flex items-center space-x-4">
                {isAuthenticated() ? (
                  // Usuario autenticado - Dropdown Menu
                  <div className="relative user-dropdown">
                    <button
                      onClick={toggleDropdown}
                      className={`dropdown-button flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-opacity-10 ${
                        scrolled && backgroundImage 
                          ? 'text-white text-shadow hover:bg-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>Hola, {user?.nombre || user?.name}</span>
                      {user?.user_type === 'admin' && <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">Admin</span>}
                      {user?.user_type === 'cliente' && <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">Cliente</span>}
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="dropdown-menu absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {user?.nombre || user?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user?.email}
                          </p>
                        </div>
                        
                        <div className="py-1">
                          {user?.user_type === 'admin' ? (
                            <Link 
                              to="/admin/dashboard"
                              onClick={() => setIsDropdownOpen(false)}
                              className="dropdown-item flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                            >
                              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                              Dashboard Administrativo
                            </Link>
                          ) : (
                            <Link 
                              to="/cliente/perfil"
                              onClick={() => setIsDropdownOpen(false)}
                              className="dropdown-item flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                            >
                              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              Mi Perfil
                            </Link>
                          )}
                          
                          <div className="border-t border-gray-100 my-1"></div>
                          
                          <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors duration-200 cursor-pointer"
                               onClick={handleLogout}>
                            <div className="flex items-center flex-1">
                              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              <span>Cerrar Sesión</span>
                            </div>
                            <div className="flex-shrink-0 ml-4">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Usuario no autenticado
                  <>
                    <Link to="/login" className={`font-medium hover:text-blue-400 transition-colors navbar-element px-4 py-2 rounded-lg ${
                      scrolled && backgroundImage ? 'text-white text-shadow hover:bg-white hover:bg-opacity-10' : 'text-gray-700 hover:bg-gray-100'
                    }`}>Iniciar Sesión</Link>
                    
                    <Link to="/registro" className={`btn-compact rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
                      scrolled && backgroundImage 
                        ? 'bg-white text-gray-900 hover:bg-gray-100' 
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}>Regístrate</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Spacer para compensar el navbar fixed */}
      <div className="h-20"></div>
      
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;