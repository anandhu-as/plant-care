
import { statusStyles, statusLabels } from "@/lib/watering-status-styles";
import type { Plant } from "@/lib/db/schema";
import { getWateringStatus } from "@/lib/freshness";
import { markWateredAction, removePlantAction } from "@/app/actions/plant";
type PlantWithLastWatered = Plant & { lastWateredAt: Date | null };

const PlantCard = ({ token, plant }: { token: string; plant: PlantWithLastWatered }) => {
    //water status
    const info = getWateringStatus(plant.lastWateredAt, plant.wateringIntervalDays);
    const style = statusStyles[info.status];

    return (
        <li
            className={`flex items-center gap-4 rounded-xl border border-stone-200 border-l-4 bg-white px-4 py-4 shadow-sm ${style.card}`}
        >
            <div className="shrink-0 text-3xl">{plant.emoji}</div>

            <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-stone-900">{plant.name}</div>
                <div className="mt-1 flex items-center gap-2">
                    <span
                        className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${style.chip}`}
                    >
                        {statusLabels[info.status]}
                    </span>
                    {info.daysSinceWatered !== null && (
                        <span className="text-xs text-stone-500">{info.daysSinceWatered}d ago</span>
                    )}
                </div>
            </div>

            <form action={markWateredAction.bind(null, token, plant.id)}>
                <button
                    type="submit"
                    className="whitespace-nowrap rounded-lg bg-orange-800 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-orange-900"
                >
                    💧 Water
                </button>
            </form>

            <form action={removePlantAction.bind(null, token, plant.id)}>
                <button
                    type="submit"
                    className="px-1 text-sm text-stone-400 transition hover:text-red-600"
                    aria-label={`Remove ${plant.name}`}
                >
                    ✕
                </button>
            </form>
        </li>
    );
};

export default PlantCard;