import { create } from "zustand";
import type { PlantIdentification } from "@/app/actions/identify-plant";

type PlantPhotoStore = {
  preview: string | null;
  matches: PlantIdentification[];
  selected: string | null;
  error: string | null;
  setPreview: (v: string | null) => void;
  setMatches: (v: PlantIdentification[]) => void;
  setSelected: (v: string | null) => void;
  setError: (v: string | null) => void;
  reset: () => void;
};

export const usePlantPhotoStore = create<PlantPhotoStore>()((set) => ({
  preview: null,
  matches: [],
  selected: null,
  error: null,
  setPreview: (v) => set({ preview: v }),
  setMatches: (v) => set({ matches: v }),
  setSelected: (v) => set({ selected: v }),
  setError: (v) => set({ error: v }),
  reset: () => set({ preview: null, matches: [], selected: null, error: null }),
}));
