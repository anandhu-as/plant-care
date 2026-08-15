import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
no auth 
 */
export const households = pgTable("households", {
  id: uuid("id").primaryKey().defaultRandom(),
  token: varchar("token", { length: 32 }).notNull().unique(),
  name: text("name").notNull().default("My Plants"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const plants = pgTable("plants", {
  id: uuid("id").primaryKey().defaultRandom(),
  householdId: uuid("household_id")
    .notNull()
    .references(() => households.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  species: text("species"),
  emoji: varchar("emoji", { length: 8 }).notNull().default("🪴"),
  avatarImageKey: text("avatar_image_key"),
  wateringIntervalDays: integer("watering_interval_days")
    .notNull()
    .default(7),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const wateringLogs = pgTable("watering_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  plantId: uuid("plant_id")
    .notNull()
    .references(() => plants.id, { onDelete: "cascade" }),
  wateredAt: timestamp("watered_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  note: text("note"),
});

export const householdsRelations = relations(households, ({ many }) => ({
  plants: many(plants),
}));

export const plantsRelations = relations(plants, ({ one, many }) => ({
  household: one(households, {
    fields: [plants.householdId],
    references: [households.id],
  }),
  wateringLogs: many(wateringLogs),
}));

export const wateringLogsRelations = relations(wateringLogs, ({ one }) => ({
  plant: one(plants, {
    fields: [wateringLogs.plantId],
    references: [plants.id],
  }),
}));

export type Household = typeof households.$inferSelect;
export type Plant = typeof plants.$inferSelect;
export type WateringLog = typeof wateringLogs.$inferSelect;