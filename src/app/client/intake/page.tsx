"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

const steps = ["About you", "Experience", "Contact", "Review"] as const;

type IntakeValues = {
  firstName: string;
  lastName: string;
  preferredLanguage: string;
  educationLevel: string;
  englishLevel: number;
  workExperienceYears: number;
  workExperienceCountry: string;
  email: string;
  phone: string;
  immediateIncomeNeed: boolean;
};

export default function ClientIntakePage() {
  const [stepIndex, setStepIndex] = useState(0);
  const { register, handleSubmit, getValues } = useForm<IntakeValues>({
    defaultValues: {
      educationLevel: "highschool",
      englishLevel: 3,
      workExperienceYears: 0,
      immediateIncomeNeed: false
    }
  });

  const next = () => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  return (
    <main className="mx-auto w-full max-w-xl space-y-6">
      <section className="card space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">Client intake</h2>
        <p className="text-sm text-slate-500">
          Let us know about your goals. You can save and come back anytime.
        </p>
        <div className="flex flex-wrap gap-2">
          {steps.map((label, index) => (
            <span
              key={label}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                index === stepIndex
                  ? "bg-brand-100 text-brand-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      <form className="card space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {stepIndex === 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="firstName">First name</label>
              <input id="firstName" {...register("firstName")} />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName">Last name</label>
              <input id="lastName" {...register("lastName")} />
            </div>
            <div className="space-y-2">
              <label htmlFor="preferredLanguage">Preferred language</label>
              <input id="preferredLanguage" {...register("preferredLanguage")} />
            </div>
          </div>
        )}

        {stepIndex === 1 && (
          <div className="space-y-4">
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
            <div className="space-y-2">
              <label htmlFor="englishLevel">English level (1-5)</label>
              <input id="englishLevel" type="number" min={1} max={5} {...register("englishLevel")} />
            </div>
            <div className="space-y-2">
              <label htmlFor="workExperienceYears">Years of work experience</label>
              <input id="workExperienceYears" type="number" min={0} {...register("workExperienceYears")} />
            </div>
            <div className="space-y-2">
              <label htmlFor="workExperienceCountry">Where was your most recent experience?</label>
              <input id="workExperienceCountry" {...register("workExperienceCountry")} />
            </div>
            <div className="flex items-center gap-2">
              <input id="immediateIncomeNeed" type="checkbox" {...register("immediateIncomeNeed")} />
              <label htmlFor="immediateIncomeNeed">I need income right away</label>
            </div>
          </div>
        )}

        {stepIndex === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" {...register("email")} />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone">Phone</label>
              <input id="phone" {...register("phone")} />
            </div>
          </div>
        )}

        {stepIndex === 3 && (
          <div className="space-y-2 text-sm text-slate-600">
            <p>Please confirm the details below before submitting.</p>
            <pre className="rounded-lg bg-slate-100 p-3 text-xs text-slate-700">
              {JSON.stringify(getValues(), null, 2)}
            </pre>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button className="secondary" type="button" onClick={back} disabled={stepIndex === 0}>
            Back
          </button>
          {stepIndex < steps.length - 1 ? (
            <button type="button" onClick={next}>
              Next
            </button>
          ) : (
            <button type="submit">Submit intake</button>
          )}
        </div>
      </form>
    </main>
  );
}
