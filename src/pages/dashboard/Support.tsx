import { useEffect } from 'react';

export default function Support() {
  useEffect(() => {
    document.title = 'Soporte - Branding Platform';
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Soporte</h1>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Contacto con Soporte</h2>
          <div className="text-gray-600">
            Aquí podrás contactar con nuestro equipo de soporte para cualquier duda o problema.
          </div>
        </div>
      </div>
    </div>
  );
}
