import PlantCard from "@/components/plants/plant-card";
import type { Plant } from "@/lib/db/schema";

type PlantWithLastWatered = Plant & { lastWateredAt: Date | null };
//displaying plants
const PlantList = ({ token, plants }: { token: string; plants: PlantWithLastWatered[] }) => {
    if (plants.length === 0) {
        return (
            <div className="rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/30 py-16 text-center text-emerald-700 shadow-inner relative overflow-hidden">
                <div className="absolute top-2 left-2 text-emerald-200/40 opacity-20 text-6xl transform rotate-45">✿</div>
                <div className="absolute bottom-2 right-2 text-emerald-200/40 opacity-20 text-6xl transform -rotate-12">❀</div>
                <div className="mb-3 text-5xl">🪴</div>
                <p className="font-medium text-lg">No plants yet!</p>
                <p className="text-emerald-600 mt-1">Add your first flowery friend below.</p>
            </div>
        );
    }
    return (
        <ul className="space-y-4">
            {plants.map((plant) => (
                <PlantCard key={plant.id} token={token} plant={plant} />
            ))}
        </ul>
    );
};

export default PlantList;