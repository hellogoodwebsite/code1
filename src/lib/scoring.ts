export type EducationLevel =
  | "none"
  | "highschool"
  | "college"
  | "university"
  | "other";

export type ReadinessInput = {
  englishLevel: number;
  workExperienceYears: number;
  workExperienceCountry?: string | null;
  educationLevel: EducationLevel;
  hasEmail: boolean;
  hasPhone: boolean;
  immediateIncomeNeed: boolean;
};

export type ReadinessScore = {
  total: number;
  subscoreLanguage: number;
  subscoreExperience: number;
  subscoreCredentials: number;
  subscoreJobSearch: number;
  scoringVersion: "v1";
  breakdown: Record<string, unknown>;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function computeReadinessScore(input: ReadinessInput): ReadinessScore {
  const languagePointsMap = [5, 10, 15, 20, 25];
  const languageIndex = clamp(Math.round(input.englishLevel) - 1, 0, 4);
  const subscoreLanguage = languagePointsMap[languageIndex];

  let experienceBase = 5;
  if (input.workExperienceYears >= 1 && input.workExperienceYears <= 2) {
    experienceBase = 10;
  } else if (input.workExperienceYears >= 3 && input.workExperienceYears <= 5) {
    experienceBase = 18;
  } else if (input.workExperienceYears >= 6) {
    experienceBase = 25;
  }
  const canadaBonus = input.workExperienceCountry === "Canada" ? 2 : 0;
  const subscoreExperience = clamp(experienceBase + canadaBonus, 0, 25);

  const educationMap: Record<EducationLevel, number> = {
    none: 8,
    highschool: 12,
    college: 18,
    university: 25,
    other: 15
  };
  const subscoreCredentials = educationMap[input.educationLevel];

  let subscoreJobSearch = 10;
  if (input.hasEmail) subscoreJobSearch += 5;
  if (input.hasPhone) subscoreJobSearch += 5;
  if (input.immediateIncomeNeed) subscoreJobSearch -= 3;
  subscoreJobSearch = clamp(subscoreJobSearch, 0, 25);

  const total =
    subscoreLanguage +
    subscoreExperience +
    subscoreCredentials +
    subscoreJobSearch;

  return {
    total,
    subscoreLanguage,
    subscoreExperience,
    subscoreCredentials,
    subscoreJobSearch,
    scoringVersion: "v1",
    breakdown: {
      language: { level: input.englishLevel, points: subscoreLanguage },
      experience: {
        years: input.workExperienceYears,
        country: input.workExperienceCountry,
        basePoints: experienceBase,
        bonus: canadaBonus,
        points: subscoreExperience
      },
      credentials: {
        educationLevel: input.educationLevel,
        points: subscoreCredentials
      },
      jobSearch: {
        baseline: 10,
        email: input.hasEmail ? 5 : 0,
        phone: input.hasPhone ? 5 : 0,
        immediateIncomeNeed: input.immediateIncomeNeed ? -3 : 0,
        points: subscoreJobSearch
      }
    }
  };
}
