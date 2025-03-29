import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useProjectsStore } from '@/store/projectsStore';
import { useNavigate } from 'react-router-dom';

export default function Projects() {
  const projects = useProjectsStore((state) => state.getProjects());
  const removeProject = useProjectsStore((state) => state.removeProject);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Mis Proyectos - Branding Platform';
  }, []);

  return (
    <div className="flex-1 min-h-screen bg-white p-8 mt-20">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">Mis Proyectos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-[#F6EEEE]  p-6 rounded-lg shadow">
              <img 
                src={project.mockupImage}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-4">{project.brandName}</h2>
              <p className="text-gray-600 mb-6">{project.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 ">Paleta de colores</h3>
                <div className="grid grid-cols-4 gap-3 ">
                  {Object.entries(project.colorPalette).map(([colorName, colorValue]) => (
                    <div key={colorName} className="flex flex-col items-center">
                      <div
                        className="h-12 w-12 rounded-full mb-1 "
                        style={{ backgroundColor: colorValue }}
                        aria-label={`Color ${colorName}`}
                      />
                      <span className="text-sm text-center text-gray-600 capitalize">
                        {colorName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
                  onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                >
                  Ver Detalles
                </Button>
                <Button 
                  className="text-white px-4 py-2 rounded-md bg-red-500 hover:bg-red-600"
                  onClick={() => removeProject(project.id)}
                  title="Eliminar proyecto"
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
