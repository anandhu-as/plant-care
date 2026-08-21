"use server";

import { getHouseHoldByToken } from "@/lib/queries/household"
import { addPlant, removePlant, updatePlant } from "@/lib/queries/plant";
import { logWatering } from "@/lib/queries/watering";
import { revalidatePath } from "next/cache";

export const requireHouseHold = async (token: string) => {
    const household = await getHouseHoldByToken(token);
    if (!household) throw new Error("This household could not be found. Please check your link or create a new one.");
    return household;
}

export const addPlantAction = async (token: string, formData: FormData) => {
    const household = await requireHouseHold(token);
    //adding plant to household
    const name = (formData.get("name") as string)?.trim();
    if (!name) throw new Error("Plant name is required");
    const species = (formData.get("species") as string)?.trim() || undefined;
    const emoji = (formData.get("emoji") as string)?.trim() || undefined;
    const imageUrl = (formData.get("imageUrl") as string)?.trim() || undefined;
    const intervalRaw = formData.get("wateringIntervalDays") as string;
    const parsedInterval = intervalRaw ? parseInt(intervalRaw, 10) : undefined;
    const wateringIntervalDays = parsedInterval && !isNaN(parsedInterval) ? parsedInterval : undefined;
    const careGuide = (formData.get("careGuide") as string)?.trim() || undefined;

    const plant = await addPlant(household.id, { name, species, emoji, imageUrl, wateringIntervalDays, careGuide });
    revalidatePath(`/h/${token}`)
    return plant;
}

export const updatePlantAction = async (token: string, plantId: string, formData: FormData) => {
    await requireHouseHold(token);
    const name = (formData.get("name") as string)?.trim();
    if (!name) throw new Error("Plant name is required");
    const species = (formData.get("species") as string)?.trim() || undefined;
    const emoji = (formData.get("emoji") as string)?.trim() || undefined;
    const imageUrl = (formData.get("imageUrl") as string)?.trim() || undefined;
    const intervalRaw = formData.get("wateringIntervalDays") as string;
    const parsedInterval = intervalRaw ? parseInt(intervalRaw, 10) : undefined;
    const wateringIntervalDays = parsedInterval && !isNaN(parsedInterval) ? parsedInterval : undefined;
    const careGuide = (formData.get("careGuide") as string)?.trim() || undefined;

    await updatePlant(plantId, { name, species, emoji, imageUrl, wateringIntervalDays, careGuide });
    revalidatePath(`/h/${token}`);
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