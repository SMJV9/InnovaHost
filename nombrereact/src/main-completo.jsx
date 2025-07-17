import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './contextos/AuthContext.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './componentes/layout.jsx';
import Home from './paginas/Home.jsx';
import SobreNosotros from './paginas/SobreNosotros.jsx';
import Contacto from './paginas/Contacto.jsx';
import ContextEjem10 from './paginas/contextEjem10.jsx';
import AcecesoLogin from './paginas/AcecesoLogin.jsx';
import AccesoRegistro, {action as registroAction} from './paginas/AccesoRegistro.jsx';
import Hoteles from './paginas/Hoteles.jsx';
import Moteles from './paginas/Moteles.jsx';
import Servicios from './paginas/Servicios.jsx';
import DetalleHotel from './paginas/DetalleHotel.jsx';
import DetalleMotel from './paginas/DetalleMotel.jsx';
import ResultadosBusqueda from './paginas/ResultadosBusqueda.jsx';
import EditarPerfil from './paginas/EditarPerfil.jsx';
import RutaProtegida from './componentes/RutaProtegida.jsx';

// Nuevos componentes para el sistema de roles
import AdminLogin from './paginas/AdminLogin.jsx';
import AdminDashboard from './paginas/AdminDashboard.jsx';
import ClienteLogin from './paginas/ClienteLogin.jsx';
import ClienteRegistro from './paginas/ClienteRegistro.jsx';
import PerfilCliente from './paginas/PerfilCliente.jsx';
import LoginUnificado from './paginas/LoginUnificado.jsx';


// Importamos los componentes de las páginas
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/sobre-nosotros',
        element: <SobreNosotros/>
      },
      {
        path: '/contacto',
        element: <Contacto/>
      },
      {
        path: '/buscar',
        element: <ResultadosBusqueda/>
      },
      {
        path: '/hoteles',
        element: <Hoteles/>
      },
      {
        path: '/moteles',
        element: <Moteles/>
      },
      {
        path: '/servicios',
        element: <Servicios/>
      },
      {
        path: '/hotel/:id',
        element: <DetalleHotel/>
      },
      {
        path: '/motel/:id',
        element: <DetalleMotel/>
      },
      {
        path: '/ejemplo',
        element: <ContextEjem10/>
      },
      // Ruta de login unificado (principal)
      {
        path: '/login',
        element: <LoginUnificado/>
      },
      {
        path: '/registro',
        element: <ClienteRegistro/>
      },
      // Rutas de administrador (mantener para acceso directo)
      {
        path: '/admin/login',
        element: <AdminLogin/>
      },
      {
        path: '/admin/dashboard',
        element: <RutaProtegida><AdminDashboard/></RutaProtegida>
      },
      // Rutas de cliente (mantener para acceso directo)
      {
        path: '/cliente/login',
        element: <ClienteLogin/>
      },
      {
        path: '/cliente/registro',
        element: <ClienteRegistro/>
      },
      {
        path: '/cliente/perfil',
        element: <RutaProtegida><PerfilCliente/></RutaProtegida>
      },
      // Mantener rutas anteriores para compatibilidad
      {
        path: '/perfil',
        element: <RutaProtegida><EditarPerfil/></RutaProtegida>
      }

    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
