import { pgTable, text, serial, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const simulations = pgTable("simulations", {
  id: serial("id").primaryKey(),
  skills: text("skills").notNull(),
  interests: text("interests").notNull(),
  availability: text("availability").notNull(),
  background: text("background").notNull(),
  goals: text("goals").default("Not specified"),
  result: jsonb("result"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSimulationSchema = createInsertSchema(simulations).omit({ 
  id: true, 
  createdAt: true, 
  result: true 
});

export type InsertSimulation = z.infer<typeof insertSimulationSchema>;
export type Simulation = typeof simulations.$inferSelect;

export const generatePathSchema = insertSimulationSchema;
export type GeneratePathRequest = z.infer<typeof generatePathSchema>;
