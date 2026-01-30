import { motion } from "framer-motion";
import { 
  Briefcase, 
  Clock, 
  BarChart, 
  CheckCircle2, 
  XCircle, 
  Calendar 
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface CareerPathProps {
  path: {
    title: string;
    matchScore: number;
    timeline: string;
    difficulty: "Easy" | "Medium" | "Hard";
    description?: string;
    requiredSkills: string[];
    missingSkills: string[];
    actionPlan: string[];
  };
  index: number;
}

export function CareerPathCard({ path, index }: CareerPathProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy": return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400";
      case "medium": return "bg-amber-500/15 text-amber-700 dark:text-amber-400";
      case "hard": return "bg-rose-500/15 text-rose-700 dark:text-rose-400";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-primary";
    return "text-amber-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full overflow-hidden border-border/60 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 bg-card/50 backdrop-blur-sm group">
        {/* Header Section */}
        <div className="p-6 border-b border-border/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Briefcase className="w-24 h-24 text-primary -rotate-12 transform translate-x-4 -translate-y-4" />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <Badge variant="secondary" className={`font-medium ${getDifficultyColor(path.difficulty)}`}>
                {path.difficulty} Path
              </Badge>
              <div className="flex flex-col items-end">
                <span className={`text-2xl font-bold font-display ${getScoreColor(path.matchScore)}`}>
                  {path.matchScore}%
                </span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Match</span>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-2 pr-8 leading-tight">{path.title}</h3>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
              <Clock className="w-4 h-4" />
              <span>{path.timeline}</span>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1.5 font-medium text-muted-foreground">
                <span>Compatibility</span>
                <span>{path.matchScore}/100</span>
              </div>
              <Progress value={path.matchScore} className="h-2" />
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 pt-2">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="skills" className="border-border/40">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-2 font-medium">
                  <BarChart className="w-4 h-4 text-primary" />
                  <span>Skill Analysis</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">You Have</p>
                    <div className="flex flex-wrap gap-2">
                      {path.requiredSkills.map((skill, i) => (
                        <Badge key={i} variant="outline" className="bg-emerald-500/5 border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Missing / To Learn</p>
                    <div className="flex flex-wrap gap-2">
                      {path.missingSkills.map((skill, i) => (
                        <Badge key={i} variant="outline" className="bg-rose-500/5 border-rose-500/20 text-rose-700 dark:text-rose-400">
                          <XCircle className="w-3 h-3 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="plan" className="border-border/40 border-b-0">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-2 font-medium">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>30-Day Action Plan</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-2 border-l-2 border-primary/20 ml-2 space-y-4 py-2">
                  {path.actionPlan.map((step, i) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>
    </motion.div>
  );
}
