import axios from "axios";

interface ColorPalette {
  cian: string;
  magenta: string;
  amarillo: string;
  negro: string;
}

interface BrandingTemplate {
  id: string;
  title: string;
  description: string;
  brandName: string;
  slogan: string;
  colorPalette: ColorPalette;
  typography: string;
  mockupImages: string[];
}

export const fetchBrandingTemplates = async (): Promise<BrandingTemplate[]> => {
  try {
    const response = await axios.post<{ autos: BrandingTemplate[] }>(
      "http://34.238.122.213:1337/api/open-ai/42"
    );
    return response.data?.autos;
  } catch (error) {
    console.error("Error fetching branding templates:", error);
    return [];
  }
};
