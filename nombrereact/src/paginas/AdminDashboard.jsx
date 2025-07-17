import React, { useState, useEffect } from 'react';
import { useAuth } from '../contextos/AuthContext';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../componentes/usePageTitle';

const AdminDashboard = () => {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [clientes, setClientes] = useState([]);
    const [hoteles, setHoteles] = useState([]);
    const [moteles, setMoteles] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [editType, setEditType] = useState(''); // 'hotel', 'motel', 'servicio'

    usePageTitle('Dashboard Administrativo - InnovaHost');

    useEffect(() => {
        if (!user || user.user_type !== 'admin') {
            navigate('/admin/login');
            return;
        }
        loadDashboardData();
    }, [user, navigate]);

    const loadDashboardData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/admin/dashboard`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setDashboardData(data.data);
            }
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadClientes = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/admin/clientes?search=${searchTerm}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setClientes(data.data.data || []);
            }
        } catch (error) {
            console.error('Error loading clientes:', error);
        }
    };

    const loadHoteles = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/admin/hoteles?search=${searchTerm}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setHoteles(data.data.data || []);
            }
        } catch (error) {
            console.error('Error loading hoteles:', error);
        }
    };

    const loadMoteles = async () => {
        // Para fines de demostración, uso datos mock
        // En producción esto sería una llamada a la API real
        const motelesData = [
            {
                id: 1,
                nombre: "Motel Paradise",
                ciudad: "Guadalajara",
                estado: "Jalisco",
                tipo: "Motel Familiar",
                precio: 800,
                foto: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                descripcion: "Motel cómodo y privado",
                servicios: ["WiFi", "Parking", "TV Cable"]
            },
            {
                id: 2,
                nombre: "Motel Aurora",
                ciudad: "Monterrey",
                estado: "Nuevo León",
                tipo: "Motel Ejecutivo",
                precio: 1200,
                foto: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                descripcion: "Motel de lujo para ejecutivos",
                servicios: ["WiFi", "Jacuzzi", "Room Service"]
            },
            {
                id: 3,
                nombre: "Motel Dreams",
                ciudad: "Cancún",
                estado: "Quintana Roo",
                tipo: "Motel Romántico",
                precio: 1500,
                foto: "https://images.unsplash.com/photo-1578774204375-8e3cb89ac2c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                descripcion: "Ambiente romántico y privado",
                servicios: ["WiFi", "Jacuzzi", "Decoración temática"]
            }
        ];
        setMoteles(motelesData.filter(motel => 
            motel.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            motel.ciudad.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    };

    const loadServicios = async () => {
        // Para fines de demostración, uso datos mock
        // En producción esto sería una llamada a la API real
        const serviciosData = [
            {
                id: 1,
                nombre: "Spa Relajante",
                categoria: "Bienestar",
                precio: 500,
                descripcion: "Tratamientos de relajación y belleza",
                imagen: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                disponible: true
            },
            {
                id: 2,
                nombre: "Servicio de Lavandería",
                categoria: "Limpieza",
                precio: 100,
                descripcion: "Lavado y planchado de ropa",
                imagen: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                disponible: true
            },
            {
                id: 3,
                nombre: "Transporte Privado",
                categoria: "Transporte",
                precio: 300,
                descripcion: "Servicio de transporte al aeropuerto",
                imagen: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                disponible: true
            },
            {
                id: 4,
                nombre: "Servicio de Comida",
                categoria: "Alimentación",
                precio: 250,
                descripcion: "Room service 24 horas",
                imagen: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                disponible: true
            }
        ];
        setServicios(serviciosData.filter(servicio => 
            servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            servicio.categoria.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    };

    const handleEdit = (item, type) => {
        setEditingItem(item);
        setEditType(type);
        setShowEditModal(true);
    };

    const handleDelete = async (id, type) => {
        if (!confirm(`¿Estás seguro de que quieres eliminar este ${type}?`)) {
            return;
        }

        try {
            // En producción esto sería una llamada a la API real
            if (type === 'hotel') {
                setHoteles(hoteles.filter(h => h.id !== id));
            } else if (type === 'motel') {
                setMoteles(moteles.filter(m => m.id !== id));
            } else if (type === 'servicio') {
                setServicios(servicios.filter(s => s.id !== id));
            }
            
            // Aquí iría la llamada real a la API para eliminar
            // await fetch(`${API_URL}/api/admin/${type}s/${id}`, { method: 'DELETE' });
            
        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
            alert(`Error al eliminar el ${type}`);
        }
    };

    const handleSaveEdit = async (updatedItem) => {
        try {
            // En producción esto sería una llamada a la API real
            if (editType === 'hotel') {
                setHoteles(hoteles.map(h => h.id === updatedItem.id ? updatedItem : h));
            } else if (editType === 'motel') {
                setMoteles(moteles.map(m => m.id === updatedItem.id ? updatedItem : m));
            } else if (editType === 'servicio') {
                setServicios(servicios.map(s => s.id === updatedItem.id ? updatedItem : s));
            }
            
            setShowEditModal(false);
            setEditingItem(null);
            setEditType('');
            
            // Aquí iría la llamada real a la API para actualizar
            // await fetch(`${API_URL}/api/admin/${editType}s/${updatedItem.id}`, { 
            //     method: 'PUT', 
            //     body: JSON.stringify(updatedItem) 
            // });
            
        } catch (error) {
            console.error(`Error updating ${editType}:`, error);
            alert(`Error al actualizar el ${editType}`);
        }
    };

    useEffect(() => {
        if (activeTab === 'clientes') {
            loadClientes();
        } else if (activeTab === 'hoteles') {
            loadHoteles();
        } else if (activeTab === 'moteles') {
            loadMoteles();
        } else if (activeTab === 'servicios') {
            loadServicios();
        }
    }, [activeTab, searchTerm]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navigation Tabs */}
                <div className="border-b border-gray-200 mb-8">
                    <nav className="-mb-px flex space-x-8">
                        {[
                            { 
                                id: 'dashboard', 
                                name: 'Dashboard', 
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                )
                            },
                            { 
                                id: 'clientes', 
                                name: 'Clientes', 
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                )
                            },
                            { 
                                id: 'hoteles', 
                                name: 'Hoteles', 
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                )
                            },
                            { 
                                id: 'moteles', 
                                name: 'Moteles', 
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                )
                            },
                            { 
                                id: 'servicios', 
                                name: 'Servicios', 
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V2a2 2 0 012 2v2M8 4v.01M16 4v.01" />
                                    </svg>
                                )
                            },
                            { 
                                id: 'reportes', 
                                name: 'Reportes', 
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                )
                            }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-medium text-sm transition-all duration-200 ${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <span className={`transition-colors duration-200 ${
                                    activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
                                }`}>
                                    {tab.icon}
                                </span>
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && dashboardData && (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Clientes</p>
                                        <p className="text-2xl font-bold text-gray-900">{dashboardData.total_clientes}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Hoteles</p>
                                        <p className="text-2xl font-bold text-gray-900">{dashboardData.total_hoteles}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Administradores</p>
                                        <p className="text-2xl font-bold text-gray-900">{dashboardData.total_administradores}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Clientes Este Mes</p>
                                        <p className="text-2xl font-bold text-gray-900">{dashboardData.resumen_mensual.clientes_nuevos}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Clients */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Clientes Recientes</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Registro</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {dashboardData.clientes_recientes?.map((cliente) => (
                                            <tr key={cliente.id_cliente}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {cliente.nombre}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {cliente.correo}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {cliente.telefono || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(cliente.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Clientes Tab */}
                {activeTab === 'clientes' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Gestión de Clientes</h2>
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="Buscar clientes..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Registro</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {clientes.map((cliente) => (
                                        <tr key={cliente.id_cliente} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {cliente.id_cliente}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {cliente.nombre}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {cliente.correo}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {cliente.telefono || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(cliente.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Hoteles Tab */}
                {activeTab === 'hoteles' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Gestión de Hoteles</h2>
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="Buscar hoteles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Agregar Hotel
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {hoteles.map((hotel) => (
                                <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img 
                                        src={hotel.foto || 'https://images.unsplash.com/photo-1566073771259-6a8506099945'} 
                                        alt={hotel.nombre}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{hotel.nombre}</h3>
                                        <p className="text-sm text-gray-600 mb-1">{hotel.ciudad}, {hotel.estado}</p>
                                        <p className="text-sm text-gray-600 mb-2">{hotel.tipo}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-green-600">
                                                ${hotel.precio?.toLocaleString() || 'N/A'}
                                            </span>
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => handleEdit(hotel, 'hotel')}
                                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    Editar
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(hotel.id, 'hotel')}
                                                    className="text-red-600 hover:text-red-800 text-sm"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Moteles Tab */}
                {activeTab === 'moteles' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Gestión de Moteles</h2>
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="Buscar moteles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Agregar Motel
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {moteles.map((motel) => (
                                <div key={motel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img 
                                        src={motel.foto} 
                                        alt={motel.nombre}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                                        }}
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{motel.nombre}</h3>
                                        <p className="text-sm text-gray-600 mb-1">{motel.ciudad}, {motel.estado}</p>
                                        <p className="text-sm text-gray-600 mb-2">{motel.tipo}</p>
                                        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{motel.descripcion}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-green-600">
                                                ${motel.precio?.toLocaleString()}
                                            </span>
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => handleEdit(motel, 'motel')}
                                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    Editar
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(motel.id, 'motel')}
                                                    className="text-red-600 hover:text-red-800 text-sm"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Servicios Tab */}
                {activeTab === 'servicios' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Gestión de Servicios</h2>
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="Buscar servicios..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Agregar Servicio
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {servicios.map((servicio) => (
                                <div key={servicio.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img 
                                        src={servicio.imagen} 
                                        alt={servicio.nombre}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                                        }}
                                    />
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{servicio.nombre}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                servicio.disponible 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {servicio.disponible ? 'Disponible' : 'No disponible'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-1">{servicio.categoria}</p>
                                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{servicio.descripcion}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-green-600">
                                                ${servicio.precio?.toLocaleString()}
                                            </span>
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => handleEdit(servicio, 'servicio')}
                                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    Editar
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(servicio.id, 'servicio')}
                                                    className="text-red-600 hover:text-red-800 text-sm"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Reportes Tab */}
                {activeTab === 'reportes' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-900">Reportes y Análisis</h2>
                        <div className="bg-white p-8 rounded-lg shadow text-center">
                            <p className="text-gray-600">Esta sección está en desarrollo...</p>
                            <p className="text-sm text-gray-500 mt-2">Próximamente: Reportes de reservas, análisis de ocupación y estadísticas detalladas.</p>
                        </div>
                    </div>
                )}

                {/* Modal de Edición */}
                {showEditModal && editingItem && (
                    <EditModal
                        item={editingItem}
                        type={editType}
                        onSave={handleSaveEdit}
                        onClose={() => {
                            setShowEditModal(false);
                            setEditingItem(null);
                            setEditType('');
                        }}
                    />
                )}
            </div>
        </div>
    );
};

// Componente Modal de Edición
const EditModal = ({ item, type, onSave, onClose }) => {
    const [formData, setFormData] = useState(item);

    const handleChange = (e) => {
        const { name, value, type: inputType, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: inputType === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-96 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">
                    Editar {type.charAt(0).toUpperCase() + type.slice(1)}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {(type === 'hotel' || type === 'motel') && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ciudad
                                </label>
                                <input
                                    type="text"
                                    name="ciudad"
                                    value={formData.ciudad || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Estado
                                </label>
                                <input
                                    type="text"
                                    name="estado"
                                    value={formData.estado || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tipo
                                </label>
                                <input
                                    type="text"
                                    name="tipo"
                                    value={formData.tipo || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </>
                    )}

                    {type === 'servicio' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Categoría
                                </label>
                                <input
                                    type="text"
                                    name="categoria"
                                    value={formData.categoria || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="disponible"
                                    checked={formData.disponible || false}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label className="text-sm font-medium text-gray-700">
                                    Disponible
                                </label>
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Precio
                        </label>
                        <input
                            type="number"
                            name="precio"
                            value={formData.precio || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción
                        </label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion || ''}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;
