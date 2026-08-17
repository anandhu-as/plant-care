
import { statusStyles } from "@/lib/watering-status-styles";
import type { Plant } from "@/lib/db/schema";
import { getWateringStatus } from "@/lib/freshness";
import { markWateredAction, removePlantAction } from "@/app/actions/plant";
import { SubmitButton } from "@/components/ui/submit-button";

type PlantWithLastWatered = Plant & { lastWateredAt: Date | null };

const PlantCard = ({ token, plant }: { token: string; plant: PlantWithLastWatered }) => {
    ////water status
    const info = getWateringStatus(plant.lastWateredAt, plant.wateringIntervalDays);
    const style = statusStyles[info.status];

    return (
        <li className="relative py-6 group border-b border-stone-200 last:border-0">

            <div className="flex items-center gap-4 mb-4">
                <div className="shrink-0 h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden shadow-inner bg-stone-100 flex items-center justify-center">
                    {plant.imageUrl ? (
                        <img src={plant.imageUrl} alt={plant.name} className="h-full w-full object-cover" />
                    ) : (
                        <span className="text-4xl">{plant.emoji}</span>
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="truncate font-bold text-stone-900 text-xl md:text-2xl tracking-tight">{plant.name}</div>
                    {plant.species && (
                        <div className="truncate text-stone-500 text-sm md:text-base mt-0.5">{plant.species}</div>
                    )}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                <div>
                    <div className="font-semibold text-stone-800 text-lg">
                        {info.daysUntilDue === null
                            ? "Not watered yet"
                            : info.daysUntilDue < 0
                                ? `Overdue by ${Math.abs(info.daysUntilDue)} days`
                                : info.daysUntilDue === 0
                                    ? "Water today"
                                    : `Water in ${info.daysUntilDue} days`}
                    </div>
                    <div className="text-sm text-stone-500 mt-0.5">
                        {info.daysSinceWatered === null
                            ? "Never watered"
                            : info.daysSinceWatered === 0
                                ? "Watered today"
                                : `Watered ${info.daysSinceWatered} days ago`}
                        {" "}• every ~{plant.wateringIntervalDays} days
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <form action={markWateredAction.bind(null, token, plant.id)} className="flex-1 sm:flex-none">
                        <SubmitButton
                            pendingText="..."
                            className="w-full justify-center rounded-full bg-[#1da1f2] hover:bg-[#1a91da] text-white px-5 py-2.5 font-semibold text-sm transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                        >

                            Mark watered 💧
                        </SubmitButton>
                    </form>
                    <form action={removePlantAction.bind(null, token, plant.id)}>
                        <SubmitButton
                            className="p-2 rounded-full text-stone-300 hover:bg-stone-100 transition hover:text-stone-500 cursor-pointer opacity-0 group-hover:opacity-100"
                            aria-label={`Remove ${plant.name}`}
                        >
                            ❌
                        </SubmitButton>
                    </form>
                </div>
            </div>
        </li>
    );
};

export default PlantCard;