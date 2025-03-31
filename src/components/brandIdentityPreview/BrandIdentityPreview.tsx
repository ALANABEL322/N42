import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Image } from "lucide-react";
import { motion } from "framer-motion";
import { DefaultFontPreloader } from "@/components/FontPreloader";
import { useBrandPreviewStore } from "../../store/brandPreviewStore";
import { useProjectsStore } from "../../store/projectsStore";
import { useProjectDetailsStore } from "../../store/projectDetailsStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ColorPalette {
  cian: string;
  magenta: string;
  amarillo: string;
  negro: string;
}

interface TypographySample {
  name: string;
  fontFamily: string;
  googleFontLink: string;
  weights: string[];
  sampleText: string;
}

interface ProjectTemplate {
  id: string;
  title: string;
  description: string;
  brandName: string;
  slogan: string;
  colorPalette: ColorPalette;
  typography: TypographySample;
  mockupImages: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  brandName: string;
  slogan: string;
  colorPalette: ColorPalette;
  typography: TypographySample;
  mockupImage: string;
}

const TYPOGRAPHY_SAMPLES = {
  Roboto: {
    name: "Roboto",
    fontFamily: "'Roboto', sans-serif",
    googleFontLink: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
    weights: ["300", "400", "500", "700"],
    sampleText: "Innovación tecnológica con claridad y precisión"
  },
  Montserrat: {
    name: "Montserrat",
    fontFamily: "'Montserrat', sans-serif",
    googleFontLink: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap",
    weights: ["300", "400", "600", "700"],
    sampleText: "Elegancia y sofisticación en cada detalle"
  },
  Poppins: {
    name: "Poppins",
    fontFamily: "'Poppins', sans-serif",
    googleFontLink: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap",
    weights: ["300", "400", "500", "600"],
    sampleText: "Frescura natural con un toque moderno"
  }
};

const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: "minimal",
    title: "Minimalista",
    description: "Diseño limpio y elegante con un enfoque en la simplicidad",
    brandName: "Pure Design",
    slogan: "Menos es más",
    colorPalette: {
      cian: "#4285F4",
      magenta: "#DB4437",
      amarillo: "#F4B400",
      negro: "#333333"
    },
    typography: TYPOGRAPHY_SAMPLES.Roboto,
    mockupImages: [
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    ]
  },
  {
    id: "wild",
    title: "Selvático",
    description: "Diseño inspirado en la naturaleza con colores vibrantes y orgánicos",
    brandName: "Wild Nature",
    slogan: "La belleza en estado salvaje",
    colorPalette: {
      cian: "#008000",
      magenta: "#FF4500",
      amarillo: "#FFD700",
      negro: "#191919"
    },
    typography: TYPOGRAPHY_SAMPLES.Montserrat,
    mockupImages: [
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368",
      "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5",
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f",
    ]
  },
  {
    id: "cosmic",
    title: "Cósmico",
    description: "Diseño futurista con una paleta de colores inspirada en el universo",
    brandName: "Cosmic Design",
    slogan: "Inspirado por las estrellas",
    colorPalette: {
      cian: "#1E3C72",
      magenta: "#9D50BB",
      amarillo: "#F6D04D",
      negro: "#000000"
    },
    typography: TYPOGRAPHY_SAMPLES.Poppins,
    mockupImages: [
      "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3",
      "https://images.unsplash.com/photo-1517976487492-5750f3195933",
      "https://eskipaper.com/images/cosmic-nebula-1.jpg​"
    ]
  }
];

const DEFAULT_TEMPLATE: ProjectTemplate = {
  id: "",
  title: "",
  description: "",
  brandName: "",
  slogan: "",
  colorPalette: {
    cian: "#F5F5F5",
    magenta: "#F5F5F5",
    amarillo: "#F5F5F5",
    negro: "#F5F5F5"
  },
  typography: {
    name: "Inter",
    fontFamily: "'Inter', sans-serif",
    googleFontLink: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap",
    weights: ["300", "400", "500", "600"],
    sampleText: "Texto de ejemplo para mostrar la tipografía"
  },
  mockupImages: []
};

export default function BrandIdentityPreview() {
  const { previewData, setPreviewData } = useBrandPreviewStore();
  const addProject = useProjectsStore((state) => state.addProject);
  const setProjectDetails = useProjectDetailsStore((state) => state.setProjectDetails);
  const navigate = useNavigate();
  const selectedTemplate = PROJECT_TEMPLATES.find(t => t.id === previewData.selectedTemplate);

  useEffect(() => {
    if (previewData.typography?.googleFontLink) {
      const link = document.createElement('link');
      link.href = previewData.typography.googleFontLink;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [previewData.typography?.googleFontLink]);

  const handleTemplateSelect = (template: ProjectTemplate) => {
    setPreviewData({
      ...previewData,
      selectedTemplate: template.id,
      brandName: template.brandName,
      slogan: template.slogan,
      colorPalette: template.colorPalette,
      typography: template.typography,
      mockupImages: template.mockupImages,
      selectedImage: template.mockupImages[0]
    });
  };

  const handleSaveProject = () => {
    if (!selectedTemplate || !previewData.brandName || !previewData.selectedImage) {
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      title: previewData.brandName,
      description: selectedTemplate.description,
      brandName: previewData.brandName,
      slogan: previewData.slogan || selectedTemplate.slogan,
      colorPalette: previewData.colorPalette || selectedTemplate.colorPalette,
      typography: previewData.typography || selectedTemplate.typography,
      mockupImage: previewData.selectedImage
    };

    addProject(project);
    setProjectDetails(project);
    navigate('/dashboard/projects');
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

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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
        <motion.div variants={item} className="mb-12">
          <h2 className="text-4xl font-bold mb-6 text-center mt-24">Selecciona una plantilla</h2>
          
          <div className="flex flex-col lg:flex-row lg:flex-wrap gap-6">
            <div className="flex flex-col md:flex-row gap-6 w-full lg:w-auto lg:flex-1">
              {PROJECT_TEMPLATES.slice(0, 2).map((template) => (
                <motion.div 
                  key={template.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-1/2 lg:w-full"
                >
                  <Card
                    className={`cursor-pointer transition-all outline-none ${selectedTemplate?.id === template.id ? 'ring-primary' : 'hover:shadow-md'}`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-full aspect-video bg-gradient-to-br mb-4 rounded-lg"
                          style={{
                            background: `linear-gradient(135deg, ${template.colorPalette.cian} 0%, ${template.colorPalette.magenta} 50%, ${template.colorPalette.amarillo} 100%)`
                          }}
                        />
                        <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: template.typography.fontFamily }}>
                          {template.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3" style={{ fontFamily: template.typography.fontFamily }}>
                          {template.description}
                        </p>
                        
                        <div className="w-full mt-3 p-3 bg-gray-50 rounded-lg">
                          <p 
                            className="text-sm font-medium mb-1 text-gray-600"
                            style={{ fontFamily: template.typography.fontFamily }}
                          >
                            {template.typography.name}
                          </p>
                          <p 
                            className="text-sm"
                            style={{ fontFamily: template.typography.fontFamily }}
                          >
                            {template.typography.sampleText}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full lg:w-[calc(40%-4.5rem)] xl:w-[calc(40%-4.5rem)]"
            >
              <Card
                className={`cursor-pointer transition-all outline-none ${selectedTemplate?.id === PROJECT_TEMPLATES[2].id ? 'ring-primary' : 'hover:shadow-md'}`}
                onClick={() => handleTemplateSelect(PROJECT_TEMPLATES[2])}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-full h-[15rem] lg:h-auto aspect-video bg-gradient-to-br mb-4 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${PROJECT_TEMPLATES[2].colorPalette.cian} 0%, ${PROJECT_TEMPLATES[2].colorPalette.magenta} 50%, ${PROJECT_TEMPLATES[2].colorPalette.amarillo} 100%)`
                      }}
                    />
                    <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: PROJECT_TEMPLATES[2].typography.fontFamily }}>
                      {PROJECT_TEMPLATES[2].title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3" style={{ fontFamily: PROJECT_TEMPLATES[2].typography.fontFamily }}>
                      {PROJECT_TEMPLATES[2].description}
                    </p>
                    
                    <div className="w-full mt-3 p-3 bg-gray-50 rounded-lg">
                      <p 
                        className="text-sm font-medium mb-1 text-gray-600"
                        style={{ fontFamily: PROJECT_TEMPLATES[2].typography.fontFamily }}
                      >
                        {PROJECT_TEMPLATES[2].typography.name}
                      </p>
                      <p 
                        className="text-sm"
                        style={{ fontFamily: PROJECT_TEMPLATES[2].typography.fontFamily }}
                      >
                        {PROJECT_TEMPLATES[2].typography.sampleText}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {selectedTemplate && (
          <motion.div variants={item} className="mb-12">
            <h2 className="text-2xl font-medium mb-4">Selecciona una imagen para tu proyecto</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedTemplate.mockupImages.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                    previewData.selectedImage === image ? 'border-orange-500' : 'border-transparent'
                  }`}
                  onClick={() => setPreviewData({ ...previewData, selectedImage: image })}
                >
                  <img
                    src={image}
                    alt={`Mockup ${index + 1}`}
                    className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
            <Button
              onClick={handleSaveProject}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md shadow-lg mt-4"
              disabled={!selectedTemplate || !previewData.brandName || !previewData.selectedImage}
            >
              Guardar Proyecto
            </Button>
          </motion.div>
        )}

        <motion.div variants={item}>
          <Card className="bg-[#FFF5F5] border-0 shadow-sm mb-6">
            <CardContent className="flex flex-col items-center justify-center p-16">
              <div 
                className="text-2xl font-bold text-gray-500 mb-2"
                style={{ fontFamily: previewData.typography?.fontFamily || selectedTemplate?.typography.fontFamily }}
              >
                {previewData.brandName || selectedTemplate?.brandName}
              </div>
              <div 
                className="text-muted-foreground text-center max-w-md"
                style={{ fontFamily: previewData.typography?.fontFamily || selectedTemplate?.typography.fontFamily }}
              >
                {previewData.slogan || selectedTemplate?.slogan}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="mb-6">
          <h2 
            className="text-2xl font-medium mb-3 mt-20"
            style={{ fontFamily: previewData.typography?.fontFamily || selectedTemplate?.typography.fontFamily }}
          >
            Paleta de colores utilizadas
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(previewData.colorPalette || selectedTemplate?.colorPalette).map(([name, color]) => (
              <div key={name} className="flex flex-col">
                <div
                  className="h-16 rounded-lg mb-1"
                  style={{ backgroundColor: color }}
                  aria-label={`Color ${name}`}
                />
                <span 
                  className="text-sm text-center text-gray-600 capitalize"
                  style={{ fontFamily: previewData.typography?.fontFamily || selectedTemplate?.typography.fontFamily }}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-6">
          <h2 
            className="text-2xl font-medium mb-3 mt-20"
            style={{ fontFamily: previewData.typography?.fontFamily || selectedTemplate?.typography.fontFamily }}
          >
            Tipografía utilizada
          </h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ fontFamily: previewData.typography?.fontFamily || selectedTemplate?.typography.fontFamily }}
                >
                  {previewData.typography?.name || selectedTemplate?.typography.name}
                </h3>
                <div className="flex items-start gap-6">
                  <div 
                    className="text-6xl font-bold" 
                    style={{ fontFamily: previewData.typography?.fontFamily || selectedTemplate?.typography.fontFamily }}
                  >
                    Aa
                  </div>
                  <div 
                    className="text-sm pt-2" 
                    style={{ fontFamily: previewData.typography?.fontFamily || selectedTemplate?.typography.fontFamily }}
                  >
                    <div>Aa Bb Cc Ee Ff Gg Hh</div>
                    <div>Ii Jj Kk Ll Mm Nn Oo</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ fontFamily: previewData.typography?.fontFamily || selectedTemplate?.typography.fontFamily }}
                >
                  Ejemplo de texto
                </h3>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ fontFamily: previewData.typography?.fontFamily || selectedTemplate?.typography.fontFamily }}
                >
                  {previewData.typography?.sampleText || selectedTemplate?.typography.sampleText}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ fontFamily: previewData.typography?.fontFamily || selectedTemplate?.typography.fontFamily }}
              >
              Pesos disponibles
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(previewData.typography?.weights || selectedTemplate?.typography.weights).map((weight) => (
                <div 
                  key={weight} 
                  className="p-3 border rounded-lg"
                  style={{ 
                    fontFamily: previewData.typography?.fontFamily || selectedTemplate?.typography.fontFamily,
                    fontWeight: parseInt(weight)
                  }}
                >
                  <p className="text-sm text-gray-600 mb-1">Peso {weight}</p>
                  <p style={{ fontWeight: parseInt(weight) }}>El veloz murciélago hindú</p>
                </div>
              ))}
            </div>
          </div>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <h2 
            className="text-2xl font-medium mb-3 mt-20"
            style={{ fontFamily: previewData.typography?.fontFamily || selectedTemplate?.typography.fontFamily }}
          >
            Mockups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[0, 1].map((index) => (
              <div
                key={`mockup-${index}`}
                className="aspect-[4/3] bg-[#FFF5F5] rounded-lg flex items-center justify-center"
              >
                {(previewData.mockupImages || selectedTemplate?.mockupImages)[index] ? (
                  <img
                    src={(previewData.mockupImages || selectedTemplate?.mockupImages)[index]}
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
            {(previewData.mockupImages || selectedTemplate?.mockupImages)[2] ? (
              <img
                src={(previewData.mockupImages || selectedTemplate?.mockupImages)[2]}
                alt="Mockup 3"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Image className="w-16 h-16 text-[#A52A2A] opacity-50" />
            )}
          </div>
        </motion.div>
      </motion.div>
      <motion.div variants={item} className="fixed bottom-8 right-8 z-50">
      </motion.div>
    </>
  );
}