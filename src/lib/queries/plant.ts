import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { plants, wateringLogs } from "../db/schema";

type AddPlantInput = {
    name: string;
    species?: string;
    emoji?: string;
    wateringIntervalDays?: number;
}
//creating plant in household
export const addPlant = async (householdId: string, input: AddPlantInput) => {
    const [plant] = await db.insert(plants).values({
        householdId,
        name: input.name,
        species: input.species || null,
        emoji: input.emoji || "🪴",
        wateringIntervalDays: input.wateringIntervalDays ?? 7,
    }).returning();
    return plant;
}
//removing plant from db
export const removePlant = async (plantId: string) => {
    await db
        .delete(plants)
        .where(eq(plants.id, plantId))
}

//select/retrieving  plants belonging to household  
export const getPlantsForHousehold = async (householdId: string) => {
    //getting all plants belonging to household
    const plantRow = await db
        .select()
        .from(plants)
        .where(eq(plants.householdId, householdId))
        .orderBy(plants.name);

    //recent watering of each plant
    const results = await Promise.all(plantRow.map(async (plant) => {
        const [lastwatering] = await db
            .select()
            .from(wateringLogs)
            .where(eq(wateringLogs.plantId, plant.id))
            .orderBy(desc(wateringLogs.wateredAt))
            .limit(1);
        return { ...plant, lastWateredAt: lastwatering?.wateredAt ?? null }
    }))
    //all plants with upadted info 
    return results
}