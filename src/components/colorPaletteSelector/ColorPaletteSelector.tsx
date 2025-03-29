import { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useFormData } from "../../hooks/useFormData";

interface ColorPaletteSelectorProps {
  onSubmit?: (data: PaletteSelectionData) => void;
  onSkip?: () => void;
  className?: string;
}

export interface PaletteSelectionData {
  selectedPalette: ColorOption;
  typography: string;
  graphicDescription: string;
}

interface ColorOption {
  id: string;
  name: string;
  color: string;
}

export function ColorPaletteSelector({ onSubmit, onSkip, className }: ColorPaletteSelectorProps) {
  const { formData, updateColorPalette } = useFormData();

  const colorOptions: ColorOption[] = [
    { id: "ia", name: "IA", color: "#E77927" },
    { id: "cian", name: "Cian", color: "#E0F7FA" },
    { id: "magenta", name: "Magenta", color: "#FCE4EC" },
    { id: "amarillo", name: "Amarillo", color: "#FFFDE7" },
    { id: "negro", name: "Negro", color: "#0D0D0D" },
  ];

  const colorBorders: Record<string, string> = {
    ia: "#E65100",
    cian: "#26C6DA",
    magenta: "#EC407A",
    amarillo: "#FFD700",
    negro: "#000000",
  };

  const [selectedColor, setSelectedColor] = useState<ColorOption>(() => {
    if (!formData.colorPalette?.selectedPalette) {
      return colorOptions[0];
    }
    
    if (typeof formData.colorPalette.selectedPalette === 'string') {
      //@ts-ignore
      return colorOptions.find(opt => opt.id === formData.colorPalette?.selectedPalette) || colorOptions[0];
    }
    
    return formData.colorPalette.selectedPalette;
  });

  useEffect(() => {
    if (formData.colorPalette?.selectedPalette) {
      if (typeof formData.colorPalette.selectedPalette === 'string') {
        //@ts-ignore
        const foundColor = colorOptions.find(opt => opt.id === formData.colorPalette?.selectedPalette);
        if (foundColor) setSelectedColor(foundColor);
      } else {
        setSelectedColor(formData.colorPalette.selectedPalette);
      }
    }
  }, [formData.colorPalette]);

  const handleColorSelect = (colorId: string) => {
    const selected = colorOptions.find(opt => opt.id === colorId) || colorOptions[0];
    setSelectedColor(selected);
    updateColorPalette({
      selectedPalette: selected,
      typography: formData.colorPalette?.typography || "",
      graphicDescription: formData.colorPalette?.graphicDescription || ""
    });
  };

  const handleTypographyChange = (value: string) => {
    updateColorPalette({
      selectedPalette: selectedColor,
      typography: value,
      graphicDescription: formData.colorPalette?.graphicDescription || ""
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateColorPalette({
      selectedPalette: selectedColor,
      typography: formData.colorPalette?.typography || "",
      graphicDescription: e.target.value
    });
  };

  const handleSubmit = () => {
    const submissionData = {
      selectedPalette: selectedColor,
      typography: formData.colorPalette?.typography || "",
      graphicDescription: formData.colorPalette?.graphicDescription || ""
    };
    
    if (onSubmit) {
      onSubmit(submissionData);
    }
    
    updateColorPalette(submissionData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-3xl mx-auto ${className || ""}`}
    >
      <Card className="bg-[#FFF5F5] border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="space-y-16">
            <div>
              <h2 className="text-xl font-bold mb-5">¿Qué paleta de colores le gustaría utilizar?</h2>
              <p className="text-sm text-muted-foreground mb-4">Estos mismos los puede editar después</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {colorOptions.map((option) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    <button
                      type="button"
                      onClick={() => handleColorSelect(option.id)}
                      className={`
                        w-full h-24 rounded-lg flex items-center justify-center
                        border transition-all duration-200
                        ${selectedColor.id === option.id ? "border-solid" : "border-transparent"}
                        focus:outline-none focus:ring-1 focus:ring-offset-1
                      `}
                      style={{
                        backgroundColor: option.color,
                        borderColor: selectedColor.id === option.id ? colorBorders[option.id] : 'transparent',
                        borderWidth: selectedColor.id === option.id ? '2px' : '0'
                      }}
                      aria-label={`Select ${option.name} color palette`}
                    >
                      {selectedColor.id === option.id && (
                        <Check className="w-6 h-6 text-white" />
                      )}
                    </button>
                    <p className="text-center mt-2 text-sm">{option.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Tipografía</h3>
              <Select
                value={formData.colorPalette?.typography}
                onValueChange={handleTypographyChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una tipografía" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="montserrat">Montserrat</SelectItem>
                  <SelectItem value="poppins">Poppins</SelectItem>
                  <SelectItem value="inter">Inter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Descripción Gráfica</h3>
              <Textarea
                value={formData.colorPalette?.graphicDescription || ""}
                onChange={handleDescriptionChange}
                placeholder="Describe los elementos gráficos que deseas incluir..."
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onSkip}
              >
                Omitir
              </Button>
              <Button 
                type="button" 
                onClick={handleSubmit}
                disabled={!formData.colorPalette?.selectedPalette || !formData.colorPalette?.typography}
              >
                Continuar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}