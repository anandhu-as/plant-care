import { create } from "zustand";
import { Plant } from "@/lib/db/schema";

type AddPlantStore = {
  isOpen: boolean;
  isSuccess: boolean;
  name: string;
  species: string;
  imageUrl: string;
  careGuide: string;
  createdPlant: Plant | null;
  open: () => void;
  close: () => void;
  reset: () => void;
  setName: (v: string) => void;
  setSpecies: (v: string) => void;
  setImageUrl: (v: string) => void;
  setCareGuide: (v: string) => void;
  setIsSuccess: (v: boolean) => void;
  setCreatedPlant: (plant: Plant | null) => void;
};

const initialFields = {
  name: "",
  species: "",
  imageUrl: "",
  careGuide: "",
  isSuccess: false,
  createdPlant: null,
};

export const useAddPlantStore = create<AddPlantStore>()((set) => ({
  isOpen: false,
  ...initialFields,
  open: () => set({ isOpen: true }),
  close: () => {
    set({ isOpen: false });
    setTimeout(() => set(initialFields), 300);
  },
  reset: () => set(initialFields),
  setName: (v) => set({ name: v }),
  setSpecies: (v) => set({ species: v }),
  setImageUrl: (v) => set({ imageUrl: v }),
  setCareGuide: (v) => set({ careGuide: v }),
  setIsSuccess: (v) => set({ isSuccess: v }),
  setCreatedPlant: (plant) => set({ createdPlant: plant }),
}));
