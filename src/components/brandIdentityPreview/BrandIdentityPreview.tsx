import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Image } from "lucide-react";
import { motion } from "framer-motion";
import { DefaultFontPreloader } from "@/components/FontPreloader";

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
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaCUyMGRldmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaCUyMGRhc2hib2FyZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaCUyMG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
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
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlZ2FudCUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGx1eHVyeSUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb24lMjBzaG93fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
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
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaCUyMGRldmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaCUyMGRhc2hib2FyZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaCUyMG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
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
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);
  const [previewData, setPreviewData] = useState<ProjectTemplate>(DEFAULT_TEMPLATE);

  const loadFonts = () => {
    const fontsToLoad = [
      ...Object.values(TYPOGRAPHY_SAMPLES).map(font => font.googleFontLink),
      DEFAULT_TEMPLATE.typography.googleFontLink
    ];

    fontsToLoad.forEach(fontUrl => {
      const link = document.createElement('link');
      link.href = fontUrl;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    });
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const handleTemplateSelect = (template: ProjectTemplate) => {
    setSelectedTemplate(template);
    setPreviewData(template);
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
                    className={`cursor-pointer transition-all ${selectedTemplate?.id === template.id ? 'ring-primary' : 'hover:shadow-md'}`}
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
                className={`cursor-pointer transition-all${selectedTemplate?.id === PROJECT_TEMPLATES[2].id ? 'ring-primary' : 'hover:shadow-md'}`}
                onClick={() => handleTemplateSelect(PROJECT_TEMPLATES[2])}
              >
                <CardContent className="p-6 ">
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

        <motion.div variants={item}>
          <Card className="bg-[#FFF5F5] border-0 shadow-sm mb-6">
            <CardContent className="flex flex-col items-center justify-center p-16">
              <div 
                className="text-2xl font-bold text-gray-500 mb-2"
                style={{ fontFamily: previewData.typography.fontFamily }}
              >
                {previewData.brandName || "Nombre de la marca"}
              </div>
              <div 
                className="text-muted-foreground text-center max-w-md"
                style={{ fontFamily: previewData.typography.fontFamily }}
              >
                {previewData.slogan || "Lorem ipsum dolor sit amet consectetur adipiscing elit..."}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="mb-6">
          <h2 
            className="text-2xl font-medium mb-3 mt-20"
            style={{ fontFamily: previewData.typography.fontFamily }}
          >
            Paleta de colores utilizadas
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(previewData.colorPalette).map(([name, color]) => (
              <div key={name} className="flex flex-col">
                <div
                  className="h-16 rounded-lg mb-1"
                  style={{ backgroundColor: color }}
                  aria-label={`Color ${name}`}
                />
                <span 
                  className="text-sm text-center text-gray-600 capitalize"
                  style={{ fontFamily: previewData.typography.fontFamily }}
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
            style={{ fontFamily: previewData.typography.fontFamily }}
          >
            Tipografía utilizada
          </h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ fontFamily: previewData.typography.fontFamily }}
                >
                  {previewData.typography.name}
                </h3>
                <div className="flex items-start gap-6">
                  <div 
                    className="text-6xl font-bold" 
                    style={{ fontFamily: previewData.typography.fontFamily }}
                  >
                    Aa
                  </div>
                  <div 
                    className="text-sm pt-2" 
                    style={{ fontFamily: previewData.typography.fontFamily }}
                  >
                    <div>Aa Bb Cc Ee Ff Gg Hh</div>
                    <div>Ii Jj Kk Ll Mm Nn Oo</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ fontFamily: previewData.typography.fontFamily }}
                >
                  Ejemplo de texto
                </h3>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ fontFamily: previewData.typography.fontFamily }}
                >
                  {previewData.typography.sampleText}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ fontFamily: previewData.typography.fontFamily }}
              >
              Pesos disponibles
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {previewData.typography.weights.map((weight) => (
                <div 
                  key={weight} 
                  className="p-3 border rounded-lg"
                  style={{ 
                    fontFamily: previewData.typography.fontFamily,
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
            style={{ fontFamily: previewData.typography.fontFamily }}
          >
            Mockups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[0, 1].map((index) => (
              <div
                key={`mockup-${index}`}
                className="aspect-[4/3] bg-[#FFF5F5] rounded-lg flex items-center justify-center"
              >
                {previewData.mockupImages[index] ? (
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
            {previewData.mockupImages[2] ? (
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
    </>
  );
}