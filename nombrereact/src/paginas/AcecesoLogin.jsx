import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import usePageTitle from '../componentes/usePageTitle';
import { useAuth } from '../contextos/AuthContext';
import { authLogin } from '../servicios/ApiAuth';

const AcecesoLogin = () => {
    const [searchParams] = useSearchParams();
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    
    // Hook personalizado para cambiar título de la página
    usePageTitle('Iniciar Sesión - InnovaHost');
    
    useEffect(() => {
        if (searchParams.get('registro') === 'exitoso') {
            setMostrarMensaje(true);
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                setMostrarMensaje(false);
            }, 5000);
        }
    }, [searchParams]);

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
            const response = await authLogin(datos);
            
            if (response && response.access_token && response.user) {
                // Login exitoso
                login(response.user, response.access_token);
                navigate('/perfil'); // Redirigir al perfil del usuario
            } else {
                setError('Error en la respuesta del servidor');
            }
        } catch (error) {
            console.error('Error en login:', error);
            setError(error.message || 'Error al iniciar sesión. Intenta de nuevo.');
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
                    <div className="bg-gray-100 rounded-2xl p-4 inline-block mb-4">
                        <svg 
                            className="w-12 h-12 text-gray-600" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path d="M4 21V7l8-6 8 6v14H4zm2-2h2v-3h8v3h2V8.5l-6-4.5-6 4.5V19zm4-5h1v1H10v-1zm3 0h1v1h-1v-1zm-3-2h1v1H10v-1zm3 0h1v1h-1v-1zm-3-2h1v1H10v-1zm3 0h1v1h-1v-1z"/>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">INNOVAHOST</h2>
                    <p className="text-gray-600 text-sm">Hosting services since 1995</p>
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

                <form onSubmit={handleSubmit} className="space-y-4 slide-in-left">
                    <div className="smooth-transition form-field">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent auth-input"
                            placeholder="ejemplo@gmail.com"
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
                        <Link to="/" className="text-sm text-blue-600 hover:underline">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-900 transition duration-200 mt-6 auth-button disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>
                
                <p className="mt-6 text-center text-gray-600 text-sm slide-in-right">
                    ¿No tienes una cuenta? 
                    <Link to="/registro" className="text-blue-600 hover:underline font-medium ml-1 auth-link">
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AcecesoLogin;