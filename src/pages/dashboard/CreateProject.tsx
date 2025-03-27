import { useEffect } from 'react';

export default function CreateProject() {
  useEffect(() => {
    document.title = 'Crear Proyecto - Branding Platform';
  }, []);

  return (
    <div className="flex min-h-screen bg-white p-8 mt-16">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-6">Crear Nuevo Proyecto</h1>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Proyecto</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md"
          >
            Crear Proyecto
          </button>
        </form>
      </div>
    </div>
  );
}
