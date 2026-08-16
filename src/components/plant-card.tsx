
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
            className={`flex items-center gap-4 rounded-2xl border-2 border-emerald-100 bg-white/80 backdrop-blur-sm px-5 py-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
        >
            <div className={`absolute left-0 top-0 bottom-0 w-2 ${style.card} opacity-80`}></div>
            <div className="shrink-0 h-16 w-16 flex items-center justify-center rounded-xl bg-emerald-50/50 overflow-hidden shadow-inner">
                {plant.imageUrl ? (
                    <img src={plant.imageUrl} alt={plant.name} className="h-full w-full object-cover" />
                ) : (
                    <span className="text-4xl">{plant.emoji}</span>
                )}
            </div>

            <div className="min-w-0 flex-1">
                <div className="truncate font-semibold text-emerald-950 text-lg">{plant.name}</div>
                {plant.species && (
                    <div className="truncate text-sm text-emerald-800/80 italic">{plant.species}</div>
                )}
                <div className="mt-1.5 flex items-center gap-2">
                    <span
                        className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${style.chip}`}
                    >
                        {statusLabels[info.status]}
                    </span>
                    {info.daysSinceWatered !== null && (
                        <span className="text-xs font-medium text-stone-500">{info.daysSinceWatered}d ago</span>
                    )}
                </div>
            </div>

            <form action={markWateredAction.bind(null, token, plant.id)}>
                <button
                    type="submit"
                    className="whitespace-nowrap rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-sky-600 flex items-center gap-1.5"
                >
                    <span className="text-lg">💧</span> Water
                </button>
            </form>

            <form action={removePlantAction.bind(null, token, plant.id)}>
                <button
                    type="submit"
                    className="p-2 rounded-full text-stone-400 hover:bg-red-50 transition hover:text-red-600 ml-1 cursor-pointer"
                    aria-label={`Remove ${plant.name}`}
                >
                    ✕
                </button>
            </form>
        </li>
    );
};

export default PlantCard;