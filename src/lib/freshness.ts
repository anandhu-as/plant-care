export type WateringStatus = "overdue" | "due-soon" | "ok" | "never-watered";


export interface PlantScheduleInfo {
    status: WateringStatus;
    daysSinceWatered: number | null;
    daysUntilDue: number | null;
}
export const getWateringStatus = (lastWateredAt: Date | null, wateringIntervalDays: number): PlantScheduleInfo => {
    if (!lastWateredAt) {
        return { status: "never-watered", daysSinceWatered: null, daysUntilDue: null };
    }
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysSinceWatered = Math.floor(
        (Date.now() - lastWateredAt.getTime()) / msPerDay
    );
    const daysUntilDue = wateringIntervalDays - daysSinceWatered;
    let status: WateringStatus;
    if (daysUntilDue < 0) status = "overdue";
    else if (daysUntilDue <= 1) status = "due-soon";
    else status = "ok";

    return { status, daysSinceWatered, daysUntilDue };
}