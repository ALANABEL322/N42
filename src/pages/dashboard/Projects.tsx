import { useEffect } from 'react';

export default function Projects() {
  useEffect(() => {
    document.title = 'Mis Proyectos - Branding Platform';
  }, []);

  return (
    <div className="flex-1 min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">Mis Proyectos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cards de proyectos */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Proyecto Ejemplo</h2>
            <p className="text-gray-600 mb-4">Descripción del proyecto</p>
            <div className="flex justify-end">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
