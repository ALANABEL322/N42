import { useEffect } from 'react';

export default function Reports() {
  useEffect(() => {
    document.title = 'Informes - Branding Platform';
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Informes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cards de informes */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Informes Recientes</h2>
          <div className="text-gray-600">Aquí podrás ver tus informes generados</div>
        </div>
      </div>
    </div>
  );
}
