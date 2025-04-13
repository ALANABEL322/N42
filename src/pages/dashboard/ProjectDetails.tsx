import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjectsStore } from "@/store/projectsStore";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const projects = useProjectsStore((state) => state.getProjects());
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    if (project) {
      document.title = `${project.brandName} - Detalles del Proyecto`;
    }
  }, [project]);

  if (!project) {
    return (
      <div className="flex-1 min-h-screen bg-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Proyecto no encontrado</h1>
          <p className="text-gray-600">
            El proyecto que estás buscando no existe o ha sido eliminado.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-white p-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{project.brandName}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="aspect-[16/9] bg-[#FFF5F5] rounded-lg overflow-hidden">
              <img
                src={project.mockupImage}
                alt={project.brandName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">
                Descripción del Proyecto
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">
                  Paleta de Colores
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(project.colorPalette).map(
                    ([colorName, colorValue]) => (
                      <div
                        key={colorName}
                        className="flex flex-col items-center"
                      >
                        <div
                          className="w-16 h-16 rounded-full mb-2"
                          style={{ backgroundColor: colorValue }}
                        />
                        <span className="text-sm text-center text-gray-600 capitalize">
                          {colorName}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">Tipografía</h3>
                <div className="space-y-4">
                  <div className="font-semibold">{project.typography.name}</div>
                  <div className="text-sm text-gray-600">
                    {project.typography.sampleText}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Pesos disponibles:</span>
                    {project.typography.weights.join(", ")}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">
                  Información del Proyecto
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-gray-600">Título:</span>
                    {project.title}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Slogan:</span>
                    {project.slogan}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
