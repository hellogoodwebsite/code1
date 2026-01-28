import { createClient } from "@supabase/supabase-js";
import { computeReadinessScore } from "@/lib/scoring";
import { generatePlan } from "@/lib/plan";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase env vars");
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

const seed = async () => {
  const { data: organization, error: orgError } = await supabase
    .from("organizations")
    .insert({ name: "Harbour Community Services" })
    .select()
    .single();

  if (orgError) throw orgError;

  const users = [
    {
      email: "admin@harbour.org",
      password: "Password123!",
      role: "admin",
      full_name: "Jordan Lee"
    },
    {
      email: "caseworker@harbour.org",
      password: "Password123!",
      role: "case_worker",
      full_name: "Priya Shah"
    },
    {
      email: "readonly@harbour.org",
      password: "Password123!",
      role: "read_only",
      full_name: "Sam Torres"
    }
  ];

  for (const user of users) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true
    });
    if (error || !data.user) throw error;

    await supabase.from("user_profiles").insert({
      id: data.user.id,
      organization_id: organization.id,
      role: user.role,
      full_name: user.full_name
    });
  }

  const { data: programs } = await supabase
    .from("programs")
    .insert([
      {
        organization_id: organization.id,
        name: "Settlement Employment Program",
        description: "Supports newcomers with rapid job readiness support.",
        is_active: true
      },
      {
        organization_id: organization.id,
        name: "Youth Employment Pathway",
        description: "Guides youth toward training and placements.",
        is_active: true
      }
    ])
    .select();

  if (!programs) return;

  const clients = Array.from({ length: 10 }).map((_, index) => ({
    organization_id: organization.id,
    program_id: programs[index % programs.length].id,
    status: index % 3 === 0 ? "placed" : "active",
    first_name: `Client${index + 1}`,
    last_name: `Demo${index + 1}`,
    email: `client${index + 1}@example.com`,
    phone: `416-555-01${index.toString().padStart(2, "0")}`,
    preferred_language: "English",
    immigration_status: "Permanent Resident",
    education_level: index % 2 === 0 ? "college" : "highschool",
    english_level: (index % 5) + 1,
    immediate_income_need: index % 2 === 0,
    work_experience_country: index % 2 === 0 ? "Canada" : "Other",
    work_experience_years: index % 6
  }));

  const { data: seededClients } = await supabase
    .from("clients")
    .insert(clients)
    .select();

  if (!seededClients) return;

  for (const client of seededClients) {
    const readiness = computeReadinessScore({
      englishLevel: client.english_level,
      workExperienceYears: client.work_experience_years,
      workExperienceCountry: client.work_experience_country,
      educationLevel: client.education_level,
      hasEmail: Boolean(client.email),
      hasPhone: Boolean(client.phone),
      immediateIncomeNeed: client.immediate_income_need
    });

    const { data: assessment } = await supabase
      .from("client_assessments")
      .insert({
        client_id: client.id,
        readiness_score_total: readiness.total,
        subscore_language: readiness.subscoreLanguage,
        subscore_experience: readiness.subscoreExperience,
        subscore_credentials: readiness.subscoreCredentials,
        subscore_jobsearch: readiness.subscoreJobSearch,
        scoring_version: readiness.scoringVersion,
        scoring_breakdown_json: readiness.breakdown
      })
      .select()
      .single();

    if (!assessment) continue;

    await supabase.from("client_plans").insert({
      client_id: client.id,
      assessment_id: assessment.id,
      plan_items: generatePlan({
        readiness,
        immediateIncomeNeed: client.immediate_income_need
      }),
      completed_item_ids: []
    });
  }

  await supabase.from("placements").insert([
    {
      client_id: seededClients[0].id,
      employer_name: "Harbour Market",
      job_title: "Retail Associate",
      wage_hourly: 19.5,
      employment_type: "part_time",
      start_date: "2024-05-10",
      retention_30: true,
      retention_90: false
    },
    {
      client_id: seededClients[1].id,
      employer_name: "North Star Logistics",
      job_title: "Warehouse Associate",
      wage_hourly: 20.25,
      employment_type: "temporary",
      start_date: "2024-04-20",
      retention_30: true,
      retention_90: true
    },
    {
      client_id: seededClients[2].id,
      employer_name: "Skyline Clinics",
      job_title: "Receptionist",
      wage_hourly: 22.0,
      employment_type: "full_time",
      start_date: "2024-03-05",
      retention_30: true,
      retention_90: true
    }
  ]);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
