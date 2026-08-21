"use client";

import PlantCard from "@/components/plants/plant-card";
import EditPlantForm from "@/components/plants/edit-plant-form";
import type { Plant } from "@/lib/db/schema";
import { useUiStore } from "@/store/ui-store";
import { useEditPlantStore } from "@/store/edit-plant-store";

type PlantWithLastWatered = Plant & { lastWateredAt: Date | null };

const PlantList = ({ token, plants, plantIdEnabled }: { token: string; plants: PlantWithLastWatered[]; plantIdEnabled?: boolean }) => {
  const zenMode = useUiStore((s) => s.zenMode);
  const { editingPlant } = useEditPlantStore();

  if (plants.length === 0) {
    return (
      <div className={`rounded-2xl border-2 border-dashed py-16 text-center shadow-inner relative overflow-hidden transition-colors duration-500 ${zenMode ? "border-stone-700 bg-stone-800/20 text-stone-400" : "border-emerald-200 bg-emerald-50/30 text-emerald-700"}`}>
        <div className="absolute top-2 left-2 opacity-20 text-6xl transform rotate-45">✿</div>
        <div className="absolute bottom-2 right-2 opacity-20 text-6xl transform -rotate-12">❀</div>
        <div className="mb-3 text-5xl">🪴</div>
        <p className="font-medium text-lg">No plants yet!</p>
        <p className={`mt-1 transition-colors duration-500 ${zenMode ? "text-stone-500" : "text-emerald-600"}`}>Add your first flowery friend below.</p>
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-4">
        {plants.map((plant, index) => (
          <PlantCard key={plant.id} token={token} plant={plant} index={index} />
        ))}
      </ul>
      {editingPlant && (
        <EditPlantForm token={token} plantIdEnabled={plantIdEnabled ?? false} />
      )}
    </>
  );
};

export default PlantList;