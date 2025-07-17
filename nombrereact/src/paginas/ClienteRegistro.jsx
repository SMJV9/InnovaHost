import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import usePageTitle from '../componentes/usePageTitle';

const ClienteRegistro = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        direccion: '',
        clave: '',
        clave_confirmation: ''
    });
    const navigate = useNavigate();
    
    usePageTitle('Registro Cliente - InnovaHost');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Validar contraseñas
        if (formData.clave !== formData.clave_confirmation) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        if (formData.clave.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/cliente/auth/registro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('¡Registro exitoso! Redirigiendo al login...');
                setTimeout(() => {
                    navigate('/cliente/login?registro=exitoso');
                }, 2000);
            } else {
                if (data.errors) {
                    const errorMessages = Object.values(data.errors).flat().join(', ');
                    setError(errorMessages);
                } else {
                    setError(data.message || 'Error en el registro');
                }
            }
        } catch (error) {
            console.error('Error en registro:', error);
            setError('Error de conexión. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center py-12" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
        }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-60"></div>
            
            {/* Formulario */}
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg mx-4">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="bg-green-100 rounded-2xl p-4 inline-block mb-4">
                        <svg 
                            className="w-12 h-12 text-green-600" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1V3H9V1L3 7V9H1V11H3L4 15C4 16.1 4.9 17 6 17H18C19.1 17 20 16.1 20 15L21 11H23V9H21ZM12 19C12.6 19 13 19.4 13 20S12.6 21 12 21 11 20.6 11 20 11.4 19 12 19ZM6 19C6.6 19 7 19.4 7 20S6.6 21 6 21 5 20.6 5 20 5.4 19 6 19ZM18 19C18.6 19 19 19.4 19 20S18.6 21 18 21 17 20.6 17 20 17.4 19 18 19Z"/>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">CREAR CUENTA CLIENTE</h2>
                    <p className="text-gray-600 text-sm">Únete a InnovaHost y disfruta de nuestros servicios</p>
                </div>

                {/* Mensajes */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">Nombre Completo *</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Juan Pérez García"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="correo" className="block text-gray-700 font-medium mb-2">Correo Electrónico *</label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            value={formData.correo}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="tu-email@ejemplo.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="telefono" className="block text-gray-700 font-medium mb-2">Teléfono</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="+52 123 456 7890"
                        />
                    </div>

                    <div>
                        <label htmlFor="direccion" className="block text-gray-700 font-medium mb-2">Dirección</label>
                        <textarea
                            id="direccion"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleInputChange}
                            rows="2"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Calle, número, colonia, ciudad, estado"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="clave" className="block text-gray-700 font-medium mb-2">Contraseña *</label>
                        <input
                            type="password"
                            id="clave"
                            name="clave"
                            value={formData.clave}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="••••••"
                            minLength="6"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
                    </div>

                    <div>
                        <label htmlFor="clave_confirmation" className="block text-gray-700 font-medium mb-2">Confirmar Contraseña *</label>
                        <input
                            type="password"
                            id="clave_confirmation"
                            name="clave_confirmation"
                            value={formData.clave_confirmation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="••••••"
                            minLength="6"
                            required
                        />
                    </div>
                    
                    <div className="flex items-start mt-4">
                        <input
                            type="checkbox"
                            id="terminos"
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                            required
                        />
                        <label htmlFor="terminos" className="ml-2 block text-sm text-gray-700">
                            Acepto los <Link to="/terminos" className="text-green-600 hover:underline">términos y condiciones</Link> y la <Link to="/privacidad" className="text-green-600 hover:underline">política de privacidad</Link>
                        </label>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                    </button>
                </form>
                
                <p className="mt-6 text-center text-gray-600 text-sm">
                    ¿Ya tienes una cuenta? 
                    <Link to="/cliente/login" className="text-green-600 hover:underline font-medium ml-1">
                        Inicia sesión aquí
                    </Link>
                </p>
                
                <p className="mt-2 text-center text-gray-600 text-sm">
                    <Link to="/" className="text-gray-600 hover:underline">
                        ← Volver al sitio principal
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ClienteRegistro;
