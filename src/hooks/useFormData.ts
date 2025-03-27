import { useState, useEffect } from 'react';

export interface FormData {
  projectFormData: {
    brandName: string;
    slogan: string;
    mission: string;
    vision: string;
    values: string;
    objective: string;
    identityType: string;
    targetAudience: string;
    sector: string;
    colorPalette?: {
      selectedPalette: ColorOption;
      typography: string;
      graphicDescription: string;
    };
  };
}

interface ColorOption {
  id: string;
  name: string;
  color: string;
}

export function useFormData() {
  const colorOptions: ColorOption[] = [
    { id: "ia", name: "IA", color: "#E77927" },
    { id: "cian", name: "Cian", color: "#E0F7FA" },
    { id: "magenta", name: "Magenta", color: "#FCE4EC" },
    { id: "amarillo", name: "Amarillo", color: "#FFFDE7" },
    { id: "negro", name: "Negro", color: "#0D0D0D" },
  ];

  const [formData, setFormData] = useState<FormData['projectFormData']>(() => {
    const savedData = localStorage.getItem('projectFormData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.colorPalette) {
        if (typeof parsed.colorPalette.selectedPalette === 'string') {
          parsed.colorPalette.selectedPalette = colorOptions.find(
            opt => opt.id === parsed.colorPalette.selectedPalette
          ) || colorOptions[0];
        }
      }
      return parsed;
    }
    return {
      brandName: "",
      slogan: "",
      mission: "",
      vision: "",
      values: "",
      objective: "",
      identityType: "logotipo",
      targetAudience: "",
      sector: "",
      colorPalette: {
        selectedPalette: colorOptions[0],
        typography: "",
        graphicDescription: ""
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('projectFormData', JSON.stringify(formData));
  }, [formData]);

  return {
    formData,
    setFormData,
    updateField: (field: keyof FormData['projectFormData'], value: any) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    },
    updateColorPalette: (paletteData: FormData['projectFormData']['colorPalette']) => {
      setFormData(prev => ({
        ...prev,
        colorPalette: paletteData
      }));
    }
  };
}