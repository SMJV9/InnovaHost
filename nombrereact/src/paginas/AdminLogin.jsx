import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import usePageTitle from '../componentes/usePageTitle';
import { useAuth } from '../contextos/AuthContext';

const AdminLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    
    usePageTitle('Admin Login - InnovaHost');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.target);
        const datos = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/admin/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(datos)
            });

            const data = await response.json();

            if (response.ok && data.access_token && data.user) {
                // Login exitoso - agregar user_type para identificar como admin
                const userData = {
                    ...data.user,
                    user_type: 'admin'
                };
                login(userData, data.access_token);
                navigate('/admin/dashboard');
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
            backgroundImage: "url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
        }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-70"></div>
            
            {/* Formulario */}
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="bg-red-100 rounded-2xl p-4 inline-block mb-4">
                        <svg 
                            className="w-12 h-12 text-red-600" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 14.5c-3.04 0-5.5-1.46-5.5-3.25s2.46-3.25 5.5-3.25 5.5 1.46 5.5 3.25-2.46 3.25-5.5 3.25m0-8.5c-4.42 0-8 2.69-8 6s3.58 6 8 6 8-2.69 8-6-3.58-6-8-6z"/>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">PANEL ADMINISTRATIVO</h2>
                    <p className="text-gray-600 text-sm">InnovaHost Management System</p>
                </div>

                {/* Mensaje de error */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* Aviso importante */}
                <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg text-sm">
                    <div className="flex items-center">
                        <span className="text-orange-600 mr-2">🔒</span>
                        <div>
                            <p className="text-orange-800 font-medium">Acceso solo para administradores</p>
                            <p className="text-orange-700 text-xs mt-1">
                                Si eres cliente, usa mejor el 
                                <Link to="/login" className="text-blue-600 hover:underline font-medium ml-1">acceso unificado</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email de Administrador</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="admin@hotel.com"
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="••••••"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700 transition duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Iniciando sesión...' : 'Acceder al Panel'}
                    </button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Credenciales de prueba:</p>
                        <div className="text-xs text-gray-500 space-y-1">
                            <p><strong>Super Admin:</strong> admin@hotel.com / admin123</p>
                            <p><strong>Manager:</strong> manager@hotel.com / manager123</p>
                        </div>
                    </div>
                </div>
                
                <p className="mt-4 text-center text-gray-600 text-sm">
                    <Link to="/login" className="text-blue-600 hover:underline font-medium">
                        🎯 Usar acceso inteligente  
                    </Link>
                    {' | '}
                    <Link to="/" className="text-red-600 hover:underline">
                        ← Volver al inicio
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
