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
    planLabel?: string;
    title: string;
    whyItFits?: string;
    matchScore: number;
    timeline: string;
    difficulty: "Easy" | "Medium" | "Hard";
    description?: string;
    requiredSkills: string[];
    missingSkills: string[];
    actionPlan: string[];
    extendedPlan?: Array<{ 
      week: string; 
      focus: string; 
      skills: string[]; 
      tasks: string[]; 
    }>;
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
      <Card className="h-full overflow-hidden border-border/60 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 bg-card/50 backdrop-blur-md group rounded-[var(--radius)]">
        {/* Header Section */}
        <div className="p-6 border-b border-border/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Briefcase className="w-24 h-24 text-primary -rotate-12 transform translate-x-4 -translate-y-4" />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-2">
                {path.planLabel && (
                  <Badge variant="outline" className="w-fit border-primary/30 text-primary font-bold bg-primary/5">
                    {path.planLabel}
                  </Badge>
                )}
                <Badge variant="secondary" className={`font-medium ${getDifficultyColor(path.difficulty)}`}>
                  {path.difficulty} Path
                </Badge>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-2xl font-bold font-display ${getScoreColor(path.matchScore)}`}>
                  {path.matchScore}%
                </span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Match</span>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-2 pr-8 leading-tight group-hover:text-primary transition-colors">{path.title}</h3>
            
            {path.whyItFits && (
              <p className="text-sm text-muted-foreground italic mb-3 line-clamp-2">"{path.whyItFits}"</p>
            )}
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
              <Clock className="w-4 h-4 text-primary/70" />
              <span className="font-medium">{path.timeline}</span>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1.5 font-medium text-muted-foreground">
                <span>Compatibility</span>
                <span>{path.matchScore}/100</span>
              </div>
              <Progress value={path.matchScore} className="h-1.5" />
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 pt-2">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="skills" className="border-border/40">
              <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-primary" />
                  <span>Skill Analysis</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">You Have</p>
                    <div className="flex flex-wrap gap-1.5">
                      {path.requiredSkills.map((skill, i) => (
                        <Badge key={i} variant="outline" className="bg-emerald-500/5 border-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] py-0 h-5">
                          <CheckCircle2 className="w-2.5 h-2.5 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">To Learn</p>
                    <div className="flex flex-wrap gap-1.5">
                      {path.missingSkills.map((skill, i) => (
                        <Badge key={i} variant="outline" className="bg-rose-500/5 border-rose-500/10 text-rose-700 dark:text-rose-400 text-[10px] py-0 h-5">
                          <XCircle className="w-2.5 h-2.5 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="plan" className="border-border/40">
              <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>First 30 Days</span>
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

            {path.extendedPlan && (
              <AccordionItem value="extended-plan" className="border-border/40 border-b-0">
                <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold text-primary">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Days 31–60 (Extended)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 pt-2">
                    {path.extendedPlan.map((week, i) => (
                      <div key={i} className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                        <h4 className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">{week.week}</h4>
                        <p className="text-sm font-semibold mb-2">{week.focus}</p>
                        
                        <div className="space-y-2">
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Weekly Skills</p>
                            <div className="flex flex-wrap gap-1">
                              {week.skills.map((s, si) => (
                                <Badge key={si} variant="secondary" className="text-[9px] h-4 py-0">
                                  {s}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Tasks</p>
                            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                              {week.tasks.map((t, ti) => (
                                <li key={ti}>{t}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </Card>
    </motion.div>
  );
}
