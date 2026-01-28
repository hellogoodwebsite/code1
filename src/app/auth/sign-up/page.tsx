"use client";

import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const { register, handleSubmit } = useForm<{
    name: string;
    orgName: string;
    email: string;
    password: string;
  }>();

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  return (
    <main className="mx-auto w-full max-w-md space-y-6">
      <section className="card space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">Create admin account</h2>
        <p className="text-sm text-slate-500">
          First-time setup for new organizations.
        </p>
      </section>

      <form className="card space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label htmlFor="name">Full name</label>
          <input id="name" {...register("name")} />
        </div>
        <div className="space-y-2">
          <label htmlFor="orgName">Organization name</label>
          <input id="orgName" {...register("orgName")} />
        </div>
        <div className="space-y-2">
          <label htmlFor="email">Work email</label>
          <input id="email" type="email" {...register("email")} />
        </div>
        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
        </div>
        <button type="submit">Create account</button>
        <p className="text-xs text-slate-500">
          By continuing you agree to ERPP data handling standards.
        </p>
      </form>
    </main>
  );
}
