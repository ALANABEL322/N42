import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BrandIdentityState {
  brandIdentity: {
    brandName: string;
    slogan: string;
    mission: string;
    vision: string;
    values: string;
    objective: string;
    identityType: string;
    targetAudience: string;
    sector: string;
    colorPalette: {
      selectedPalette: {
        id: string;
        name: string;
        color: string;
      };
      typography: string;
      graphicDescription: string;
    };
  };
  setBrandIdentity: (data: Partial<BrandIdentityState['brandIdentity']>) => void;
  resetBrandIdentity: () => void;
}

export const useBrandIdentityStore = create<BrandIdentityState>()(
  persist(
    (set) => ({
      brandIdentity: {
        brandName: '',
        slogan: '',
        mission: '',
        vision: '',
        values: '',
        objective: '',
        identityType: '',
        targetAudience: '',
        sector: '',
        colorPalette: {
          selectedPalette: {
            id: '',
            name: '',
            color: ''
          },
          typography: '',
          graphicDescription: ''
        }
      },
      setBrandIdentity: (data) => set((state) => ({
        brandIdentity: { ...state.brandIdentity, ...data }
      })),
      resetBrandIdentity: () => set({
        brandIdentity: {
          brandName: '',
          slogan: '',
          mission: '',
          vision: '',
          values: '',
          objective: '',
          identityType: '',
          targetAudience: '',
          sector: '',
          colorPalette: {
            selectedPalette: {
              id: '',
              name: '',
              color: ''
            },
            typography: '',
            graphicDescription: ''
          }
        }
      })
    }),
    {
      name: 'brand-identity-storage',
    }
  )
);
