import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, BrainCircuit } from "lucide-react";

import { insertSimulationSchema, type InsertSimulation } from "@shared/schema";
import { useCreateSimulation } from "@/hooks/use-simulations";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const steps = [
  { id: "profile", title: "Profile & Background" },
  { id: "preferences", title: "Skills & Interests" },
  { id: "logistics", title: "Goals & Availability" }
];

export default function Simulator() {
  const [step, setStep] = useState(0);
  const [, setLocation] = useLocation();
  const createSimulation = useCreateSimulation();
  
  const form = useForm<InsertSimulation>({
    resolver: zodResolver(insertSimulationSchema),
    defaultValues: {
      background: "",
      skills: "",
      interests: "",
      availability: "",
      goals: "",
    },
  });

  const onSubmit = async (data: InsertSimulation) => {
    try {
      const result = await createSimulation.mutateAsync(data);
      setLocation(`/result/${result.id}`);
    } catch (error) {
      console.error("Simulation failed", error);
    }
  };

  const nextStep = async () => {
    const fields = getFieldsForStep(step);
    const valid = await form.trigger(fields as any);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const getFieldsForStep = (stepIdx: number) => {
    switch (stepIdx) {
      case 0: return ["background"];
      case 1: return ["skills", "interests"];
      case 2: return ["availability", "goals"];
      default: return [];
    }
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Build Your Profile</h1>
          <p className="text-muted-foreground">Tell us about yourself so we can map your future.</p>
        </div>

        <Card className="glass-card overflow-hidden">
          <div className="h-2 bg-secondary/50 w-full">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-accent shadow-[0_0_10px_rgba(var(--primary),0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="background"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold">Current Background</FormLabel>
                            <FormDescription className="text-muted-foreground/80">
                              What is your current role, education, or professional experience?
                            </FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="e.g. I have a degree in Marketing but have been working as a barista for 2 years..." 
                                className="min-h-[160px] resize-none text-base bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold">Your Skills</FormLabel>
                            <FormDescription className="text-muted-foreground/80">List your technical and soft skills.</FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="e.g. Python, Excel, Public Speaking..." 
                                className="min-h-[100px] resize-none text-base bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="interests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold">Interests & Passions</FormLabel>
                            <FormDescription className="text-muted-foreground/80">What topics or activities excite you?</FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="e.g. Technology, Design, Helping people..." 
                                className="min-h-[100px] resize-none text-base bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="goals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold">Career Goals</FormLabel>
                            <FormDescription className="text-muted-foreground/80">Where do you see yourself in 5 years? (Optional)</FormDescription>
                            <FormControl>
                              <Input 
                                placeholder="e.g. Leading a team, Working remotely..." 
                                className="text-base py-6 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                                {...field} 
                                value={field.value ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold">Weekly Availability</FormLabel>
                            <FormDescription className="text-muted-foreground/80">How much time can you dedicate to learning per week?</FormDescription>
                            <FormControl>
                              <Input 
                                placeholder="e.g. 10 hours/week, Weekends only..." 
                                className="text-base py-6 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between pt-6 border-t border-border/40">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={prevStep}
                    disabled={step === 0}
                    className={step === 0 ? "invisible" : "hover:bg-primary/5"}
                  >
                    Back
                  </Button>

                  {step < steps.length - 1 ? (
                    <Button type="button" onClick={nextStep} className="btn-gradient px-8">
                      Next Step <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      disabled={createSimulation.isPending}
                      className="btn-gradient px-8"
                    >
                      {createSimulation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing Profile...
                        </>
                      ) : (
                        <>
                          <BrainCircuit className="mr-2 h-4 w-4" />
                          Generate Career Paths
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
}
