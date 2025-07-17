import React from 'react';

const SimpleHome = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Bienvenido a InnovaHost</h2>
      <p style={{ color: '#666', lineHeight: '1.6' }}>
        Esta es la página de inicio de tu aplicación de reservas de hoteles.
      </p>
      <div style={{ marginTop: '20px' }}>
        <h3 style={{ color: '#555' }}>Enlaces rápidos:</h3>
        <ul style={{ marginTop: '10px' }}>
          <li><a href="/hoteles" style={{ color: '#007bff' }}>Ver Hoteles</a></li>
          <li><a href="/moteles" style={{ color: '#007bff' }}>Ver Moteles</a></li>
          <li><a href="/servicios" style={{ color: '#007bff' }}>Ver Servicios</a></li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleHome;
