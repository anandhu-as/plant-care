import { db } from "../db"
import { wateringLogs } from "../db/schema"

export const logWatering = async (plantId: string, note?: string) => {
    const [log] = await db
        .insert(wateringLogs)
        .values({ 
            plantId, 
            note: note || null 
        })
        .returning()
    return log
}