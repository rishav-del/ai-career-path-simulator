import { db } from "./db";
import {
  simulations,
  type InsertSimulation,
  type Simulation
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  createSimulation(simulation: InsertSimulation & { result: any }): Promise<Simulation>;
  getSimulation(id: number): Promise<Simulation | undefined>;
  getSimulations(): Promise<Simulation[]>;
}

export class DatabaseStorage implements IStorage {
  async createSimulation(insertSimulation: InsertSimulation & { result: any }): Promise<Simulation> {
    const [simulation] = await db
      .insert(simulations)
      .values(insertSimulation)
      .returning();
    return simulation;
  }

  async getSimulation(id: number): Promise<Simulation | undefined> {
    const [simulation] = await db
      .select()
      .from(simulations)
      .where(eq(simulations.id, id));
    return simulation;
  }

  async getSimulations(): Promise<Simulation[]> {
    return await db
      .select()
      .from(simulations)
      .orderBy(desc(simulations.createdAt));
  }
}

export const storage = new DatabaseStorage();
