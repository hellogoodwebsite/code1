import { describe, expect, it } from "vitest";
import { computeReadinessScore } from "@/lib/scoring";
import { generatePlan } from "@/lib/plan";

describe("readiness scoring", () => {
  it("calculates subscores and total", () => {
    const score = computeReadinessScore({
      englishLevel: 4,
      workExperienceYears: 4,
      workExperienceCountry: "Canada",
      educationLevel: "college",
      hasEmail: true,
      hasPhone: true,
      immediateIncomeNeed: false
    });

    expect(score.subscoreLanguage).toBe(20);
    expect(score.subscoreExperience).toBe(20);
    expect(score.subscoreCredentials).toBe(18);
    expect(score.subscoreJobSearch).toBe(20);
    expect(score.total).toBe(78);
  });
});

describe("plan generator", () => {
  it("adds high priority items based on subscores", () => {
    const readiness = computeReadinessScore({
      englishLevel: 2,
      workExperienceYears: 0,
      workExperienceCountry: "Other",
      educationLevel: "none",
      hasEmail: false,
      hasPhone: false,
      immediateIncomeNeed: true
    });

    const plan = generatePlan({ readiness, immediateIncomeNeed: true });
    const titles = plan.map((item) => item.title);

    expect(titles).toContain("Enroll in language support / ESL classes");
    expect(titles).toContain("Immediate income pathway: temp agencies / warehouse roles");
    expect(titles).toContain("Book 1:1 appointment with case worker");
  });
});
