import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertSimulationSchema } from "@shared/schema";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

// Initialize OpenAI with Replit AI Integrations env vars
const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.simulations.create.path, async (req, res) => {
    try {
      const input = insertSimulationSchema.parse(req.body);

      // AI Generation Logic
      const prompt = `
        Act as a career counselor. Based on the following profile, generate 3 distinct career paths.
        
        Profile:
        - Skills: ${input.skills}
        - Interests: ${input.interests}
        - Availability: ${input.availability}
        - Background: ${input.background}
        - Goals: ${input.goals}

        Return a JSON object with a key "careerPaths" which is an array of 3 objects. 
        Each object must have:
        - title: string
        - matchScore: number (0-100)
        - timeline: string (e.g., "6 months")
        - difficulty: "Easy" | "Medium" | "Hard"
        - description: string (brief overview)
        - requiredSkills: string[]
        - missingSkills: string[]
        - actionPlan: string[] (30-day plan, simplified to key steps)
        
        Ensure the response is valid JSON.
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-5.1",
        messages: [
          { role: "system", content: "You are a helpful career counselor AI. Output valid JSON only." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      });

      const aiContent = completion.choices[0].message.content;
      if (!aiContent) {
        throw new Error("Failed to generate career paths");
      }

      const result = JSON.parse(aiContent);

      const simulation = await storage.createSimulation({
        ...input,
        result
      });

      res.status(201).json(simulation);
    } catch (err) {
      console.error("Simulation error:", err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", details: err.errors });
      }
      res.status(500).json({ message: "Failed to generate simulation" });
    }
  });

  app.get(api.simulations.get.path, async (req, res) => {
    const id = parseInt(req.params.id);
    const simulation = await storage.getSimulation(id);
    if (!simulation) {
      return res.status(404).json({ message: "Simulation not found" });
    }
    res.json(simulation);
  });

  app.get(api.simulations.list.path, async (req, res) => {
    const simulations = await storage.getSimulations();
    res.json(simulations);
  });

  return httpServer;
}
