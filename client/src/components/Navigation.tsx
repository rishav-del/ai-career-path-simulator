import { Link, useLocation } from "wouter";
import { BrainCircuit, History } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <BrainCircuit className="w-6 h-6 text-primary" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            Career<span className="text-primary">Sim</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/simulator">
            <Button 
              variant={location === "/simulator" ? "secondary" : "ghost"}
              className="hidden sm:flex"
            >
              New Simulation
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="icon" className="rounded-full">
              <History className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
