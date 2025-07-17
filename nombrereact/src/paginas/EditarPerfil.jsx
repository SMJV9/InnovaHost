import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContext';
import usePageTitle from '../componentes/usePageTitle';

const EditarPerfil = () => {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        direccion: '',
        clave: '',
        clave_confirmation: ''
    });

    usePageTitle('Editar Perfil - InnovaHost');

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                nombre: user.nombre || user.name || '',
                correo: user.correo || user.email || '',
                telefono: user.telefono || '',
                direccion: user.direccion || ''
            }));
        }
    }, [user]);

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

        // Validar contraseñas si se están cambiando
        if (formData.clave && formData.clave !== formData.clave_confirmation) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        try {
            const updateData = {
                nombre: formData.nombre,
                correo: formData.correo,
                telefono: formData.telefono,
                direccion: formData.direccion
            };

            // Solo incluir contraseña si se está cambiando
            if (formData.clave) {
                updateData.clave = formData.clave;
                updateData.clave_confirmation = formData.clave_confirmation;
            }

            // Determinar la URL del endpoint según el tipo de usuario
            const endpoint = user.user_type === 'cliente' || user.telefono !== undefined 
                ? '/api/cliente/profile' 
                : '/api/user/profile';

            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Perfil actualizado correctamente');
                // Limpiar campos de contraseña
                setFormData(prev => ({
                    ...prev,
                    clave: '',
                    clave_confirmation: ''
                }));
            } else {
                setError(data.message || 'Error al actualizar el perfil');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error de conexión. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceso denegado</h2>
                    <p className="text-gray-600 mb-4">Debes iniciar sesión para acceder a esta página</p>
                    <button 
                        onClick={() => navigate('/login')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-4">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
                            <p className="text-gray-600 mt-2">Gestiona tu información personal</p>
                        </div>
                        <div className="flex space-x-3">
                            <button 
                                onClick={() => navigate('/')}
                                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                            >
                                Volver al Inicio
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>

                {/* Información del usuario */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Información de la Cuenta</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Usuario desde</p>
                            <p className="font-medium">{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'No disponible'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Última actualización</p>
                            <p className="font-medium">{user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'No disponible'}</p>
                        </div>
                    </div>
                </div>

                {/* Formulario de edición */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Editar Información</h2>

                    {/* Mensajes */}
                    {success && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                            {success}
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nombre */}
                        <div>
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre completo
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-2">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                value={formData.correo}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Dirección */}
                        <div>
                            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">
                                Dirección
                            </label>
                            <textarea
                                id="direccion"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Contraseña */}
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Cambiar Contraseña</h3>
                            <p className="text-sm text-gray-600 mb-4">Deja estos campos vacíos si no deseas cambiar tu contraseña</p>
                            
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="clave" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nueva contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="clave"
                                        name="clave"
                                        value={formData.clave}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        minLength="6"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="clave_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirmar nueva contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="clave_confirmation"
                                        name="clave_confirmation"
                                        value={formData.clave_confirmation}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        minLength="6"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Botón de envío */}
                        <div className="flex justify-end space-x-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditarPerfil;
