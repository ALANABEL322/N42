import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DefaultFontPreloader } from "@/components/FontPreloader";
import { useBrandPreviewStore } from "../../store/brandPreviewStore";
import { useProjectsStore } from "../../store/projectsStore";
import { useProjectDetailsStore } from "../../store/projectDetailsStore";
import { useBrandIdentityStore } from "../../store/brandIdentityStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchBrandingTemplates } from "@/lib/template";
import { Image } from "lucide-react";
import { Loader2 } from "lucide-react";

interface Typography {
  name: string;
  fontFamily?: string;
  googleFontLink: string;
  weights: string[];
  sampleText: string;
}

interface BrandingTemplate {
  id: string;
  title: string;
  description: string;
  brandName: string;
  slogan: string;
  colorPalette: {
    cian: string;
    magenta: string;
    amarillo: string;
    negro: string;
  };
  typography: Typography;
  mockupImages: string[];
}

export default function BrandIdentityPreview() {
  const { previewData, setPreviewData, template, setTemplate } =
    useBrandPreviewStore();
  const { brandIdentity } = useBrandIdentityStore();
  const addProject = useProjectsStore((state) => state.addProject);
  const setProjectDetails = useProjectDetailsStore(
    (state) => state.setProjectDetails
  );
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] =
    useState<BrandingTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      setIsLoading(true);
      try {
        const templates = await fetchBrandingTemplates();
        setTemplate(templates);
      } catch (error) {
        console.error("Error loading templates:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTemplates();
  }, [setTemplate]);

  const handleTemplateSelect = (template: BrandingTemplate) => {
    const link = document.createElement("link");
    link.href = template.typography.googleFontLink;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    setSelectedTemplate(template);
    setPreviewData({
      ...previewData,
      selectedTemplate: template.id,
      brandName: brandIdentity.brandName || template.brandName,
      slogan: brandIdentity.slogan || template.slogan,
      colorPalette: template.colorPalette,
      typography: {
        name: template.typography.name,
        fontFamily: template.typography.fontFamily || "",
        googleFontLink: template.typography.googleFontLink,
        weights: template.typography.weights,
        sampleText:
          template.typography.sampleText ||
          "Ejemplo de texto para mostrar la tipografía",
      },
      mockupImages: template.mockupImages,
      selectedImage: template.mockupImages[0],
    });
  };

  const handleSaveProject = () => {
    if (
      !previewData.selectedTemplate ||
      !previewData.selectedImage ||
      !selectedTemplate
    ) {
      return;
    }

    const project = {
      id: Date.now().toString(),
      title:
        brandIdentity.brandName ||
        previewData.brandName ||
        selectedTemplate.title,
      description: brandIdentity.mission || selectedTemplate.description,
      brandName: brandIdentity.brandName || previewData.brandName,
      slogan: brandIdentity.slogan || previewData.slogan,
      colorPalette: previewData.colorPalette,
      typography: previewData.typography,
      mockupImage: previewData.selectedImage,
    };

    console.log("Saving project with brandName:", project.brandName);
    console.log("Using brandIdentity data:", brandIdentity);

    addProject(project);
    setProjectDetails(project);
    navigate("/dashboard/projects");
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <DefaultFontPreloader />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:ml-[17rem] 2xl:ml-[30rem]"
      >
        <motion.div className="mb-12">
          <h2 className="text-4xl font-bold mb-6 text-center mt-24">
            Select a template
          </h2>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
              <p className="mt-4 text-lg text-gray-600">Loading templates...</p>
            </div>
          ) : template.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <p className="text-lg text-gray-600">No templates available</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4"
                variant="outline"
              >
                Retry
              </Button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row lg:flex-wrap gap-6">
              <div className="flex flex-col md:flex-row gap-6 w-full lg:w-auto">
                {template.map((template: BrandingTemplate) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-1/2 lg:w-full"
                  >
                    <Card
                      className={`cursor-pointer transition-all outline-none ${
                        previewData.selectedTemplate === template.id
                          ? "ring-primary"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div
                            className="w-full aspect-video bg-gradient-to-br mb-4 rounded-lg"
                            style={{
                              background: `linear-gradient(135deg, ${template.colorPalette.cian} 0%, ${template.colorPalette.magenta} 50%, ${template.colorPalette.amarillo} 100%)`,
                            }}
                          />
                          <h3 className="text-xl font-semibold mb-2">
                            {template.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {template.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {selectedTemplate && (
          <motion.div className="mb-12">
            <h2 className="text-2xl font-medium mb-4">
              Select an image for your project
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedTemplate.mockupImages.map(
                (image: string, index: number) => (
                  <div
                    key={index}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                      previewData.selectedImage === image
                        ? "border-orange-500"
                        : "border-transparent"
                    }`}
                    onClick={() =>
                      setPreviewData({ ...previewData, selectedImage: image })
                    }
                  >
                    <img
                      src={image}
                      alt={`Mockup ${index + 1}`}
                      className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                    />
                  </div>
                )
              )}
            </div>
            <Button
              onClick={handleSaveProject}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md shadow-lg mt-4"
              disabled={!selectedTemplate || !previewData.selectedImage}
            >
              Save Project
            </Button>
          </motion.div>
        )}

        <motion.div>
          <Card className="bg-[#FFF5F5] border-0 shadow-sm mb-6">
            <CardContent className="flex flex-col items-center justify-center p-16">
              <div
                className="text-2xl font-bold text-gray-500 mb-2"
                style={{
                  fontFamily: previewData.typography?.name,
                }}
              >
                {selectedTemplate?.title || "Select a template"}
              </div>
              <div
                className="text-muted-foreground text-center max-w-md"
                style={{
                  fontFamily: previewData.typography?.name,
                }}
              >
                {selectedTemplate?.description ||
                  "Choose a template to see its description"}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="mb-6">
          <h2
            className="text-2xl font-medium mb-3 mt-20"
            style={{
              fontFamily: previewData.typography?.name,
            }}
          >
            Color palette used
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(
              previewData.colorPalette || selectedTemplate?.colorPalette || {}
            ).map(([name, color]) => (
              <div key={name} className="flex flex-col">
                <div
                  className="h-16 rounded-lg mb-1"
                  style={{ backgroundColor: color as string }}
                  aria-label={`Color ${name}`}
                />
                <span
                  className="text-sm text-center text-gray-600 capitalize"
                  style={{
                    fontFamily: previewData.typography?.name,
                  }}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mb-6">
          <h2
            className="text-2xl font-medium mb-3 mt-20"
            style={{
              fontFamily: previewData.typography?.name,
            }}
          >
            Typography used
          </h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{
                    fontFamily: previewData.typography?.name,
                  }}
                >
                  {previewData.typography?.name}
                </h3>
                <div className="flex items-start gap-6">
                  <div
                    className="text-6xl font-bold"
                    style={{
                      fontFamily: previewData.typography?.name,
                    }}
                  >
                    Aa
                  </div>
                  <div
                    className="text-sm pt-2"
                    style={{
                      fontFamily: previewData.typography?.name,
                    }}
                  >
                    <div>Aa Bb Cc Ee Ff Gg Hh</div>
                    <div>Ii Jj Kk Ll Mm Nn Oo</div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{
                    fontFamily: previewData.typography?.name,
                  }}
                >
                  Example text
                </h3>
                <p
                  className="text-lg leading-relaxed"
                  style={{
                    fontFamily: previewData.typography?.name,
                  }}
                >
                  {previewData.typography?.sampleText}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3
                className="text-lg font-semibold mb-3"
                style={{
                  fontFamily: previewData.typography?.name,
                }}
              >
                Available weights
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {previewData.typography?.weights?.map((weight) => (
                  <div
                    key={weight}
                    className="p-3 border rounded-lg"
                    style={{
                      fontFamily: previewData.typography?.name,
                      fontWeight: parseInt(weight),
                    }}
                  >
                    <p className="text-sm text-gray-600 mb-1">
                      Weight {weight}
                    </p>
                    <p style={{ fontWeight: parseInt(weight) }}>
                      The quick brown fox
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div>
          <h2
            className="text-2xl font-medium mb-3 mt-20"
            style={{
              fontFamily: previewData.typography?.name,
            }}
          >
            Mockups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[0, 1].map((index) => (
              <div
                key={`mockup-${index}`}
                className="aspect-[4/3] bg-[#FFF5F5] rounded-lg flex items-center justify-center"
              >
                {previewData.mockupImages?.[index] ? (
                  <img
                    src={previewData.mockupImages[index]}
                    alt={`Mockup ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Image className="w-12 h-12 text-[#A52A2A] opacity-50" />
                )}
              </div>
            ))}
          </div>
          <div className="aspect-[16/9] mb-10 bg-[#FFF5F5] rounded-lg flex items-center justify-center">
            {previewData.mockupImages?.[2] ? (
              <img
                src={previewData.mockupImages[2]}
                alt="Mockup 3"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Image className="w-16 h-16 text-[#A52A2A] opacity-50" />
            )}
          </div>
        </motion.div>
      </motion.div>
      <motion.div className="fixed bottom-8 right-8 z-50"></motion.div>
    </>
  );
}
