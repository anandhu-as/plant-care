import { create } from "zustand";
import { Plant } from "@/lib/db/schema";

type PlantWithLastWatered = Plant & { lastWateredAt: Date | null };

type EditPlantStore = {
  editingPlant: PlantWithLastWatered | null;
  openEdit: (plant: PlantWithLastWatered) => void;
  closeEdit: () => void;
};

export const useEditPlantStore = create<EditPlantStore>()((set) => ({
  editingPlant: null,
  openEdit: (plant) => set({ editingPlant: plant }),
  closeEdit: () => set({ editingPlant: null }),
}));
