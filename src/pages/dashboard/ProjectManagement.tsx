import { useEffect } from 'react';

export default function ProjectManagement() {
  useEffect(() => {
    document.title = 'Gestión de Proyectos - Branding Platform';
  }, []);

  return (
    <div className="flex-1 min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">Gestión de Proyectos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cards de gestión */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Estado de Proyectos</h2>
            <div className="text-gray-600">Aquí podrás ver el estado de tus proyectos</div>
          </div>
        </div>
      </div>
    </div>
  );
}
