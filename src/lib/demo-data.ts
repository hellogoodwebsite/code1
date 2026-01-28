import { computeReadinessScore } from "@/lib/scoring";
import { generatePlan } from "@/lib/plan";

export const demoMode = {
  enabled: true
};

export const demoPrograms = [
  {
    id: "prog-settlement",
    name: "Settlement Employment Program",
    description: "Supports newcomers with rapid job readiness support.",
    isActive: true
  },
  {
    id: "prog-youth",
    name: "Youth Employment Pathway",
    description: "Guides youth toward training and placements.",
    isActive: true
  }
];

export const demoClients = [
  {
    id: "client-1",
    firstName: "Amina",
    lastName: "Khan",
    email: "amina@example.com",
    phone: "416-555-0133",
    preferredLanguage: "English",
    immigrationStatus: "Permanent Resident",
    educationLevel: "college",
    englishLevel: 3,
    immediateIncomeNeed: true,
    workExperienceCountry: "Canada",
    workExperienceYears: 2,
    status: "active",
    assignedWorker: "Jordan Lee",
    programId: demoPrograms[0].id,
    lastInteractionDays: 12
  },
  {
    id: "client-2",
    firstName: "Mateo",
    lastName: "Silva",
    email: "mateo@example.com",
    phone: null,
    preferredLanguage: "Spanish",
    immigrationStatus: "Refugee",
    educationLevel: "highschool",
    englishLevel: 2,
    immediateIncomeNeed: true,
    workExperienceCountry: "Brazil",
    workExperienceYears: 1,
    status: "intake",
    assignedWorker: "Priya Shah",
    programId: demoPrograms[0].id,
    lastInteractionDays: 40
  },
  {
    id: "client-3",
    firstName: "Sophie",
    lastName: "Chen",
    email: "sophie@example.com",
    phone: "647-555-0184",
    preferredLanguage: "English",
    immigrationStatus: "Citizen",
    educationLevel: "university",
    englishLevel: 5,
    immediateIncomeNeed: false,
    workExperienceCountry: "Canada",
    workExperienceYears: 6,
    status: "placed",
    assignedWorker: "Jordan Lee",
    programId: demoPrograms[1].id,
    lastInteractionDays: 5
  }
];

export const demoAssessments = demoClients.map((client) => {
  const readiness = computeReadinessScore({
    englishLevel: client.englishLevel,
    workExperienceYears: client.workExperienceYears,
    workExperienceCountry: client.workExperienceCountry,
    educationLevel: client.educationLevel as
      | "none"
      | "highschool"
      | "college"
      | "university"
      | "other",
    hasEmail: Boolean(client.email),
    hasPhone: Boolean(client.phone),
    immediateIncomeNeed: client.immediateIncomeNeed
  });
  return {
    clientId: client.id,
    readiness,
    plan: generatePlan({
      readiness,
      immediateIncomeNeed: client.immediateIncomeNeed
    })
  };
});

export const demoPlacements = [
  {
    clientId: "client-3",
    employerName: "Harbour Health",
    jobTitle: "Medical Office Assistant",
    wageHourly: 22.5,
    employmentType: "full_time",
    startDate: "2024-06-10",
    retention30: true,
    retention90: false
  }
];
