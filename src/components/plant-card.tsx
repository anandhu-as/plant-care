
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
            className={`rounded-2xl border-2 border-emerald-100 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col`}
        >
            <div className={`absolute left-0 top-0 bottom-0 w-2 ${style.card} opacity-80`}></div>
            
            {/* Top row: Avatar, Info, Actions */}
            <div className="flex items-center gap-4 px-5 pt-4 pb-2">
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

                <div className="flex items-center">
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
                </div>
            </div>

            {/* Bottom row: Care Guide */}
            <div className="px-5 pb-4 mt-2 pl-[5.5rem]">
                <h4 className="text-[11px] font-bold tracking-widest text-emerald-800/50 mb-2.5 uppercase">Care Guide</h4>
                <div className="space-y-2.5 text-[13px] leading-relaxed text-emerald-900/80">
                    <div className="flex gap-2.5 items-start">
                        <span className="text-sky-500 text-base leading-none mt-0.5">💧</span>
                        <span>Water every ~{plant.wateringIntervalDays} days when the top of the soil feels dry. Very forgiving.</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                        <span className="text-amber-500 text-base leading-none mt-0.5">☀️</span>
                        <span>Tolerates low to bright indirect light. Ensure good drainage.</span>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default PlantCard;