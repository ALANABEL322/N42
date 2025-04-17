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

    if (!response.data?.autos) {
      throw new Error("Invalid response format");
    }

    return response.data.autos;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "Server error:",
          error.response.status,
          error.response.data
        );
        throw new Error(`Server error: ${error.response.status}`);
      }
      if (error.request) {
        console.error("Network error:", error);
        throw new Error("Network error. Please check your connection.");
      }
    }
    console.error("Error fetching branding templates:", error);
    throw new Error("Failed to load templates. Please try again.");
  }
};
