export type WateringStatus = "overdue" | "due-soon" | "ok" | "never-watered";


export interface PlantScheduleInfo {
    status: WateringStatus;
    daysSinceWatered: number | null;
    daysUntilDue: number | null;
}

/** Returns midnight (start of day) in local time for a given date */
const startOfDay = (d: Date): Date =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const getWateringStatus = (lastWateredAt: Date | null, wateringIntervalDays: number): PlantScheduleInfo => {
    if (!lastWateredAt) {
        return { status: "never-watered", daysSinceWatered: null, daysUntilDue: null };
    }

    // Compare calendar dates (resets at midnight), not raw elapsed ms
    const todayStart   = startOfDay(new Date()).getTime();
    const wateredStart = startOfDay(new Date(lastWateredAt)).getTime();
    const msPerDay     = 1000 * 60 * 60 * 24;

    const daysSinceWatered = Math.round((todayStart - wateredStart) / msPerDay);
    const daysUntilDue     = wateringIntervalDays - daysSinceWatered;

    let status: WateringStatus;
    if (daysUntilDue < 0)       status = "overdue";
    else if (daysUntilDue <= 1) status = "due-soon";
    else                        status = "ok";

    return { status, daysSinceWatered, daysUntilDue };
}