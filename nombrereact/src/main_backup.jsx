import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Importar contexto
import { AuthProvider } from './contextos/AuthContext.jsx';

// Importar componentes principales
import Layout from './componentes/layout.jsx';
import Home from './paginas/Home.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/hoteles" element={<div className="p-8 text-center"><h1 className="text-2xl">Página de Hoteles (próximamente)</h1></div>} />
            <Route path="/moteles" element={<div className="p-8 text-center"><h1 className="text-2xl">Página de Moteles (próximamente)</h1></div>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
