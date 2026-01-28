"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const intakeSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  preferredLanguage: z.string().min(1, "Required"),
  englishLevel: z.coerce.number().min(1).max(5),
  educationLevel: z.enum(["none", "highschool", "college", "university", "other"]),
  immediateIncomeNeed: z.boolean().default(false)
});

type IntakeValues = z.infer<typeof intakeSchema>;

export default function NewClientPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<IntakeValues>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      immediateIncomeNeed: false,
      educationLevel: "highschool"
    }
  });

  const onSubmit = async (values: IntakeValues) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(values);
  };

  return (
    <main className="space-y-6">
      <section className="card">
        <h2 className="text-lg font-semibold text-slate-900">New client intake</h2>
        <p className="text-sm text-slate-600">
          Capture essential information and generate the readiness score.
        </p>
      </section>

      <form className="card space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="firstName">First name</label>
            <input id="firstName" {...register("firstName")} />
            {errors.firstName && (
              <p className="text-xs text-rose-600">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName">Last name</label>
            <input id="lastName" {...register("lastName")} />
            {errors.lastName && (
              <p className="text-xs text-rose-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="preferredLanguage">Preferred language</label>
            <input id="preferredLanguage" {...register("preferredLanguage")} />
          </div>
          <div className="space-y-2">
            <label htmlFor="englishLevel">English level (1-5)</label>
            <input
              id="englishLevel"
              type="number"
              min={1}
              max={5}
              {...register("englishLevel")}
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="educationLevel">Education level</label>
            <select id="educationLevel" {...register("educationLevel")}>
              <option value="none">No formal education</option>
              <option value="highschool">High school</option>
              <option value="college">College</option>
              <option value="university">University</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input id="immediateIncomeNeed" type="checkbox" {...register("immediateIncomeNeed")} />
            <label htmlFor="immediateIncomeNeed">Immediate income need</label>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save intake"}
          </button>
          <button className="secondary" type="button">
            Save & add more details
          </button>
        </div>
      </form>
    </main>
  );
}
