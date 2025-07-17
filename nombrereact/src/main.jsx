import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contextos/AuthContext';
import RutaProtegida from './componentes/RutaProtegida';

// Importar páginas principales
import Home from './paginas/Home';
import Hoteles from './paginas/Hoteles';
import Moteles from './paginas/Moteles';
import Servicios from './paginas/Servicios';
import SobreNosotros from './paginas/SobreNosotros';
import Contacto from './paginas/Contacto';

// Importar páginas de autenticación
import LoginUnificado from './paginas/LoginUnificado';
import ClienteRegistro from './paginas/ClienteRegistro';
import AdminLogin from './paginas/AdminLogin';

// Importar páginas protegidas
import PerfilCliente from './paginas/PerfilCliente';
import EditarPerfil from './paginas/EditarPerfil';
import AdminDashboard from './paginas/AdminDashboard';

// Importar páginas de detalles y resultados
import DetalleHotel from './paginas/DetalleHotel';
import DetalleMotel from './paginas/DetalleMotel';
import ResultadosBusqueda from './paginas/ResultadosBusqueda';

// Importar estilos
import './index.css';

// Importar layout principal
import Layout from './componentes/layout';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Rutas públicas con layout */}
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="hoteles" element={<Hoteles />} />
                        <Route path="moteles" element={<Moteles />} />
                        <Route path="servicios" element={<Servicios />} />
                        <Route path="sobre-nosotros" element={<SobreNosotros />} />
                        <Route path="contacto" element={<Contacto />} />
                        
                        {/* Rutas de detalles */}
                        <Route path="hotel/:id" element={<DetalleHotel />} />
                        <Route path="motel/:id" element={<DetalleMotel />} />
                        <Route path="busqueda" element={<ResultadosBusqueda />} />
                        
                        {/* Rutas protegidas dentro del layout */}
                        <Route path="perfil" element={
                            <RutaProtegida>
                                <PerfilCliente />
                            </RutaProtegida>
                        } />
                        
                        <Route path="editar-perfil" element={
                            <RutaProtegida>
                                <EditarPerfil />
                            </RutaProtegida>
                        } />
                        
                        {/* Ruta protegida para administradores */}
                        <Route path="admin/dashboard" element={
                            <RutaProtegida>
                                <AdminDashboard />
                            </RutaProtegida>
                        } />
                    </Route>

                    {/* Rutas de autenticación (sin layout) */}
                    <Route path="/login" element={<LoginUnificado />} />
                    <Route path="/registro" element={<ClienteRegistro />} />
                    <Route path="/admin/login" element={<AdminLogin />} />

                    {/* Redirección por defecto para rutas no encontradas */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);