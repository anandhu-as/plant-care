import { create } from "zustand";

type AddPlantStore = {
  isOpen: boolean;
  isSuccess: boolean;
  name: string;
  species: string;
  imageUrl: string;
  open: () => void;
  close: () => void;
  reset: () => void;
  setName: (v: string) => void;
  setSpecies: (v: string) => void;
  setImageUrl: (v: string) => void;
  setIsSuccess: (v: boolean) => void;
};

const initialFields = {
  name: "",
  species: "",
  imageUrl: "",
  isSuccess: false,
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
  setIsSuccess: (v) => set({ isSuccess: v }),
}));
