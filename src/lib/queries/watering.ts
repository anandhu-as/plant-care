import { db } from "../db"
import { wateringLogs } from "../db/schema"

export const logWatering = async (plantId: string, note?: string) => {
    const [log] = await db
        .insert(wateringLogs)
        .values({ 
            id: crypto.randomUUID(), 
            plantId, 
            note: note || null 
        })
        .returning()
    return log
}