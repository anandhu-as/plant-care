"use server"
import { getHouseHoldByToken } from "@/lib/queries/household"
import { addPlant, removePlant } from "@/lib/queries/plant";
import { logWatering } from "@/lib/queries/watering";
import { revalidatePath } from "next/cache";
export const requireHouseHold = async (token: string) => {
    const household = await getHouseHoldByToken(token);
    if (!household) throw new Error("Household doesn't existss create one first ");
    return household;
}
export const addPlantAction = async (token: string, formData: FormData) => {
    const household = await requireHouseHold(token);
    //adding plant to household
    const name = (formData.get("name") as string)?.trim();
    if (!name) throw new Error("Plant name is required");
    const species = (formData.get("species") as string)?.trim() || undefined;
    const emoji = (formData.get("emoji") as string)?.trim() || undefined;
    const intervalRaw = formData.get("wateringIntervalDays") as string;
    const wateringIntervalDays = intervalRaw ? parseInt(intervalRaw, 10) : undefined;
    await addPlant(household.id, { name, species, emoji, wateringIntervalDays, });
    revalidatePath(`/h/${token}`)
}



///mark water
export const markWateredAction = async (token: string, plantId: string) => {
    await requireHouseHold(token);
    await logWatering(plantId);
    revalidatePath(`/h/${token}`);
}
//deleting plant from db
export const removePlantAction = async (token: string, plantId: string) => {
    await requireHouseHold(token);
    await removePlant(plantId);
    revalidatePath(`/h/${token}`);
}