import { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useFormData } from "../../hooks/useFormData";
import IASelectorModal from "./IASelectorModal";

interface ColorPaletteSelectorProps {
  onSubmit?: (data: PaletteSelectionData) => void;
  onSkip?: () => void;
  onPrevious?: () => void;
  className?: string;
}

export interface PaletteSelectionData {
  selectedPalette: ColorOption;
  typography: string;
  graphicDescription: string;
}

export interface ColorOption {
  id: string;
  name: string;
  color: string;
}

export function ColorPaletteSelector({
  onSubmit,
  onSkip,
  onPrevious,
  className,
}: ColorPaletteSelectorProps) {
  const { formData, updateColorPalette } = useFormData();

  const [isIAModalOpen, setIsIAModalOpen] = useState(false);
  const [typography, setTypography] = useState(
    formData.colorPalette?.typography || ""
  );
  const [graphicDescription, setGraphicDescription] = useState(
    formData.colorPalette?.graphicDescription || ""
  );

  const colorOptions: ColorOption[] = [
    { id: "cyan", name: "Cyan", color: "#E0F7FA" },
    { id: "magenta", name: "Magenta", color: "#FCE4EC" },
    { id: "yellow", name: "Yellow", color: "#FFFDE7" },
    { id: "black", name: "Black", color: "#0D0D0D" },
  ];

  const colorBorders: Record<string, string> = {
    cyan: "#26C6DA",
    magenta: "#EC407A",
    yellow: "#FFD700",
    black: "#000000",
  };

  const [selectedColor, setSelectedColor] = useState<ColorOption>(() => {
    if (!formData.colorPalette?.selectedPalette) {
      return colorOptions[0];
    }

    if (typeof formData.colorPalette.selectedPalette === "string") {
      //@ts-ignore
      return (
        colorOptions.find(
          (opt) => opt.id === formData.colorPalette?.selectedPalette
        ) || colorOptions[0]
      );
    }

    return formData.colorPalette.selectedPalette;
  });

  useEffect(() => {
    if (formData.colorPalette?.selectedPalette) {
      if (typeof formData.colorPalette.selectedPalette === "string") {
        //@ts-ignore
        const foundColor = colorOptions.find(
          (opt) => opt.id === formData.colorPalette?.selectedPalette
        );
        if (foundColor) setSelectedColor(foundColor);
      } else {
        setSelectedColor(formData.colorPalette.selectedPalette);
      }
    }
  }, [formData.colorPalette]);

  const handleColorSelect = (colorId: string) => {
    const selected =
      colorOptions.find((opt) => opt.id === colorId) || colorOptions[0];
    setSelectedColor(selected);
    updateColorPalette({
      selectedPalette: selected,
      typography: formData.colorPalette?.typography || "",
      graphicDescription: formData.colorPalette?.graphicDescription || "",
    });
  };

  const handleIASelect = (color: string) => {
    setIsIAModalOpen(false);
    const aiPalette = {
      id: "ia",
      name: "IA",
      color: color,
    };
    setSelectedColor(aiPalette);
    updateColorPalette({
      selectedPalette: aiPalette,
      typography: formData.colorPalette?.typography || "",
      graphicDescription: formData.colorPalette?.graphicDescription || "",
    });
  };

  const handleTypographyChange = (value: string) => {
    if (value === "default") return;

    updateColorPalette({
      selectedPalette: selectedColor,
      typography: value,
      graphicDescription: formData.colorPalette?.graphicDescription || "",
    });
  };

  const resetFields = () => {
    updateColorPalette({
      selectedPalette: selectedColor,
      typography: "default",
      graphicDescription: "",
    });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setGraphicDescription(e.target.value);
    updateColorPalette({
      selectedPalette: selectedColor,
      typography: typography,
      graphicDescription: e.target.value,
    });
  };

  const handleSubmit = () => {
    const submissionData = {
      selectedPalette: selectedColor,
      typography: formData.colorPalette?.typography || "",
      graphicDescription: formData.colorPalette?.graphicDescription || "",
    };

    if (onSubmit) {
      onSubmit(submissionData);
    }

    updateColorPalette({
      selectedPalette: selectedColor,
      typography: "",
      graphicDescription: "",
    });

    const selectElement = document.querySelector(
      '[role="combobox"]'
    ) as HTMLElement;
    if (selectElement) {
      selectElement.click();
      const firstOption = document.querySelector(
        '[role="option"]'
      ) as HTMLElement;
      if (firstOption) {
        firstOption.click();
      }
    }

    const textareaElement = document.querySelector(
      "textarea"
    ) as HTMLTextAreaElement;
    if (textareaElement) {
      textareaElement.value = "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-3xl mx-auto ${className || ""}`}
    >
      <Card className="bg-white border-2  shadow-sm mt-28 mb-16">
        <CardContent className="p-6">
          <div className="space-y-16">
            <div>
              <h2 className="text-xl font-bold mb-5 mt-5">
                Which color palette would you like to use?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                These can be edited later
              </p>

              <div className="space-y-6 mt-11">
                <div className="flex items-center justify-between p-4 bg-[#FFF5F5] rounded-lg">
                  <div>
                    <h3 className="font-semibold my-2">
                      Artificial Intelligence
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Create a unique palette using AI
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsIAModalOpen(true)}
                    className="bg-orange-50 hover:bg-orange-100"
                  >
                    Use AI
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {colorOptions.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative mt-11"
                    >
                      <button
                        type="button"
                        onClick={() => handleColorSelect(option.id)}
                        className={`
                          w-full h-24 rounded-lg flex items-center justify-center
                          border transition-all duration-200
                          ${
                            selectedColor.id === option.id
                              ? "border-solid"
                              : "border-transparent"
                          }
                          focus:outline-none focus:ring-1 focus:ring-offset-1
                        `}
                        style={{
                          backgroundColor: option.color,
                          borderColor:
                            selectedColor.id === option.id
                              ? colorBorders[option.id]
                              : "transparent",
                          borderWidth:
                            selectedColor.id === option.id ? "2px" : "0",
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
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Typography</h3>
              <Select
                value={formData.colorPalette?.typography || "default"}
                onValueChange={handleTypographyChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a typography" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default" disabled>
                    Select a typography
                  </SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="montserrat">Montserrat</SelectItem>
                  <SelectItem value="poppins">Poppins</SelectItem>
                  <SelectItem value="inter">Inter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Graphic Description
              </h3>
              <Textarea
                value={formData.colorPalette?.graphicDescription || ""}
                onChange={handleDescriptionChange}
                placeholder="Describe the graphic elements you want to include..."
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onPrevious}>
                Back
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={
                  !formData.colorPalette?.selectedPalette ||
                  !formData.colorPalette?.typography ||
                  formData.colorPalette?.typography === "default"
                }
              >
                Continue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <IASelectorModal
        isOpen={isIAModalOpen}
        onClose={() => setIsIAModalOpen(false)}
        onSelect={handleIASelect}
      />
    </motion.div>
  );
}
