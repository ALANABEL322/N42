export interface ColorPalette {
  cian: string;
  magenta: string;
  amarillo: string;
  negro: string;
}

export interface TypographySample {
  name: string;
  fontFamily: string;
  googleFontLink: string;
  weights: string[];
  sampleText: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  brandName: string;
  slogan: string;
  colorPalette: ColorPalette;
  typography: TypographySample;
  mockupImage: string;
}
