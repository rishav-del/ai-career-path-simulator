import { useRoute, Link } from "wouter";
import { ArrowLeft, Loader2, Share2, Printer } from "lucide-react";
import { useSimulation } from "@/hooks/use-simulations";
import { CareerPathCard } from "@/components/CareerPathCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Result() {
  const [match, params] = useRoute("/result/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: simulation, isLoading, error } = useSimulation(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h2 className="text-2xl font-bold font-display mb-2">Analyzing Possibilities...</h2>
        <p className="text-muted-foreground max-w-md">
          Our AI is currently mapping your skills against thousands of career trajectories. 
          This usually takes just a few seconds.
        </p>
      </div>
    );
  }

  if (error || !simulation) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold font-display mb-4 text-destructive">Simulation Not Found</h2>
        <p className="text-muted-foreground mb-8">
          We couldn't find the results you were looking for. They may have expired or never existed.
        </p>
        <Link href="/simulator">
          <Button>Start New Simulation</Button>
        </Link>
      </div>
    );
  }

  const resultData = simulation.result as {
    careerPaths: Array<{
      planLabel: string;
      title: string;
      whyItFits: string;
      matchScore: number;
      timeline: string;
      difficulty: "Easy" | "Medium" | "Hard";
      description: string;
      requiredSkills: string[];
      missingSkills: string[];
      actionPlan: string[];
    }>
  };

  return (
    <div className="min-h-screen bg-secondary/30 pb-20">
      <header className="bg-background border-b border-border/60 sticky top-0 z-10 backdrop-blur-md bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="font-display font-bold text-xl hidden sm:block">Analysis Results</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h2 className="text-3xl font-display font-bold text-foreground mb-3">Your Personalized Career Map</h2>
          <p className="text-muted-foreground max-w-3xl text-lg">
            Based on your background in <span className="font-medium text-foreground">{simulation.background.slice(0, 30)}...</span> 
            and interest in <span className="font-medium text-foreground">{simulation.interests.slice(0, 30)}...</span>, 
            we've identified these three potential paths.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resultData?.careerPaths?.map((path, index) => (
            <CareerPathCard key={index} path={path} index={index} />
          )) || (
            // Fallback if data structure is unexpected
            <div className="col-span-3 text-center py-20 glass-card">
              <p className="text-muted-foreground">No paths generated. Please try again.</p>
            </div>
          )}
        </div>

        <div className="mt-16 glass-card p-8 text-center">
          <h3 className="text-xl font-bold mb-3">Not satisfied with these results?</h3>
          <p className="text-muted-foreground mb-6">
            You can tweak your profile inputs to get different recommendations. 
            Adding more specific details usually leads to better matches.
          </p>
          <Link href="/simulator">
            <Button size="lg" variant="secondary" className="hover-elevate">Run New Simulation</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
