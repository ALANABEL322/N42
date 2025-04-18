import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Typography {
  name: string;
  fontFamily?: string;
  googleFontLink: string;
  weights: string[];
  sampleText: string;
}

interface ColorPalette {
  cian: string;
  magenta: string;
  amarillo: string;
  negro: string;
}

interface Template {
  id: string;
  title: string;
  description: string;
  brandName: string;
  slogan: string;
  colorPalette: ColorPalette;
  typography: Typography;
  mockupImages: string[];
}

interface TemplateState {
  templates: Template[];
  selectedTemplate: Template | null;
  selectedImage: string | null;
  setTemplates: (templates: Template[]) => void;
  setSelectedTemplate: (template: Template | null) => void;
  setSelectedImage: (image: string | null) => void;
  reset: () => void;
}

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set) => ({
      templates: [],
      selectedTemplate: null,
      selectedImage: null,
      setTemplates: (templates) => set({ templates }),
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      setSelectedImage: (image) => set({ selectedImage: image }),
      reset: () => set({ selectedTemplate: null, selectedImage: null }),
    }),
    {
      name: "template-storage",
    }
  )
);
