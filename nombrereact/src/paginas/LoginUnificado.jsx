import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import usePageTitle from '../componentes/usePageTitle';
import { useAuth } from '../contextos/AuthContext';

const LoginUnificado = () => {
    const [searchParams] = useSearchParams();
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    
    usePageTitle('Iniciar Sesión - InnovaHost');

    React.useEffect(() => {
        if (searchParams.get('registro') === 'exitoso') {
            setMostrarMensaje(true);
            setTimeout(() => {
                setMostrarMensaje(false);
            }, 5000);
        }
    }, [searchParams]);

    const tryClientLogin = async (credentials) => {
        try {
            console.log('🔍 Intentando login como cliente con:', credentials);
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/cliente/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    correo: credentials.email,
                    clave: credentials.password
                })
            });

            console.log('📊 Respuesta cliente - Status:', response.status);
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Login cliente exitoso:', data);
                return {
                    success: true,
                    data: {
                        ...data,
                        user: {
                            ...data.cliente,
                            user_type: 'cliente'
                        }
                    }
                };
            } else {
                const errorData = await response.json();
                console.log('❌ Error en login cliente:', errorData);
                return { success: false, error: errorData };
            }
        } catch (error) {
            console.error('🚨 Error en tryClientLogin:', error);
            return { success: false, error: error.message };
        }
    };

    const tryAdminLogin = async (credentials) => {
        try {
            console.log('🔍 Intentando login como admin con:', credentials);
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/admin/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            console.log('📊 Respuesta admin - Status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('✅ Login admin exitoso:', data);
                return {
                    success: true,
                    data: {
                        ...data,
                        user: {
                            ...data.user,
                            user_type: 'admin'
                        }
                    }
                };
            } else {
                const errorData = await response.json();
                console.log('❌ Error en login admin:', errorData);
                return { success: false, error: errorData };
            }
        } catch (error) {
            console.error('🚨 Error en tryAdminLogin:', error);
            return { success: false, error: error.message };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.target);
        const credentials = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            console.log('🚀 Iniciando proceso de login con credenciales:', credentials);
            
            // Primero intentar login como cliente
            const clientResult = await tryClientLogin(credentials);
            
            if (clientResult.success) {
                // Login exitoso como cliente
                console.log('🎉 Login exitoso como cliente');
                login(clientResult.data.user, clientResult.data.access_token);
                // Mostrar mensaje de éxito antes de redirigir
                setError(''); // Limpiar errores
                const successDiv = document.createElement('div');
                successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce';
                successDiv.innerHTML = '✅ Acceso de cliente detectado. Redirigiendo...';
                document.body.appendChild(successDiv);
                setTimeout(() => {
                    navigate('/cliente/perfil');
                    document.body.removeChild(successDiv);
                }, 1500);
                return;
            }

            console.log('⚠️ Login como cliente falló, intentando como admin...');
            
            // Si falló como cliente, intentar como admin
            const adminResult = await tryAdminLogin(credentials);
            
            if (adminResult.success) {
                // Login exitoso como admin
                console.log('🎉 Login exitoso como admin');
                login(adminResult.data.user, adminResult.data.access_token);
                // Mostrar mensaje de éxito antes de redirigir
                setError(''); // Limpiar errores
                const successDiv = document.createElement('div');
                successDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce';
                successDiv.innerHTML = '🔐 Acceso de administrador detectado. Redirigiendo...';
                document.body.appendChild(successDiv);
                setTimeout(() => {
                    navigate('/admin/dashboard');
                    document.body.removeChild(successDiv);
                }, 1500);
                return;
            }

            console.log('❌ Ambos tipos de login fallaron');
            
            // Si ambos fallaron
            let errorMessage = '❌ Credenciales no encontradas. Verifica tu email y contraseña, o regístrate si eres nuevo.';
            
            // Mostrar detalles del error si están disponibles
            if (clientResult.error || adminResult.error) {
                console.log('Detalles de errores:', { clientResult, adminResult });
                errorMessage += `\nDetalles: ${clientResult.error?.message || adminResult.error?.message || 'Error desconocido'}`;
            }
            
            setError(errorMessage);

        } catch (error) {
            console.error('🚨 Error general en login:', error);
            setError('Error de conexión. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
        }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-60"></div>
            
            {/* Formulario */}
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 form-animation">
                {/* Logo */}
                <div className="text-center mb-8 slide-down">
                    <div className="bg-blue-100 rounded-2xl p-4 inline-block mb-4">
                        <svg 
                            className="w-12 h-12 text-blue-600" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path d="M4 21V7l8-6 8 6v14H4zm2-2h2v-3h8v3h2V8.5l-6-4.5-6 4.5V19zm4-5h1v1H10v-1zm3 0h1v1h-1v-1zm-3-2h1v1H10v-1zm3 0h1v1h-1v-1zm-3-2h1v1H10v-1zm3 0h1v1h-1v-1z"/>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">INNOVAHOST</h2>
                    <p className="text-gray-600 text-sm">Portal de Acceso Único</p>
                    <p className="text-gray-500 text-xs mt-1">Para clientes y administradores</p>
                </div>

                {/* Mensaje de registro exitoso */}
                {mostrarMensaje && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm animate-pulse slide-down">
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            ¡Registro exitoso! Ya puedes iniciar sesión.
                        </div>
                    </div>
                )}

                {/* Mensaje de error */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* Información de acceso */}
                <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg text-sm">
                    <div className="flex items-center mb-2">
                        <span className="text-xl mr-2">🎯</span>
                        <p className="text-blue-800 font-semibold">Sistema de Acceso Inteligente</p>
                    </div>
                    <p className="text-blue-700 text-xs leading-relaxed">
                        <strong>Solo ingresa tus credenciales</strong> y automáticamente serás dirigido al área correcta:
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-blue-100 p-2 rounded flex items-center">
                            <span className="mr-1">👤</span>
                            <span className="text-blue-800"><strong>Clientes:</strong> Perfil y reservas</span>
                        </div>
                        <div className="bg-red-100 p-2 rounded flex items-center">
                            <span className="mr-1">🔐</span>
                            <span className="text-red-800"><strong>Admins:</strong> Dashboard completo</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 slide-in-left">
                    <div className="smooth-transition form-field">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent auth-input"
                            placeholder="tu-email@ejemplo.com"
                            required
                        />
                    </div>
                    
                    <div className="form-field">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent auth-input"
                            placeholder="••••••"
                            required
                        />
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 form-field">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="recordar"
                                name="recordar"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="recordar" className="ml-2 block text-sm text-gray-700">
                                Recordar sesión
                            </label>
                        </div>
                        <Link to="/recuperar-password" className="text-sm text-blue-600 hover:underline">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 mt-6 auth-button disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                                Detectando tipo de usuario...
                            </div>
                        ) : '🎯 Acceso Inteligente'}
                    </button>
                </form>

                {/* Credenciales de prueba */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-3">Credenciales de prueba:</p>
                        <div className="text-xs text-gray-500 space-y-2">
                            <div className="bg-blue-50 p-2 rounded">
                                <p className="font-medium text-blue-800">👤 Clientes:</p>
                                <p>cliente1@ejemplo.com / cliente123</p>
                                <p>cliente2@ejemplo.com / cliente123</p>
                            </div>
                            <div className="bg-red-50 p-2 rounded">
                                <p className="font-medium text-red-800">🔐 Administradores:</p>
                                <p>admin@hotel.com / admin123</p>
                                <p>manager@hotel.com / manager123</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <p className="mt-6 text-center text-gray-600 text-sm slide-in-right">
                    ¿No tienes una cuenta? 
                    <Link to="/registro" className="text-blue-600 hover:underline font-medium ml-1 auth-link">
                        Regístrate como cliente
                    </Link>
                </p>
                
                <p className="mt-2 text-center text-gray-600 text-sm">
                    <Link to="/" className="text-gray-600 hover:underline">
                        ← Volver al inicio
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginUnificado;
