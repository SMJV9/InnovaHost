import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import usePageTitle from '../componentes/usePageTitle';
import { useAuth } from '../contextos/AuthContext';

const ClienteLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    
    usePageTitle('Iniciar Sesión Cliente - InnovaHost');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.target);
        const datos = {
            correo: formData.get('correo'),
            clave: formData.get('clave')
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/cliente/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(datos)
            });

            const data = await response.json();

            if (response.ok && data.access_token && data.cliente) {
                // Login exitoso - agregar user_type para identificar como cliente
                const userData = {
                    ...data.cliente,
                    user_type: 'cliente'
                };
                login(userData, data.access_token);
                navigate('/cliente/perfil');
            } else {
                setError(data.error || data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error en login:', error);
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
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="bg-blue-100 rounded-2xl p-4 inline-block mb-4">
                        <svg 
                            className="w-12 h-12 text-blue-600" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">ÁREA DE CLIENTES</h2>
                    <p className="text-gray-600 text-sm">Inicia sesión para gestionar tus reservas</p>
                </div>

                {/* Mensaje de error */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* Aviso importante */}
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                    <div className="flex items-center">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <div>
                            <p className="text-yellow-800 font-medium">Solo para clientes registrados</p>
                            <p className="text-yellow-700 text-xs mt-1">
                                Si tienes credenciales de administrador, usa el 
                                <Link to="/login" className="text-blue-600 hover:underline font-medium ml-1">acceso unificado</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="correo" className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="tu-email@ejemplo.com"
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="clave" className="block text-gray-700 font-medium mb-2">Contraseña</label>
                        <input
                            type="password"
                            id="clave"
                            name="clave"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="••••••"
                            required
                        />
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
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
                        <Link to="/cliente/recuperar-password" className="text-sm text-blue-600 hover:underline">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Credenciales de prueba:</p>
                        <div className="text-xs text-gray-500 space-y-1">
                            <p><strong>Cliente 1:</strong> cliente1@ejemplo.com / cliente123</p>
                            <p><strong>Cliente 2:</strong> cliente2@ejemplo.com / cliente123</p>
                        </div>
                    </div>
                </div>
                
                <p className="mt-4 text-center text-gray-600 text-sm">
                    ¿No tienes una cuenta? 
                    <Link to="/cliente/registro" className="text-blue-600 hover:underline font-medium ml-1">
                        Regístrate aquí
                    </Link>
                </p>
                
                <p className="mt-2 text-center text-gray-600 text-sm">
                    <Link to="/login" className="text-blue-600 hover:underline font-medium">
                        🎯 Usar acceso inteligente
                    </Link>
                    {' | '}
                    <Link to="/" className="text-gray-600 hover:underline">
                        ← Volver al inicio
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ClienteLogin;
