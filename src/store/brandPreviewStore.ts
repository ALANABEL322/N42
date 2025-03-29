import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BrandPreviewState {
  previewData: {
    brandName: string;
    slogan: string;
    colorPalette: {
      cian: string;
      magenta: string;
      amarillo: string;
      negro: string;
    };
    typography: {
      name: string;
      fontFamily: string;
      googleFontLink: string;
      weights: string[];
      sampleText: string;
    };
    mockupImages: string[];
    selectedTemplate: string | null;
    selectedImage: string | null;
  };
  setPreviewData: (data: Partial<BrandPreviewState['previewData']>) => void;
  resetPreviewData: () => void;
}

const initialState = {
  brandName: '',
  slogan: '',
  colorPalette: {
    cian: '#E0F7FA',
    magenta: '#FCE4EC',
    amarillo: '#FFFDE7',
    negro: '#0D0D0D'
  },
  typography: {
    name: 'Roboto',
    fontFamily: "'Roboto', sans-serif",
    googleFontLink: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
    weights: ['400', '500', '700'],
    sampleText: 'Roboto es una fuente sans-serif moderna y versátil.'
  },
  mockupImages: [],
  selectedTemplate: null,
  selectedImage: null
};

export const useBrandPreviewStore = create<BrandPreviewState>()(
  persist(
    (set) => ({
      previewData: initialState,
      setPreviewData: (data) => set((state) => ({
        previewData: {
          ...state.previewData,
          ...data,
          colorPalette: {
            ...state.previewData.colorPalette,
            ...(data.colorPalette || {})
          },
          typography: {
            ...state.previewData.typography,
            ...(data.typography || {})
          }
        }
      })),
      resetPreviewData: () => set({ previewData: initialState })
    }),
    {
      name: 'brand-preview-storage',
    }
  )
);
