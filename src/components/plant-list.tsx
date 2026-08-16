import PlantCard from "@/components/plant-card";
import type { Plant } from "@/lib/db/schema";

type PlantWithLastWatered = Plant & { lastWateredAt: Date | null };
//displaying plants
const PlantList = ({ token, plants }: { token: string; plants: PlantWithLastWatered[] }) => {
    if (plants.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-stone-300 py-12 text-center text-stone-500">
                <div className="mb-2 text-3xl">🌱</div>
                No plants yet — add your first one below.
            </div>
        );
    }
    return (
        <ul className="space-y-3">
            {plants.map((plant) => (
                <PlantCard key={plant.id} token={token} plant={plant} />
            ))}
        </ul>
    );
};

export default PlantList;