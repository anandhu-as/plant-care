import { desc, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { plants, wateringLogs } from "../db/schema";

type AddPlantInput = {
    name: string;
    species?: string;
    emoji?: string;
    imageUrl?: string;
    wateringIntervalDays?: number;
}
//creating plant in household
export const addPlant = async (householdId: string, input: AddPlantInput) => {
    const [plant] = await db.insert(plants).values({
        householdId,
        name: input.name,
        species: input.species || null,
        emoji: input.emoji || "🪴",
        imageUrl: input.imageUrl || null,
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
    //getting all plants belonging to household and their last watered date
    const results = await db
        .select({
            plant: plants,
            lastWateredAt: sql<Date | null>`max(${wateringLogs.wateredAt})`,
        })
        .from(plants)
        .leftJoin(wateringLogs, eq(plants.id, wateringLogs.plantId))
        .where(eq(plants.householdId, householdId))
        .groupBy(plants.id)
        .orderBy(plants.name);

    //all plants with updated info 
    return results.map(row => ({
        ...row.plant,
        lastWateredAt: row.lastWateredAt ? new Date(row.lastWateredAt) : null,
    }));
}