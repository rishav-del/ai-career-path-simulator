import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border/60 shadow-lg">
        <CardContent className="pt-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-destructive/10 p-4 rounded-full">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2 font-display">
            Page Not Found
          </h1>
          
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            The career path you're looking for doesn't seem to exist. 
            Don't worry, there are plenty of other paths to explore.
          </p>

          <Link href="/">
            <Button className="w-full" size="lg">
              Return to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
