import type { ReadinessScore } from "@/lib/scoring";

export type PlanItem = {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: string;
};

export type PlanInput = {
  readiness: ReadinessScore;
  immediateIncomeNeed: boolean;
};

export function generatePlan(input: PlanInput): PlanItem[] {
  const items: PlanItem[] = [];

  if (input.readiness.subscoreLanguage < 15) {
    items.push({
      id: "language-support",
      title: "Enroll in language support / ESL classes",
      description: "Connect with local ESL programs to build confidence.",
      priority: "high",
      category: "language"
    });
  }

  if (input.readiness.subscoreExperience < 18) {
    items.push({
      id: "entry-roles",
      title: "Target entry roles while building Canadian experience",
      description: "Focus on roles that build local references quickly.",
      priority: "high",
      category: "experience"
    });
  }

  if (input.readiness.subscoreCredentials < 18) {
    items.push({
      id: "credential-recognition",
      title: "Assess credential recognition / bridging options",
      description: "Review credential recognition pathways or bridging programs.",
      priority: input.readiness.subscoreCredentials < 12 ? "high" : "medium",
      category: "credentials"
    });
  }

  if (input.readiness.subscoreJobSearch < 15) {
    items.push({
      id: "jobsearch-basics",
      title: "Create professional email + voicemail + basic job search routine",
      description: "Set up reliable contact info and a weekly routine.",
      priority: "high",
      category: "job-search"
    });
  }

  if (input.immediateIncomeNeed) {
    items.push({
      id: "immediate-income",
      title: "Immediate income pathway: temp agencies / warehouse roles",
      description: "Identify short-term income options while building skills.",
      priority: "high",
      category: "stability"
    });
  }

  items.push(
    {
      id: "resume-workshop",
      title: "Attend resume workshop",
      description: "Join the next resume workshop to refine core materials.",
      priority: "medium",
      category: "job-search"
    },
    {
      id: "star-stories",
      title: "Prepare STAR stories for interviews",
      description: "Practice concise stories to highlight experience.",
      priority: "medium",
      category: "interviews"
    },
    {
      id: "case-worker",
      title: "Book 1:1 appointment with case worker",
      description: "Schedule a check-in to review next steps.",
      priority: "high",
      category: "support"
    }
  );

  return items;
}
