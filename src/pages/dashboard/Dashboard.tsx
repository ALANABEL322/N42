import { useEffect } from 'react';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard - Branding Platform';
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Bienvenido a tu Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cards de estadísticas */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Proyectos Activos</h2>
          <div className="text-3xl font-bold">0</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Plantillas Usadas</h2>
          <div className="text-3xl font-bold">0</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Informes Generados</h2>
          <div className="text-3xl font-bold">0</div>
        </div>
      </div>
    </div>
  );
}
