import { Outlet } from 'react-router-dom';

const SimpleLayout = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#333', color: 'white', padding: '10px', marginBottom: '20px' }}>
        <h1>InnovaHost - Layout Simple</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default SimpleLayout;
