import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useProjectsStore } from "@/store/projectsStore";
import { useProjectDetailsStore } from "@/store/projectDetailsStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ProjectDetailsView() {
  const { id } = useParams<{ id: string }>();
  const projects = useProjectsStore((state) => state.getProjects());
  const project = projects.find((p) => p.id === id);
  const { setProjectDetails, projectDetails, clearProjectDetails } =
    useProjectDetailsStore();
  const navigate = useNavigate();

  if (!project) {
    return (
      <div className="flex-1 min-h-screen bg-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Project Not Found</h1>
          <p className="text-gray-600">
            The project you are looking for does not exist or has been deleted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-white p-8 my-[7rem] max-w-5xl mx-auto lg:ml-[17rem] 2xl:ml-[30rem]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold">{project.title}</h1>
        <div className="flex justify-end items-center mb-8 space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/projects")}
          >
            Back to Projects
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/preview")}
          >
            View Suggested Options
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardContent>
              <h2 className="text-2xl font-semibold mb-6 p-4">
                General Information
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Brand Name</h3>
                  <p className="text-gray-600">{project.brandName}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Slogan</h3>
                  <p className="text-gray-600">{project.slogan}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Color Palette</h3>
                  <p className="text-gray-600">
                    {project.colorPalette?.amarillo}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Typography</h3>
                  <p className="text-gray-600">{project.typography?.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-2xl font-semibold mb-6 p-4">
                Design and Style
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Color Palette</h3>
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
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Typography</h3>
                  <div className="space-y-4">
                    <div className="font-semibold">
                      {project.typography.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {project.typography.sampleText}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Available Weights:</span>
                      {project.typography.weights.join(", ")}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Mockup</h3>
                  <div className="aspect-[16/9] bg-[#FFF5F5] rounded-lg overflow-hidden">
                    <img
                      src={project.mockupImage}
                      alt={project.brandName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
