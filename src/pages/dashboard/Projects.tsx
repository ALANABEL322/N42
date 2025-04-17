import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useProjectsStore } from "@/store/projectsStore";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Projects() {
  const projects = useProjectsStore((state) => state.getProjects());
  const removeProject = useProjectsStore((state) => state.removeProject);
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  useEffect(() => {
    document.title = "My Projects - Branding Platform";
  }, []);

  const handleDeleteProject = (projectId: string) => {
    setOpenDeleteDialog(true);
    setProjectToDelete(projectId);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      removeProject(projectToDelete);
      setOpenDeleteDialog(false);
      setProjectToDelete(null);
    }
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
    setProjectToDelete(null);
  };

  return (
    <div className="flex-1 min-h-screen bg-white p-4 mt-20 mb-20 container mx-auto sm:p-6 lg:flex lg:items-center lg:justify-center">
      <div className="w-full">
        <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Project</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this project? This action cannot
                be undone. All associated files and data will be permanently
                removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelDelete}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="max-w-7xl mx-auto w-full container lg:max-w-[90%]">
          <h1 className="text-5xl font-bold my-6 text-center mb-20">
            My Projects
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 xl:max-w-[50rem] max-w-[50rem] mx-auto">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-[#F6EEEE]  p-6 rounded-lg shadow"
              >
                <img
                  src={project.mockupImage}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold mb-4">{project.title}</h2>
                <p className="text-gray-600 mb-6">{project.description}</p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 ">Color Palette</h3>
                  <div className="grid grid-cols-4 gap-3 ">
                    {Object.entries(project.colorPalette).map(
                      ([colorName, colorValue]) => (
                        <div
                          key={colorName}
                          className="flex flex-col items-center"
                        >
                          <div
                            className="h-12 w-12 rounded-full mb-1 "
                            style={{ backgroundColor: colorValue }}
                            aria-label={`Color ${colorName}`}
                          />
                          <span className="text-sm text-center text-gray-600 capitalize">
                            {colorName}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
                    onClick={() =>
                      navigate(`/dashboard/projects/${project.id}`)
                    }
                  >
                    View Details
                  </Button>
                  <Button
                    className="text-white px-4 py-2 rounded-md bg-red-500 hover:bg-red-600"
                    onClick={() => handleDeleteProject(project.id)}
                    title="Delete project"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
