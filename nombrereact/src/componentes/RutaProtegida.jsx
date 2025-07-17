import { useAuth } from '../contextos/AuthContext';
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // Mostrar carga mientras verifica autenticación
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Verificando acceso...</p>
                </div>
            </div>
        );
    }

    // Si no está autenticado, redirigir al login
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    // Si está autenticado, mostrar el componente
    return children;
};

export default RutaProtegida;