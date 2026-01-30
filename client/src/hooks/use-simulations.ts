import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertSimulation, type Simulation } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useSimulations() {
  return useQuery({
    queryKey: [api.simulations.list.path],
    queryFn: async () => {
      const res = await fetch(api.simulations.list.path);
      if (!res.ok) throw new Error("Failed to fetch simulations");
      return api.simulations.list.responses[200].parse(await res.json());
    },
  });
}

export function useSimulation(id: number) {
  return useQuery({
    queryKey: [api.simulations.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.simulations.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch simulation");
      return api.simulations.get.responses[200].parse(await res.json());
    },
    enabled: !!id && !isNaN(id),
  });
}

export function useCreateSimulation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertSimulation) => {
      const res = await fetch(api.simulations.create.path, {
        method: api.simulations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to generate career paths");
      }

      return api.simulations.create.responses[201].parse(await res.json());
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.simulations.list.path] });
      toast({
        title: "Simulation Complete",
        description: "Your career paths have been generated successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error.message || "Something went wrong. Please try again.",
      });
    },
  });
}
